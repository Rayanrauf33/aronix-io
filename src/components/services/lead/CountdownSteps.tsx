"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Step data                                                           */
/* ------------------------------------------------------------------ */

const steps = [
  {
    n: "01",
    t: "Map your sources",
    d: "We audit every place a lead can come from. Your website forms, ad platforms, social channels, and any tools you already use like a CRM or booking system.",
  },
  {
    n: "02",
    t: "Write the sequences",
    d: "We write the initial response messages and follow-up sequences for each lead source. Every message sounds like you wrote it, because it\u2019s based on how you actually talk to new enquiries.",
  },
  {
    n: "03",
    t: "Connect and test",
    d: "We wire the system into your existing tools. No new software you have to learn. We run test leads through every source and fix anything that misfires before anything goes live.",
  },
  {
    n: "04",
    t: "Launch and monitor",
    d: "The system goes live. You get a simple dashboard showing every lead, what was sent, and what they replied. We review it with you monthly and tighten sequences that aren\u2019t converting.",
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function CountdownSteps() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <div ref={ref} className="flex flex-col">
      {steps.map((step, i) => (
        <motion.div
          key={step.n}
          initial={reduce ? false : { opacity: 0, x: -32 }}
          animate={show ? { opacity: 1, x: 0 } : undefined}
          transition={{ delay: i * 0.15, duration: 0.45, ease: "easeOut" }}
        >
          <div className="flex items-start gap-6 sm:gap-10 py-8">
            {/* Large number */}
            <div className="shrink-0 flex items-center gap-6 sm:gap-10">
              <span
                className="text-[var(--ax-primary)] select-none"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(48px, 6vw, 96px)",
                  lineHeight: 1,
                  opacity: 0.9,
                }}
              >
                {step.n}
              </span>

              {/* Vertical rule */}
              <div
                className="w-px self-stretch bg-white/10"
                aria-hidden="true"
              />
            </div>

            {/* Content */}
            <div className="pt-2">
              <h3
                className="text-[18px] font-semibold text-white mb-2"
                style={{ fontFamily: "var(--ax-font-display)" }}
              >
                {step.t}
              </h3>
              <p className="text-[14px] leading-[1.7] text-[var(--ax-fg-on-dark-2)] m-0">
                {step.d}
              </p>
            </div>
          </div>

          {/* Horizontal rule between steps */}
          {i < steps.length - 1 && (
            <div className="h-px bg-white/8" aria-hidden="true" />
          )}
        </motion.div>
      ))}
    </div>
  )
}
