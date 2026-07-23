"use client"

import { useRef } from "react"
import { useInView, useReducedMotion } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

type Row = {
  text: string
  status: "active" | "period"
}

const rows: Row[] = [
  { text: "Full audit of your current tools and data flows", status: "active" },
  { text: "Integration build connecting your systems via API or native connectors", status: "active" },
  { text: "CRM data clean-up as part of the setup process", status: "active" },
  { text: "Pipeline and stage configuration aligned to your actual sales process", status: "active" },
  { text: "Error monitoring and alerts for any integration failures", status: "active" },
  { text: "Documentation of every integration built", status: "active" },
  { text: "Post-launch support", status: "period" },
]

/* ------------------------------------------------------------------ */
/*  CSS for stagger animation                                           */
/* ------------------------------------------------------------------ */

const staggerStyle = `
@keyframes ax-health-row {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.ax-health-row {
  opacity: 0;
  animation: ax-health-row 0.3s ease-out forwards;
}
`

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function HealthDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <div
      ref={ref}
      className="rounded-[var(--ax-radius-xl)] border border-white/10 overflow-hidden max-w-[720px] mx-auto"
      style={{ background: "var(--ax-surface-dark-alt)" }}
    >
      <style dangerouslySetInnerHTML={{ __html: staggerStyle }} />

      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: "var(--ax-success)" }}
        />
        <span
          className="text-[11px] uppercase font-bold"
          style={{
            fontFamily: "var(--ax-font-mono)",
            letterSpacing: "0.1em",
            color: "var(--ax-fg-on-dark)",
          }}
        >
          Integration health
        </span>
      </div>

      {/* Rows */}
      <div>
        {rows.map((row, i) => {
          const isActive = row.status === "active"
          return (
            <div
              key={row.text}
              className={show && !reduce ? "ax-health-row" : ""}
              style={{
                animationDelay: show && !reduce ? `${i * 80}ms` : undefined,
                opacity: reduce || !show ? (show ? 1 : 0) : undefined,
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center gap-3 px-5 py-3.5">
                {/* Status dot */}
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: isActive ? "var(--ax-success)" : "var(--ax-warning)",
                  }}
                />

                {/* Text */}
                <span
                  className="text-[14px] flex-1"
                  style={{ color: "var(--ax-fg-on-dark-2)" }}
                >
                  {row.text}
                </span>

                {/* Badge */}
                <span
                  className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-[var(--ax-radius-xs)] shrink-0"
                  style={{
                    fontFamily: "var(--ax-font-mono)",
                    letterSpacing: "0.06em",
                    background: isActive
                      ? "color-mix(in srgb, var(--ax-success) 15%, transparent)"
                      : "color-mix(in srgb, var(--ax-warning) 15%, transparent)",
                    color: isActive ? "var(--ax-success)" : "var(--ax-warning)",
                  }}
                >
                  {isActive ? "Active" : "In period"}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
