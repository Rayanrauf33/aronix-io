"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Callout data                                                        */
/* ------------------------------------------------------------------ */

type Callout = {
  label: string
  targetY: number
  side: "left" | "right"
}

const callouts: Callout[] = [
  { label: "Too many choices. Visitor gets lost.", targetY: 8, side: "right" },
  { label: "No clear offer. What do they actually do?", targetY: 28, side: "left" },
  { label: "Seven fields. High friction. Most abandon here.", targetY: 62, side: "right" },
  { label: "No CTA above the fold. They\u2019ve already left.", targetY: 88, side: "left" },
]

/* ------------------------------------------------------------------ */
/*  Browser mockup                                                      */
/* ------------------------------------------------------------------ */

function MockupContent() {
  return (
    <div
      className="rounded-[var(--ax-radius-lg)] overflow-hidden border border-[var(--ax-border)]"
      style={{ background: "var(--ax-slate-100)" }}
    >
      {/* Chrome */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-[var(--ax-slate-900)]">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <span className="w-2 h-2 rounded-full bg-[#28C840]" />
        <div
          className="ml-2 flex-1 h-5 rounded-[var(--ax-radius-xs)] flex items-center px-2"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <span
            className="text-[9px] text-[var(--ax-slate-500)]"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            example-dental.com
          </span>
        </div>
      </div>

      {/* Bad site content */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Nav */}
        <div className="flex gap-2 flex-wrap">
          {["Home", "About", "Services", "Team", "Gallery", "Blog", "Testimonials", "Contact"].map((n) => (
            <span key={n} className="text-[8px] text-[var(--ax-slate-600)]">{n}</span>
          ))}
        </div>

        {/* Hero text */}
        <div className="pt-3">
          <div
            className="text-[13px] font-bold text-[var(--ax-fg-1)] leading-[1.3]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Welcome to Riverside Dental, Your Local Family Dentist
          </div>
        </div>

        {/* Wall of text */}
        <div className="space-y-1.5">
          {[100, 95, 100, 90, 100, 85, 95, 100].map((w, i) => (
            <div key={i} className="h-1.5 rounded bg-[var(--ax-slate-300)]" style={{ width: `${w}%` }} />
          ))}
        </div>

        {/* Contact form */}
        <div className="space-y-2 pt-2">
          <div className="text-[9px] text-[var(--ax-fg-3)] font-medium">Contact Us</div>
          {["Name", "Email", "Phone", "Address", "Service", "Preferred Date", "Message"].map((f) => (
            <div key={f} className="flex items-center gap-2">
              <span className="text-[7px] text-[var(--ax-slate-500)] w-14 shrink-0">{f}</span>
              <div className="h-4 flex-1 rounded-[2px] border border-[var(--ax-slate-300)] bg-[var(--ax-bg)]" />
            </div>
          ))}
        </div>

        {/* Footer area */}
        <div className="pt-4 border-t border-[var(--ax-slate-300)]">
          <div className="h-1.5 w-1/3 rounded bg-[var(--ax-slate-300)]" />
          <div className="h-1 w-1/2 rounded bg-[var(--ax-slate-200)] mt-1.5" />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Callout bubble                                                      */
/* ------------------------------------------------------------------ */

function CalloutBubble({ label }: { label: string }) {
  return (
    <div
      className="rounded-[var(--ax-radius-sm)] px-3 py-2"
      style={{
        background: "var(--ax-error-bg)",
        border: "1px solid color-mix(in srgb, var(--ax-error) 15%, transparent)",
      }}
    >
      <span
        className="text-[11px] leading-[1.4] text-[var(--ax-error)]"
        style={{ fontFamily: "var(--ax-font-mono)" }}
      >
        {label}
      </span>
    </div>
  )
}

function ConnectorLine() {
  return (
    <div
      className="w-6 h-px shrink-0"
      style={{ background: "var(--ax-error)", opacity: 0.4 }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function AnnotatedMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  const leftCallouts = callouts.filter((c) => c.side === "left")
  const rightCallouts = callouts.filter((c) => c.side === "right")

  return (
    <div ref={ref}>
      {/* Desktop: 3-column grid with callout sidebars */}
      <div
        className="hidden lg:grid max-w-[960px] mx-auto"
        style={{ gridTemplateColumns: "1fr 2.5fr 1fr" }}
      >
        {/* Left callouts column */}
        <div className="relative">
          {leftCallouts.map((c) => {
            const idx = callouts.indexOf(c)
            return (
              <div
                key={c.label}
                className="absolute right-0"
                style={{ top: `${c.targetY}%`, transform: "translateY(-50%)" }}
              >
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  animate={show ? { opacity: 1, x: 0 } : undefined}
                  transition={{ delay: idx * 0.4, duration: 0.4, ease: "easeOut" }}
                  className="flex items-center gap-2"
                >
                  <CalloutBubble label={c.label} />
                  <ConnectorLine />
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* Centre: Browser mockup */}
        <MockupContent />

        {/* Right callouts column */}
        <div className="relative">
          {rightCallouts.map((c) => {
            const idx = callouts.indexOf(c)
            return (
              <div
                key={c.label}
                className="absolute left-0"
                style={{ top: `${c.targetY}%`, transform: "translateY(-50%)" }}
              >
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={show ? { opacity: 1, x: 0 } : undefined}
                  transition={{ delay: idx * 0.4, duration: 0.4, ease: "easeOut" }}
                  className="flex items-center gap-2"
                >
                  <ConnectorLine />
                  <CalloutBubble label={c.label} />
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile/tablet: mockup with bullet list below */}
      <div className="lg:hidden max-w-[600px] mx-auto">
        <MockupContent />
        <div className="mt-6 flex flex-col gap-3">
          {callouts.map((c, i) => (
            <motion.div
              key={`m-${c.label}`}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: i * 0.3, duration: 0.35, ease: "easeOut" }}
              className="flex items-start gap-2"
            >
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ background: "var(--ax-error)" }}
              />
              <span className="text-[13px] text-[var(--ax-fg-2)]">{c.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
