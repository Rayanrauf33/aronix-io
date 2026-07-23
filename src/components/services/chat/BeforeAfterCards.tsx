"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Scenario data                                                       */
/* ------------------------------------------------------------------ */

const before = [
  "Visitor lands at 11pm. No one available. They leave.",
  "Visitor has a price question. Contact form asks for their name and email. They close the tab.",
  "Visitor is ready to book. They email you. You reply the next morning. They\u2019ve booked elsewhere.",
]

const after = [
  "Visitor lands at 11pm. Agent greets them in 3 seconds. Appointment booked.",
  "Visitor asks about price. Agent answers immediately. Conversation continues.",
  "Visitor is ready to book. Agent opens the calendar. Slot confirmed in the same conversation.",
]

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function BeforeAfterCards() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduce = useReducedMotion()

  const show = inView || !!reduce

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      {/* Before column */}
      <div className="flex flex-col gap-4">
        <span
          className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--ax-error)] mb-1"
          style={{ fontFamily: "var(--ax-font-body)" }}
        >
          Before
        </span>
        {before.map((text, i) => (
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, x: -24 }}
            animate={show ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: i * 0.12, duration: 0.4, ease: "easeOut" }}
            className="rounded-[var(--ax-radius-md)] border border-[var(--ax-border)] p-5"
            style={{ borderLeftWidth: 3, borderLeftColor: "var(--ax-error)" }}
          >
            <p className="text-[15px] leading-[1.6] text-[var(--ax-fg-2)] m-0">{text}</p>
          </motion.div>
        ))}
      </div>

      {/* After column */}
      <div className="flex flex-col gap-4">
        <span
          className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--ax-success)] mb-1"
          style={{ fontFamily: "var(--ax-font-body)" }}
        >
          After
        </span>
        {after.map((text, i) => (
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={show ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: i * 0.12, duration: 0.4, ease: "easeOut" }}
            className="rounded-[var(--ax-radius-md)] border border-[var(--ax-border)] p-5"
            style={{ borderLeftWidth: 3, borderLeftColor: "var(--ax-success)" }}
          >
            <p className="text-[15px] leading-[1.6] text-[var(--ax-fg-2)] m-0">{text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
