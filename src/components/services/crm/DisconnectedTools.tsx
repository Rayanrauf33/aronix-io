"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  Database,
  Mail,
  Kanban,
  Calculator,
  CalendarDays,
  Clock,
  ArrowRight,
  X,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

type ToolRow = {
  icon: LucideIcon
  tool: string
  action: string
  cost: string
}

const rows: ToolRow[] = [
  { icon: Database, tool: "CRM", action: "Copies lead into CRM manually", cost: "~12 min/day" },
  { icon: Mail, tool: "Email", action: "Forwards info between inboxes", cost: "~15 min/day" },
  { icon: Kanban, tool: "Project Management", action: "Creates tasks from email threads", cost: "~10 min/day" },
  { icon: Calculator, tool: "Accounting", action: "Re-enters invoice data by hand", cost: "~8 min/day" },
  { icon: CalendarDays, tool: "Calendar", action: "Checks calendar and updates CRM", cost: "~7 min/day" },
]

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function DisconnectedTools() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <div ref={ref}>
      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0 items-stretch">
        {/* Left column: Where your data lives */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -24 }}
          animate={show ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h3
            className="text-[15px] uppercase font-bold mb-6"
            style={{
              fontFamily: "var(--ax-font-mono)",
              letterSpacing: "0.08em",
              color: "var(--ax-fg-3)",
            }}
          >
            Where your data lives
          </h3>
          <div className="flex flex-col items-start">
            {rows.map((row, i) => {
              const Icon = row.icon
              return (
                <div key={row.tool} className="flex flex-col items-start">
                  {/* Disconnected indicator between pills */}
                  {i > 0 && (
                    <div className="flex items-center gap-1.5 ml-6 my-1">
                      <div
                        className="w-px h-4"
                        style={{
                          borderLeft: "1px dashed color-mix(in srgb, var(--ax-error) 40%, transparent)",
                        }}
                      />
                      <X
                        size={10}
                        style={{ color: "color-mix(in srgb, var(--ax-error) 50%, transparent)" }}
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  {/* Tool pill */}
                  <div
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-[var(--ax-radius-sm)]"
                    style={{
                      background: "var(--ax-surface-dark)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <Icon
                      size={16}
                      style={{ color: "var(--ax-fg-on-dark-2)" }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-[13px] font-medium"
                      style={{
                        fontFamily: "var(--ax-font-mono)",
                        color: "var(--ax-fg-on-dark)",
                      }}
                    >
                      {row.tool}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Centre divider label (desktop only) */}
        <div className="hidden lg:flex flex-col items-center justify-center px-8">
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-16 w-px"
              style={{ background: "var(--ax-border)" }}
            />
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--ax-radius-pill)]"
              style={{
                background: "var(--ax-slate-100)",
                border: "1px solid var(--ax-border)",
              }}
            >
              <span
                className="text-[10px] uppercase font-bold"
                style={{
                  fontFamily: "var(--ax-font-mono)",
                  letterSpacing: "0.08em",
                  color: "var(--ax-fg-3)",
                }}
              >
                A human does this
              </span>
              <ArrowRight size={12} style={{ color: "var(--ax-fg-3)" }} aria-hidden="true" />
            </div>
            <div
              className="h-16 w-px"
              style={{ background: "var(--ax-border)" }}
            />
          </div>
        </div>

        {/* Mobile divider */}
        <div className="lg:hidden flex items-center gap-2 py-2">
          <span
            className="text-[10px] uppercase font-bold"
            style={{
              fontFamily: "var(--ax-font-mono)",
              letterSpacing: "0.08em",
              color: "var(--ax-fg-3)",
            }}
          >
            A human does this
          </span>
          <ArrowRight size={12} style={{ color: "var(--ax-fg-3)" }} aria-hidden="true" />
        </div>

        {/* Right column: What your team does about it */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 24 }}
          animate={show ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h3
            className="text-[15px] uppercase font-bold mb-6"
            style={{
              fontFamily: "var(--ax-font-mono)",
              letterSpacing: "0.08em",
              color: "var(--ax-fg-3)",
            }}
          >
            What your team does about it
          </h3>
          <div className="flex flex-col gap-3">
            {rows.map((row) => (
              <div
                key={row.action}
                className="flex items-center gap-3 px-4 py-3 rounded-[var(--ax-radius-sm)]"
                style={{
                  background: "var(--ax-slate-100)",
                  border: "1px solid var(--ax-border)",
                }}
              >
                <Clock
                  size={14}
                  style={{ color: "var(--ax-fg-3)" }}
                  aria-hidden="true"
                  className="shrink-0"
                />
                <span
                  className="text-[13px] flex-1"
                  style={{
                    fontFamily: "var(--ax-font-body)",
                    color: "var(--ax-fg-2)",
                  }}
                >
                  {row.action}
                </span>
                <span
                  className="text-[11px] shrink-0 font-bold"
                  style={{
                    fontFamily: "var(--ax-font-mono)",
                    color: "var(--ax-error)",
                  }}
                >
                  {row.cost}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
