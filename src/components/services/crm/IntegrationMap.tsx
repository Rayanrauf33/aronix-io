"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  Database,
  Globe,
  Kanban,
  Calculator,
  Mail,
  BarChart3,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

type ToolNode = {
  icon: LucideIcon
  label: string
  /** angle in degrees from top (0=top, 60=top-right, etc.) */
  angle: number
}

const toolNodes: ToolNode[] = [
  { icon: Globe, label: "Website / Lead forms", angle: 0 },
  { icon: Kanban, label: "Project management", angle: 60 },
  { icon: Calculator, label: "Accounting", angle: 120 },
  { icon: BarChart3, label: "Reporting", angle: 180 },
  { icon: Mail, label: "Email / Calendar", angle: 240 },
  { icon: Database, label: "Data warehouse", angle: 300 },
]

/* ------------------------------------------------------------------ */
/*  CSS keyframes for travelling dots                                   */
/* ------------------------------------------------------------------ */

const travelDotStyle = `
@keyframes ax-travel-dot {
  0% { offset-distance: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}
`

/* ------------------------------------------------------------------ */
/*  Geometry helpers                                                     */
/* ------------------------------------------------------------------ */

const CX = 250
const CY = 250
const RADIUS = 180

function nodePos(angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  return {
    x: CX + RADIUS * Math.cos(rad),
    y: CY + RADIUS * Math.sin(rad),
  }
}

/* ------------------------------------------------------------------ */
/*  Desktop radial diagram                                              */
/* ------------------------------------------------------------------ */

function RadialDiagram({ show, reduce, visible }: {
  show: boolean
  reduce: boolean | null
  visible: boolean
}) {
  return (
    <div className="hidden md:flex justify-center">
      <style dangerouslySetInnerHTML={{ __html: travelDotStyle }} />
      <div className="relative" style={{ width: 500, height: 500 }}>
        {/* SVG connectors */}
        <svg
          viewBox="0 0 500 500"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="ax-arrow"
              viewBox="0 0 10 6"
              refX="10"
              refY="3"
              markerWidth="8"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 3L0 6" fill="rgba(255,255,255,0.25)" />
            </marker>
          </defs>

          {toolNodes.map((node, i) => {
            const pos = nodePos(node.angle)
            return (
              <line
                key={node.label}
                x1={CX}
                y1={CY}
                x2={pos.x}
                y2={pos.y}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                markerEnd="url(#ax-arrow)"
                markerStart="url(#ax-arrow)"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={show ? 0 : 1}
                style={{
                  transition: `stroke-dashoffset 0.8s ease-out ${i * 0.2}s`,
                }}
              />
            )
          })}
        </svg>

        {/* Travelling dots on each connector (CSS offset-path) */}
        {toolNodes.map((node, i) => {
          const pos = nodePos(node.angle)
          const pathD = `M${CX},${CY} L${pos.x},${pos.y}`
          return (
            <div
              key={`dot-${node.label}`}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: "var(--ax-primary)",
                offsetPath: `path('${pathD}')`,
                animation: visible && !reduce
                  ? `ax-travel-dot ${2.5 + i * 0.3}s linear infinite`
                  : "none",
                animationDelay: `${i * 0.4}s`,
                top: 0,
                left: 0,
              }}
            />
          )
        })}

        {/* Central CRM node */}
        <div
          className="absolute flex flex-col items-center justify-center rounded-[var(--ax-radius-lg)] border border-white/15"
          style={{
            width: 120,
            height: 72,
            left: CX - 60,
            top: CY - 36,
            background: "var(--ax-surface-dark-alt)",
          }}
        >
          <Database
            size={20}
            style={{ color: "var(--ax-primary)" }}
            aria-hidden="true"
          />
          <span
            className="text-[11px] font-bold mt-1.5"
            style={{
              fontFamily: "var(--ax-font-mono)",
              letterSpacing: "0.08em",
              color: "var(--ax-fg-on-dark)",
            }}
          >
            YOUR CRM
          </span>
        </div>

        {/* Tool nodes */}
        {toolNodes.map((node, i) => {
          const pos = nodePos(node.angle)
          const Icon = node.icon
          return (
            <motion.div
              key={node.label}
              className="absolute flex items-center gap-2 px-3 py-2 rounded-[var(--ax-radius-sm)] border border-white/10"
              style={{
                background: "var(--ax-surface-dark-alt)",
                left: pos.x - 65,
                top: pos.y - 18,
                width: 130,
              }}
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={show ? { opacity: 1, scale: 1 } : undefined}
              transition={{
                delay: 0.8 + i * 0.2,
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <Icon
                size={14}
                style={{ color: "var(--ax-fg-on-dark-2)" }}
                aria-hidden="true"
                className="shrink-0"
              />
              <span
                className="text-[10px] font-medium leading-tight"
                style={{
                  fontFamily: "var(--ax-font-mono)",
                  color: "var(--ax-fg-on-dark)",
                }}
              >
                {node.label}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile grid                                                         */
/* ------------------------------------------------------------------ */

function MobileGrid({ show, reduce }: { show: boolean; reduce: boolean | null }) {
  return (
    <div className="md:hidden">
      {/* Central CRM card */}
      <div
        className="flex items-center justify-center gap-2 py-3 mb-4 rounded-[var(--ax-radius-lg)] border border-white/15"
        style={{ background: "var(--ax-surface-dark-alt)" }}
      >
        <Database size={18} style={{ color: "var(--ax-primary)" }} aria-hidden="true" />
        <span
          className="text-[12px] font-bold"
          style={{
            fontFamily: "var(--ax-font-mono)",
            letterSpacing: "0.08em",
            color: "var(--ax-fg-on-dark)",
          }}
        >
          YOUR CRM
        </span>
      </div>

      {/* Tool cards grid */}
      <div className="grid grid-cols-2 gap-3">
        {toolNodes.map((node, i) => {
          const Icon = node.icon
          return (
            <motion.div
              key={node.label}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: i * 0.1, duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-[var(--ax-radius-sm)] border border-white/10"
              style={{ background: "var(--ax-surface-dark-alt)" }}
            >
              <Icon
                size={14}
                style={{ color: "var(--ax-fg-on-dark-2)" }}
                aria-hidden="true"
                className="shrink-0"
              />
              <span
                className="text-[11px] font-medium leading-tight"
                style={{
                  fontFamily: "var(--ax-font-mono)",
                  color: "var(--ax-fg-on-dark)",
                }}
              >
                {node.label}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export function IntegrationMap() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce
  const [visible, setVisible] = useState(false)

  /* Pause travelling dots when off-screen */
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
    <div ref={ref}>
      <RadialDiagram show={show} reduce={reduce} visible={visible} />
      <MobileGrid show={show} reduce={reduce} />

      {/* Caption */}
      <p
        className="text-[13px] text-center mt-6"
        style={{
          fontFamily: "var(--ax-font-mono)",
          color: "var(--ax-fg-on-dark-2)",
        }}
      >
        Every tool in your stack should be talking to your CRM. Right now, most
        of them probably aren&apos;t.
      </p>
    </div>
  )
}
