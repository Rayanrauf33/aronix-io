"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Check, RefreshCw } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Log data                                                            */
/* ------------------------------------------------------------------ */

type LogRow = {
  time: string
  status: "complete" | "monitoring"
  text: string
}

const rows: LogRow[] = [
  { time: "09:14:02", status: "complete", text: "Process audit and documentation" },
  { time: "09:14:03", status: "complete", text: "Automated workflow built and tested" },
  { time: "09:14:04", status: "complete", text: "Error handling and failure alerts" },
  { time: "09:14:05", status: "complete", text: "Process run log configured" },
  { time: "09:14:06", status: "complete", text: "Handover documentation generated" },
  { time: "09:14:08", status: "monitoring", text: "Post-launch support period" },
]

/* ------------------------------------------------------------------ */
/*  CSS keyframes for live pulse                                        */
/* ------------------------------------------------------------------ */

const livePulseStyle = `
@keyframes ax-live-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.7; }
}
`

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function RunLog() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce
  const [visible, setVisible] = useState(false)

  /* Separate IO for continuous animation pause guard */
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
    <div
      ref={ref}
      className="rounded-[var(--ax-radius-xl)] border border-white/10 overflow-hidden"
      style={{ background: "var(--ax-surface-dark-alt)" }}
    >
      {/* Inject CSS keyframes */}
      <style dangerouslySetInnerHTML={{ __html: livePulseStyle }} />

      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        {/* Pulsing dot -- paused when off-screen */}
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: "var(--ax-success)",
            animation: visible && !reduce
              ? "ax-live-pulse 2s ease-in-out infinite"
              : "none",
          }}
        />
        <span
          className="text-[11px] uppercase font-bold"
          style={{
            fontFamily: "var(--ax-font-mono)",
            letterSpacing: "0.1em",
            color: "var(--ax-success)",
          }}
        >
          Live
        </span>
        <span
          className="text-[11px] uppercase ml-auto"
          style={{
            fontFamily: "var(--ax-font-mono)",
            letterSpacing: "0.08em",
            color: "var(--ax-fg-on-dark-2)",
          }}
        >
          Automation run log
        </span>
      </div>

      {/* Rows */}
      <div>
        {rows.map((row, i) => {
          const isComplete = row.status === "complete"
          return (
            <motion.div
              key={row.time}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={show ? { opacity: 1, x: 0 } : undefined}
              transition={{ delay: i * 0.1, duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-3 sm:gap-4 px-5 py-3 border-t border-white/5"
            >
              {/* Timestamp */}
              <span
                className="text-[13px] shrink-0 w-16 sm:w-20"
                style={{
                  fontFamily: "var(--ax-font-mono)",
                  fontVariantNumeric: "tabular-nums",
                  color: "var(--ax-fg-on-dark-2)",
                }}
              >
                {row.time}
              </span>

              {/* Badge */}
              <span
                className="inline-flex items-center gap-1 rounded-[var(--ax-radius-xs)] px-2 py-0.5 text-[10px] uppercase font-bold shrink-0"
                style={{
                  fontFamily: "var(--ax-font-mono)",
                  background: isComplete
                    ? "color-mix(in srgb, var(--ax-success) 15%, transparent)"
                    : "color-mix(in srgb, var(--ax-warning) 15%, transparent)",
                  color: isComplete ? "var(--ax-success)" : "var(--ax-warning)",
                }}
              >
                {isComplete ? (
                  <Check size={10} strokeWidth={3} aria-hidden="true" />
                ) : (
                  <RefreshCw size={10} strokeWidth={2.5} aria-hidden="true" />
                )}
                {isComplete ? "Complete" : "Monitoring"}
              </span>

              {/* Text */}
              <span
                className="text-[14px] truncate"
                style={{ color: "var(--ax-fg-on-dark-2)" }}
              >
                {row.text}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
