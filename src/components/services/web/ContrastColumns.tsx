"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Row data                                                            */
/* ------------------------------------------------------------------ */

const rows = [
  { them: "Start with design.", us: "Start with your customer\u2019s decision." },
  { them: "Hand over a finished site.", us: "Stay involved until it converts." },
  { them: "Build on a page builder.", us: "Build in Next.js, server-side rendered." },
  { them: "Disappear after launch.", us: "Monitor the first 60 days, adjust based on data." },
]

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function ContrastColumns() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <div ref={ref}>
      {/* Column headers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6">
        <div
          className="text-[13px] font-bold uppercase text-[var(--ax-fg-3)]"
          style={{ fontFamily: "var(--ax-font-body)", letterSpacing: "0.12em" }}
        >
          How most agencies build
        </div>
        <div
          className="text-[13px] font-bold uppercase text-[var(--ax-fg-1)]"
          style={{ fontFamily: "var(--ax-font-body)", letterSpacing: "0.12em" }}
        >
          How we build
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {rows.map((row, i) => (
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: i * 0.2, duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 py-5 border-t border-[var(--ax-border)]"
          >
            {/* Their way */}
            <div className="text-[15px] leading-[1.6] text-[var(--ax-fg-3)]">
              {row.them}
            </div>

            {/* Our way */}
            <div className="flex items-start gap-2.5">
              <span
                className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                style={{ background: "var(--ax-primary)" }}
                aria-hidden="true"
              />
              <span className="text-[15px] leading-[1.6] text-[var(--ax-fg-1)]">
                {row.us}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
