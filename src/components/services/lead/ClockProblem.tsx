"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  Check,
  Clock,
  X,
  Zap,
  MessageSquare,
  CalendarCheck,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Statement data                                                      */
/* ------------------------------------------------------------------ */

type Statement = {
  icon: LucideIcon
  iconColor: string
  text: string
}

const leftStatements: Statement[] = [
  { icon: Check, iconColor: "var(--ax-success)", text: "Lead submits your form at 9:14am" },
  { icon: Clock, iconColor: "var(--ax-fg-on-dark-2)", text: "You see it at 2:30pm, between jobs" },
  { icon: X, iconColor: "var(--ax-error)", text: "They booked your competitor at 10:02am" },
]

const rightStatements: Statement[] = [
  { icon: Zap, iconColor: "var(--ax-warning)", text: "Our system sees the lead at 9:14am" },
  { icon: MessageSquare, iconColor: "var(--ax-primary)", text: "Personalised response sent at 9:14:47" },
  { icon: CalendarCheck, iconColor: "var(--ax-success)", text: "Appointment booked before your competitor even knew the lead existed" },
]

/* ------------------------------------------------------------------ */
/*  Clock SVG                                                           */
/* ------------------------------------------------------------------ */

function ClockFace({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  // 47 minutes = 47/60 * 360 = 282 degrees
  const minuteAngle = 282
  const hourAngle = (47 / 60) * 30 // ~23.5 degrees past 12

  return (
    <svg
      viewBox="0 0 200 200"
      className="w-[180px] h-[180px] md:w-[220px] md:h-[220px]"
      aria-hidden="true"
    >
      {/* Clock circle */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="2"
      />

      {/* Hour markers */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x1 = 100 + 78 * Math.sin(angle)
        const y1 = 100 - 78 * Math.cos(angle)
        const x2 = 100 + 86 * Math.sin(angle)
        const y2 = 100 - 86 * Math.cos(angle)
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )
      })}

      {/* Centre dot */}
      <circle cx="100" cy="100" r="4" fill="var(--ax-primary)" />

      {/* Hour hand */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="55"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="3"
        strokeLinecap="round"
        className="origin-center"
        style={{
          transform: `rotate(${inView || reduce ? hourAngle : 0}deg)`,
          transformOrigin: "100px 100px",
          transition: reduce ? "none" : "transform 1.2s cubic-bezier(0.2, 0, 0, 1)",
        }}
      />

      {/* Minute hand */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="30"
        stroke="var(--ax-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="origin-center"
        style={{
          transform: `rotate(${inView || reduce ? minuteAngle : 0}deg)`,
          transformOrigin: "100px 100px",
          transition: reduce ? "none" : "transform 1.2s cubic-bezier(0.2, 0, 0, 1)",
        }}
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export function ClockProblem() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduce = useReducedMotion()

  const show = inView || !!reduce

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-center">
      {/* Left: without your system */}
      <div className="flex flex-col gap-4 order-2 md:order-1">
        {leftStatements.map((s, i) => (
          <motion.div
            key={s.text}
            initial={reduce ? false : { opacity: 0, x: -20 }}
            animate={show ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: i * 0.4, duration: 0.4, ease: "easeOut" }}
            className="flex items-start gap-3"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <s.icon size={14} style={{ color: s.iconColor }} aria-hidden="true" />
            </div>
            <span className="text-[14px] leading-[1.6] text-[var(--ax-fg-on-dark-2)]">
              {s.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Centre: clock */}
      <div className="flex flex-col items-center gap-4 order-1 md:order-2">
        <ClockFace inView={inView} reduce={!!reduce} />
        <div
          className="text-white text-center"
          style={{
            fontFamily: "var(--ax-font-display)",
            fontWeight: 800,
            fontSize: "var(--ax-fs-h2)",
            lineHeight: "var(--ax-lh-tight)",
            letterSpacing: "var(--ax-tracking-tight)",
          }}
        >
          47 hours
        </div>
        <p className="text-[14px] text-[var(--ax-fg-on-dark-2)] text-center max-w-[280px]">
          average time businesses take to respond to a new lead
        </p>
      </div>

      {/* Right: with your system */}
      <div className="flex flex-col gap-4 order-3">
        {rightStatements.map((s, i) => (
          <motion.div
            key={s.text}
            initial={reduce ? false : { opacity: 0, x: 20 }}
            animate={show ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: i * 0.4 + 0.2, duration: 0.4, ease: "easeOut" }}
            className="flex items-start gap-3"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <s.icon size={14} style={{ color: s.iconColor }} aria-hidden="true" />
            </div>
            <span className="text-[14px] leading-[1.6] text-[var(--ax-fg-on-dark-2)]">
              {s.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
