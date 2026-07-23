"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const cards = [
  "Your team copies data between tools by hand",
  "Deals fall through the cracks",
  "Your CRM reports don\u2019t reflect reality",
]

/* ------------------------------------------------------------------ */
/*  CSS hover style                                                     */
/* ------------------------------------------------------------------ */

const hoverStyle = `
.ax-audience-card {
  transition: border-color var(--ax-dur-fast) ease-out;
  border-left: 3px solid transparent;
}
.ax-audience-card:hover {
  border-left-color: var(--ax-primary);
}
`

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function AudienceCards() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <style dangerouslySetInnerHTML={{ __html: hoverStyle }} />
      {cards.map((text, i) => (
        <motion.div
          key={text}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: i * 0.1, duration: 0.3, ease: "easeOut" }}
          className="ax-audience-card rounded-[var(--ax-radius-lg)] border border-white/10 p-5"
          style={{ background: "var(--ax-surface-dark-alt)" }}
        >
          <p
            className="text-[15px] leading-[1.6] m-0 font-medium"
            style={{ color: "var(--ax-fg-on-dark)" }}
          >
            {text}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
