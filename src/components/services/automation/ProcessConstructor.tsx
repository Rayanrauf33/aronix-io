"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Chain data                                                          */
/* ------------------------------------------------------------------ */

type ChainNode = {
  label: string
  type: "auto" | "gate"
}

type Trigger = {
  label: string
  chain: ChainNode[]
}

const triggers: Trigger[] = [
  {
    label: "New client signed",
    chain: [
      { label: "Welcome email", type: "auto" },
      { label: "Project created", type: "auto" },
      { label: "Invoice generated", type: "auto" },
      { label: "Review scope", type: "gate" },
      { label: "Kickoff scheduled", type: "auto" },
    ],
  },
  {
    label: "Invoice paid",
    chain: [
      { label: "Payment logged", type: "auto" },
      { label: "Receipt sent", type: "auto" },
      { label: "Approve release", type: "gate" },
      { label: "Funds released", type: "auto" },
      { label: "Notification sent", type: "auto" },
    ],
  },
  {
    label: "Project stage changed",
    chain: [
      { label: "Stage updated", type: "auto" },
      { label: "Team notified", type: "auto" },
      { label: "Next task created", type: "auto" },
      { label: "PM sign-off", type: "gate" },
      { label: "Client update sent", type: "auto" },
    ],
  },
  {
    label: "Form submitted",
    chain: [
      { label: "Data validated", type: "auto" },
      { label: "Lead created", type: "auto" },
      { label: "Assignment routed", type: "auto" },
      { label: "Quality check", type: "gate" },
      { label: "Welcome sequence", type: "auto" },
    ],
  },
  {
    label: "Support ticket opened",
    chain: [
      { label: "Ticket logged", type: "auto" },
      { label: "Priority assessed", type: "auto" },
      { label: "Team assigned", type: "auto" },
      { label: "Escalation check", type: "gate" },
      { label: "Response sent", type: "auto" },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Trigger pill                                                        */
/* ------------------------------------------------------------------ */

function TriggerPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "w-full text-left px-5 py-3 rounded-[var(--ax-radius-pill)] border text-[13px] font-medium",
        "transition-[border-color,background-color,color] duration-150",
        "focus-visible:outline-2 focus-visible:outline-[var(--ax-primary)] focus-visible:outline-offset-2",
        active
          ? "border-[var(--ax-primary)] text-white"
          : "border-white/15 text-[var(--ax-fg-on-dark-2)] hover:border-white/30",
      )}
      style={{
        fontFamily: "var(--ax-font-mono)",
        background: active
          ? "color-mix(in srgb, var(--ax-primary) 12%, transparent)"
          : "transparent",
      }}
    >
      {label}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  Chain node                                                          */
/* ------------------------------------------------------------------ */

function ChainNodeEl({ node }: { node: ChainNode }) {
  const isGate = node.type === "gate"
  return (
    <div className="flex flex-col items-center gap-1">
      {isGate && (
        <span
          className="text-[9px] uppercase font-bold"
          style={{
            fontFamily: "var(--ax-font-mono)",
            letterSpacing: "0.08em",
            color: "var(--ax-warning)",
          }}
        >
          Approval
        </span>
      )}
      <div
        className="flex items-center justify-center px-3 py-2 rounded-[var(--ax-radius-sm)] border text-center"
        style={{
          width: 120,
          minHeight: 44,
          borderColor: isGate ? "var(--ax-warning)" : "var(--ax-primary)",
          background: isGate
            ? "color-mix(in srgb, var(--ax-warning) 10%, transparent)"
            : "color-mix(in srgb, var(--ax-primary) 8%, transparent)",
          ...(isGate
            ? { boxShadow: "0 0 10px rgba(251,191,36,0.2)" }
            : {}),
        }}
      >
        <span
          className="text-[11px] font-medium leading-tight"
          style={{
            fontFamily: "var(--ax-font-mono)",
            color: "var(--ax-fg-on-dark)",
          }}
        >
          {node.label}
        </span>
      </div>
    </div>
  )
}

function ChainConnector() {
  return (
    <svg
      viewBox="0 0 24 12"
      className="w-5 h-3 shrink-0"
      aria-hidden="true"
    >
      <line x1="0" y1="6" x2="18" y2="6" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <path d="M16 2l6 4-6 4" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function ProcessConstructor() {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  const chain = triggers[active].chain

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-8"
    >
      {/* Trigger pills */}
      <div role="tablist" aria-label="Automation triggers" className="flex flex-col gap-2">
        {triggers.map((t, i) => (
          <TriggerPill
            key={t.label}
            label={t.label}
            active={active === i}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      {/* Canvas */}
      <div
        role="tabpanel"
        aria-label={`Automation chain for ${triggers[active].label}`}
        className="rounded-[var(--ax-radius-xl)] border border-white/10 p-6 sm:p-8 flex items-center justify-center min-h-[200px]"
        style={{
          background: "var(--ax-surface-dark-alt)",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-y-4 gap-x-1"
          >
            {chain.map((node, i) => (
              <div key={`${active}-${node.label}`} className="flex items-center gap-1">
                <ChainNodeEl node={node} />
                {i < chain.length - 1 && <ChainConnector />}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
