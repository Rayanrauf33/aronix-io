"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Shared card wrapper                                                 */
/* ------------------------------------------------------------------ */

function CostCard({
  label,
  stat,
  desc,
  children,
  index,
}: {
  label: string
  stat: string
  desc: string
  children: React.ReactNode
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
      className="rounded-[var(--ax-radius-xl)] border border-white/10 p-8 sm:p-10 lg:p-12"
      style={{ background: "var(--ax-surface-dark-alt)", minHeight: "30vh" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Text */}
        <div>
          <div
            className="text-[11px] uppercase font-bold mb-4"
            style={{
              fontFamily: "var(--ax-font-mono)",
              letterSpacing: "0.1em",
              color: "var(--ax-fg-on-dark-2)",
            }}
          >
            {label}
          </div>
          <div
            className="text-white mb-3"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 800,
              fontSize: "var(--ax-fs-display)",
              lineHeight: "var(--ax-lh-tight)",
              letterSpacing: "var(--ax-tracking-tight)",
            }}
          >
            {stat}
          </div>
          <p
            className="text-[var(--ax-fs-body-lg)] leading-[1.6] m-0"
            style={{ color: "var(--ax-fg-on-dark-2)" }}
          >
            {desc}
          </p>
        </div>

        {/* Visualisation */}
        <div className="flex justify-center">{children}</div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Card 1: Time blocks                                                 */
/* ------------------------------------------------------------------ */

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
const heights = [60, 45, 70, 55, 65]

function TimeBlocks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className="flex items-end gap-3">
      {days.map((day, i) => (
        <div key={day} className="flex flex-col items-center gap-2">
          <div
            className="w-8 sm:w-10 rounded-[var(--ax-radius-xs)] overflow-hidden"
            style={{ height: 120, background: "rgba(255,255,255,0.04)" }}
          >
            <div
              className="w-full rounded-[var(--ax-radius-xs)]"
              style={{
                height: inView ? `${heights[i]}%` : "0%",
                background: "color-mix(in srgb, var(--ax-error) 40%, transparent)",
                transition: `height 0.8s ease-out ${i * 0.1}s`,
              }}
            />
          </div>
          <span
            className="text-[11px]"
            style={{
              fontFamily: "var(--ax-font-mono)",
              color: "var(--ax-fg-on-dark-2)",
            }}
          >
            {day}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Card 2: Manual vs Automated                                         */
/* ------------------------------------------------------------------ */

function ComparisonFlows() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()

  const manualResults = [true, false, true, false, true]
  const autoResults = [true, true, true, true, true]

  return (
    <div ref={ref} className="flex gap-10">
      {/* Manual */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center gap-0"
      >
        <span
          className="text-[11px] font-bold mb-3"
          style={{
            fontFamily: "var(--ax-font-mono)",
            color: "var(--ax-fg-on-dark-2)",
          }}
        >
          Manual
        </span>
        {manualResults.map((ok, i) => (
          <div key={i} className="flex flex-col items-center">
            {i > 0 && (
              <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.1)" }} />
            )}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold"
              style={{
                border: `2px solid ${ok ? "rgba(255,255,255,0.15)" : "var(--ax-error)"}`,
                color: ok ? "var(--ax-fg-on-dark-2)" : "var(--ax-error)",
              }}
            >
              {ok ? "" : "\u2715"}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Automated */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: 16 }}
        animate={inView ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
        className="flex flex-col items-center gap-0"
      >
        <span
          className="text-[11px] font-bold mb-3"
          style={{
            fontFamily: "var(--ax-font-mono)",
            color: "var(--ax-fg-on-dark-2)",
          }}
        >
          Automated
        </span>
        {autoResults.map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {i > 0 && (
              <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.1)" }} />
            )}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold"
              style={{
                border: "2px solid var(--ax-success)",
                color: "var(--ax-success)",
              }}
            >
              {"\u2713"}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Card 3: Scale chart                                                 */
/* ------------------------------------------------------------------ */

function ScaleChart() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref}>
      <svg
        viewBox="0 0 280 160"
        className="w-full max-w-[280px] h-auto"
        aria-hidden="true"
      >
        {/* Axes */}
        <line x1="30" y1="140" x2="270" y2="140" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="30" y1="140" x2="30" y2="10" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* Manual line: steep rise then flattens */}
        <path
          d="M30 130 Q80 100 120 80 Q160 65 200 58 Q240 54 270 52"
          fill="none"
          stroke="var(--ax-fg-on-dark-2)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={inView ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
        />

        {/* Automated line: steady rise */}
        <path
          d="M30 130 Q100 100 150 70 Q200 40 270 15"
          fill="none"
          stroke="var(--ax-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={inView ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1.2s ease-out 0.3s" }}
        />

        {/* Labels */}
        <text x="272" y="56" fill="var(--ax-fg-on-dark-2)" fontSize="10" fontFamily="var(--ax-font-mono)">Manual</text>
        <text x="272" y="19" fill="var(--ax-primary)" fontSize="10" fontFamily="var(--ax-font-mono)">Automated</text>
        <text x="150" y="156" fill="var(--ax-fg-on-dark-2)" fontSize="10" fontFamily="var(--ax-font-mono)" textAnchor="middle">Volume</text>
        <text x="12" y="80" fill="var(--ax-fg-on-dark-2)" fontSize="10" fontFamily="var(--ax-font-mono)" textAnchor="middle" transform="rotate(-90 12 80)">Output</text>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export function CostCards() {
  return (
    <div className="flex flex-col gap-6">
      <CostCard
        label="The obvious cost"
        stat="4.9 hrs"
        desc="lost per employee per week to manual data entry"
        index={0}
      >
        <TimeBlocks />
      </CostCard>

      <CostCard
        label="The hidden cost"
        stat="50%"
        desc="reduction in process errors after automation"
        index={1}
      >
        <ComparisonFlows />
      </CostCard>

      <CostCard
        label="The scale cost"
        stat={"\u221E"}
        desc="automated processes don't have a headcount ceiling"
        index={2}
      >
        <ScaleChart />
      </CostCard>
    </div>
  )
}
