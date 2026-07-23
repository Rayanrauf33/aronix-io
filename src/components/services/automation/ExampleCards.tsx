"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

type FlowNode = {
  label: string
  type: "auto" | "gate"
}

type Example = {
  name: string
  flow: FlowNode[]
  outcome: string
}

const examples: Example[] = [
  {
    name: "New client onboarding",
    flow: [
      { label: "Contract", type: "auto" },
      { label: "Welcome email", type: "auto" },
      { label: "Project created", type: "auto" },
      { label: "Review", type: "gate" },
      { label: "Kickoff", type: "auto" },
    ],
    outcome: "Zero manual steps after contract is signed.",
  },
  {
    name: "Proposal follow-up",
    flow: [
      { label: "Proposal sent", type: "auto" },
      { label: "48hr reminder", type: "auto" },
      { label: "Rep action", type: "gate" },
      { label: "Follow-up", type: "auto" },
      { label: "Logged", type: "auto" },
    ],
    outcome: "No proposal goes unfollowed.",
  },
  {
    name: "Monthly reporting",
    flow: [
      { label: "Data pulled", type: "auto" },
      { label: "Consolidated", type: "auto" },
      { label: "Formatted", type: "auto" },
      { label: "Review", type: "gate" },
      { label: "Sent", type: "auto" },
    ],
    outcome: "Reports delivered on schedule, every time.",
  },
]

/* ------------------------------------------------------------------ */
/*  Mini flow                                                           */
/* ------------------------------------------------------------------ */

function MiniFlow({ nodes }: { nodes: FlowNode[] }) {
  return (
    <div className="flex items-center gap-0 flex-wrap gap-y-2">
      {nodes.map((node, i) => {
        const isGate = node.type === "gate"
        return (
          <div key={node.label} className="flex items-center">
            <span
              className="text-[10px] px-2.5 py-1 rounded-[var(--ax-radius-pill)] border"
              style={{
                fontFamily: "var(--ax-font-mono)",
                borderColor: isGate ? "var(--ax-warning)" : "rgba(255,255,255,0.15)",
                color: isGate ? "var(--ax-warning)" : "rgba(255,255,255,0.6)",
                background: isGate
                  ? "color-mix(in srgb, var(--ax-warning) 8%, transparent)"
                  : "transparent",
              }}
            >
              {node.label}
            </span>
            {i < nodes.length - 1 && (
              <div
                className="w-3 h-px mx-0.5 shrink-0"
                style={{ background: "rgba(255,255,255,0.15)" }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function ExampleCards() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {examples.map((ex, i) => (
        <motion.div
          key={ex.name}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: i * 0.15, duration: 0.4, ease: "easeOut" }}
          className="rounded-[var(--ax-radius-xl)] border border-white/10 p-6"
          style={{ background: "var(--ax-surface-dark-alt)" }}
        >
          {/* Label */}
          <div
            className="text-[11px] uppercase font-bold mb-4"
            style={{
              fontFamily: "var(--ax-font-mono)",
              letterSpacing: "0.1em",
              color: "var(--ax-primary)",
            }}
          >
            {ex.name}
          </div>

          {/* Mini flow */}
          <MiniFlow nodes={ex.flow} />

          {/* Outcome */}
          <p
            className="text-[13px] font-semibold mt-4 m-0"
            style={{ color: "var(--ax-primary)" }}
          >
            {ex.outcome}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
