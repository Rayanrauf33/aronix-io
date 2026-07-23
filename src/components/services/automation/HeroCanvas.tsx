"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, useReducedMotion, useAnimationControls } from "framer-motion"
import { UserCheck, Mail, FolderOpen, FileText, Clock, CalendarCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Node data                                                           */
/* ------------------------------------------------------------------ */

type NodeDef = {
  label: string
  colour: "green" | "pink" | "amber"
  icon: LucideIcon
}

const nodes: NodeDef[] = [
  { label: "New Client Signed",  colour: "green", icon: UserCheck },
  { label: "Welcome Email Sent", colour: "pink",  icon: Mail },
  { label: "Project Created",    colour: "pink",  icon: FolderOpen },
  { label: "Invoice Generated",  colour: "pink",  icon: FileText },
  { label: "Awaiting Approval",  colour: "amber", icon: Clock },
  { label: "Kickoff Scheduled",  colour: "pink",  icon: CalendarCheck },
]

const NODE_W = 24  // % of viewBox
const NODE_H = 16  // % of viewBox

const positions = [
  { x: 8,  y: 15 },
  { x: 38, y: 15 },
  { x: 68, y: 15 },
  { x: 8,  y: 65 },
  { x: 38, y: 65 },
  { x: 68, y: 65 },
]

/* Pre-computed geometry */
const cX = positions.map(p => p.x + NODE_W / 2)  // centre x (also dot travel x)
const cY = positions.map(p => p.y + NODE_H / 2)  // centre y (also port y)
const rX = positions.map(p => p.x + NODE_W)       // right port x
const lX = positions.map(p => p.x)                // left port x

/* Elbow x-coordinate for the diagonal 2→3 connector */
const ELBOW = 97

/* Elbow path segment lengths for proportional timing */
const ER = ELBOW - cX[2]        // rightward:  97 - 80 = 17
const ED = cY[3]  - cY[2]       // downward:   73 - 23 = 50
const EL = ELBOW  - cX[3]       // leftward:   97 - 20 = 77
const ET = ER + ED + EL          // total:      144

/* ------------------------------------------------------------------ */
/*  Pre-computed animation keyframes                                    */
/* ------------------------------------------------------------------ */

const moveDur       = 0.06
const pauseDur      = 0.04
const amberPauseDur = 0.12

/* Same total time as original (5 pauses + 1 amber pause + 5 moves) */
const totalUnscaled = 5 * pauseDur + amberPauseDur + 5 * moveDur
const s = 1 / totalUnscaled

function buildKeyframes() {
  const xK: string[] = [], yK: string[] = [], tK: number[] = [], cK: string[] = []
  let t = 0
  const pk = "var(--ax-primary)", wk = "var(--ax-warning)"

  function kf(x: number, y: number, col: string) {
    xK.push(`${x}%`)
    yK.push(`${y}%`)
    tK.push(+Math.min(t, 1).toFixed(5))
    cK.push(col)
  }

  /* Node 0 – pause */
  kf(cX[0], cY[0], pk); t += pauseDur * s; kf(cX[0], cY[0], pk)
  /* Move 0 → 1 */
  t += moveDur * s; kf(cX[1], cY[1], pk)
  /* Node 1 – pause */
  t += pauseDur * s; kf(cX[1], cY[1], pk)
  /* Move 1 → 2 */
  t += moveDur * s; kf(cX[2], cY[2], pk)
  /* Node 2 – pause */
  t += pauseDur * s; kf(cX[2], cY[2], pk)
  /* Elbow 2 → 3: right, then down, then left */
  t += (moveDur * ER / ET) * s; kf(ELBOW, cY[2], pk)
  t += (moveDur * ED / ET) * s; kf(ELBOW, cY[3], pk)
  t += (moveDur * EL / ET) * s; kf(cX[3], cY[3], pk)
  /* Node 3 – pause */
  t += pauseDur * s; kf(cX[3], cY[3], pk)
  /* Move 3 → 4 (arrives amber) */
  t += moveDur * s; kf(cX[4], cY[4], wk)
  /* Node 4 – amber pause */
  t += amberPauseDur * s; kf(cX[4], cY[4], wk)
  /* Move 4 → 5 */
  t += moveDur * s; kf(cX[5], cY[5], pk)
  /* Node 5 – final pause */
  t += pauseDur * s; kf(cX[5], cY[5], pk)

  return { xKeys: xK, yKeys: yK, times: tK, colourKeys: cK }
}

const KEYFRAMES = buildKeyframes()

/* ------------------------------------------------------------------ */
/*  Colour helpers                                                      */
/* ------------------------------------------------------------------ */

function iconBg(c: NodeDef["colour"]) {
  if (c === "green") return "rgba(34,197,94,0.18)"
  if (c === "amber") return "rgba(255,181,79,0.18)"
  return "rgba(234,75,113,0.18)"
}

function iconFg(c: NodeDef["colour"]) {
  if (c === "green") return "var(--ax-success)"
  if (c === "amber") return "var(--ax-warning)"
  return "var(--ax-primary)"
}

function nodeAccent(c: NodeDef["colour"]) {
  if (c === "green") return "rgba(34,197,94,0.28)"
  if (c === "amber") return "rgba(255,181,79,0.28)"
  return "rgba(234,75,113,0.22)"
}

/* ------------------------------------------------------------------ */
/*  Amber pulse (CSS only, gated by visibility)                        */
/* ------------------------------------------------------------------ */

const CSS_KEYFRAMES = `
@keyframes ax-amber-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255,181,79,0); }
  50%       { box-shadow: 0 0 0 4px rgba(255,181,79,0.2); }
}
`

/* ------------------------------------------------------------------ */
/*  Connector SVG                                                       */
/* ------------------------------------------------------------------ */

function Connectors() {
  const s = { stroke: "rgba(255,255,255,0.18)", strokeWidth: "0.6", fill: "none" } as const
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Top row: right-port of N → left-port of N+1 */}
      <line x1={rX[0]} y1={cY[0]} x2={lX[1]} y2={cY[1]} {...s} />
      <line x1={rX[1]} y1={cY[1]} x2={lX[2]} y2={cY[2]} {...s} />
      {/* Elbow: right of node 2 → right edge → down → left-port of node 3 */}
      <path
        d={`M ${rX[2]} ${cY[2]} H ${ELBOW} V ${cY[3]} H ${lX[3]}`}
        {...s}
        strokeLinejoin="round"
      />
      {/* Bottom row */}
      <line x1={rX[3]} y1={cY[3]} x2={lX[4]} y2={cY[4]} {...s} />
      <line x1={rX[4]} y1={cY[4]} x2={lX[5]} y2={cY[5]} {...s} />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Travelling dot                                                      */
/* ------------------------------------------------------------------ */

function TravellingDot({ reduce, visible }: { reduce: boolean | null; visible: boolean }) {
  const controls = useAnimationControls()
  const started = useRef(false)

  const startAnimation = useCallback(() => {
    controls.start({
      left: KEYFRAMES.xKeys,
      top:  KEYFRAMES.yKeys,
      backgroundColor: KEYFRAMES.colourKeys,
      transition: {
        duration: 8,
        times: KEYFRAMES.times,
        repeat: Infinity,
        ease: "linear",
      },
    })
  }, [controls])

  useEffect(() => {
    if (reduce) return
    if (visible) {
      if (!started.current) {
        const timer = setTimeout(() => {
          startAnimation()
          started.current = true
        }, 2000)
        return () => clearTimeout(timer)
      }
      startAnimation()
    } else {
      controls.stop()
    }
  }, [visible, reduce, controls, startAnimation])

  if (reduce) return null

  return (
    <motion.div
      className="absolute w-2.5 h-2.5 rounded-full pointer-events-none z-[1]"
      animate={controls}
      style={{
        left: `${cX[0]}%`,
        top:  `${cY[0]}%`,
        backgroundColor: "var(--ax-primary)",
        boxShadow: "0 0 8px rgba(234,75,113,0.7)",
        transform: "translate(-50%, -50%)",
      }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  N8n-style node                                                      */
/* ------------------------------------------------------------------ */

function N8nNode({
  node,
  index,
  show,
  reduce,
  visible,
}: {
  node: NodeDef
  index: number
  show: boolean
  reduce: boolean | null
  visible: boolean
}) {
  const pos = positions[index]
  const isFirst = index === 0
  const isLast  = index === nodes.length - 1
  const isAmber = node.colour === "amber"
  const Icon    = node.icon

  return (
    <motion.div
      className="absolute z-[2]"
      style={{
        left:   `${pos.x}%`,
        top:    `${pos.y}%`,
        width:  `${NODE_W}%`,
        height: `${NODE_H}%`,
      }}
      initial={reduce ? false : { opacity: 0, scale: 0.88 }}
      animate={show ? { opacity: 1, scale: 1 } : undefined}
      transition={{ delay: index * 0.2, duration: 0.3, ease: "easeOut" }}
    >
      {/* Input port circle */}
      {!isFirst && (
        <div
          aria-hidden="true"
          className="absolute left-0 top-1/2 w-[9px] h-[9px] rounded-full border-[1.5px] z-[3]"
          style={{
            background: "var(--ax-surface-dark-alt)",
            borderColor: nodeAccent(node.colour),
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Node card, opaque background hides the travelling dot inside */}
      <div
        className="w-full h-full flex overflow-hidden"
        style={{
          background:   "var(--ax-surface-dark)",
          border:       `1px solid ${nodeAccent(node.colour)}`,
          borderRadius: "6px",
          ...(isAmber && visible && !reduce
            ? { animation: "ax-amber-pulse 2s ease-in-out infinite" }
            : {}),
        }}
      >
        {/* Icon strip */}
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width:       "30%",
            background:  iconBg(node.colour),
            borderRight: `1px solid ${nodeAccent(node.colour)}`,
          }}
        >
          <Icon size={11} style={{ color: iconFg(node.colour) }} aria-hidden="true" />
        </div>

        {/* Label */}
        <div className="flex items-center px-[6px] min-w-0">
          <span
            className="leading-tight truncate"
            style={{
              fontFamily: "var(--ax-font-mono)",
              fontSize:   "8.5px",
              color:      "rgba(255,255,255,0.82)",
              fontWeight: 500,
            }}
          >
            {node.label}
          </span>
        </div>
      </div>

      {/* Output port circle */}
      {!isLast && (
        <div
          aria-hidden="true"
          className="absolute right-0 top-1/2 w-[9px] h-[9px] rounded-full border-[1.5px] z-[3]"
          style={{
            background:  "var(--ax-surface-dark-alt)",
            borderColor: nodeAccent(node.colour),
            transform:   "translate(50%, -50%)",
          }}
        />
      )}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function HeroCanvas() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduce = useReducedMotion()
  const show   = inView || !!reduce
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="hidden lg:block">
      <style dangerouslySetInnerHTML={{ __html: CSS_KEYFRAMES }} />

      <div
        className="relative rounded-[var(--ax-radius-xl)] border border-white/10 p-8 xl:p-10 overflow-hidden"
        style={{
          background:      "var(--ax-surface-dark-alt)",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize:  "24px 24px",
          minHeight:       320,
        }}
      >
        <div className="relative w-full" style={{ paddingBottom: "55%" }}>
          <Connectors />

          {nodes.map((node, i) => (
            <N8nNode
              key={node.label}
              node={node}
              index={i}
              show={show}
              reduce={reduce}
              visible={visible}
            />
          ))}

          <TravellingDot reduce={reduce} visible={visible} />
        </div>
      </div>

      <p
        className="text-[13px] text-center mt-4"
        style={{ fontFamily: "var(--ax-font-mono)", color: "var(--ax-fg-on-dark-2)" }}
      >
        The pink steps run automatically. The amber node is where your approval matters.
      </p>
    </div>
  )
}
