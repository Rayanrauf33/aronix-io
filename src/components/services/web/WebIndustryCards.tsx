"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Stethoscope, Scale, Wrench, UtensilsCrossed } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Industry data                                                       */
/* ------------------------------------------------------------------ */

type Industry = {
  icon: LucideIcon
  name: string
  desc: string
  lift: string
}

const industries: Industry[] = [
  { icon: Stethoscope, name: "Dental clinics", desc: "Every missed enquiry is a patient at a competitor.", lift: "+4.2%" },
  { icon: Scale, name: "Legal firms", desc: "Trust is built before the first call.", lift: "+3.8%" },
  { icon: Wrench, name: "Home services", desc: "Speed and clarity win the job.", lift: "+5.1%" },
  { icon: UtensilsCrossed, name: "Hospitality", desc: "The first impression happens online.", lift: "+3.5%" },
]

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function WebIndustryCards() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <div>
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {industries.map((ind, i) => {
          const Icon = ind.icon
          return (
            <motion.div
              key={ind.name}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: i * 0.12, duration: 0.4, ease: "easeOut" }}
              className="rounded-[var(--ax-radius-lg)] border border-white/10 p-5"
              style={{ background: "var(--ax-surface-dark-alt)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-8 h-8 rounded-[var(--ax-radius-sm)] flex items-center justify-center"
                  style={{ background: "color-mix(in srgb, var(--ax-primary) 12%, transparent)" }}
                >
                  <Icon size={16} className="text-[var(--ax-primary)]" aria-hidden="true" />
                </div>
                <span
                  className="text-[var(--ax-primary)] font-bold text-[18px]"
                  style={{ fontFamily: "var(--ax-font-display)", fontVariantNumeric: "tabular-nums" }}
                >
                  {ind.lift}
                </span>
              </div>
              <h3
                className="text-[15px] font-semibold text-white mb-1.5"
                style={{ fontFamily: "var(--ax-font-display)" }}
              >
                {ind.name}
              </h3>
              <p className="text-[13px] leading-[1.5] text-[var(--ax-fg-on-dark-2)] m-0">
                {ind.desc}
              </p>
            </motion.div>
          )
        })}
      </div>
      <p
        className="text-[11px] text-[var(--ax-fg-3)] mt-4 text-center"
        style={{ fontFamily: "var(--ax-font-mono)" }}
      >
        Illustrative benchmarks based on industry averages. Your results may vary.
      </p>
    </div>
  )
}
