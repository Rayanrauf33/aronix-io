"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Stethoscope, Wrench, Scale } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Industry data                                                       */
/* ------------------------------------------------------------------ */

type Industry = {
  icon: LucideIcon
  name: string
  desc: string
}

const industries: Industry[] = [
  {
    icon: Stethoscope,
    name: "Dental & healthcare",
    desc: "Patients book consultations directly. No phone tag, no voicemail.",
  },
  {
    icon: Wrench,
    name: "Home services",
    desc: "Homeowners get instant answers on availability, pricing, and coverage area.",
  },
  {
    icon: Scale,
    name: "Legal firms",
    desc: "Potential clients describe their situation. The agent qualifies and books a consultation.",
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function IndustryTiles() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {industries.map((ind, i) => {
        const Icon = ind.icon
        return (
          <motion.div
            key={ind.name}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: i * 0.15, duration: 0.4, ease: "easeOut" }}
          >
            <div
              className="rounded-[var(--ax-radius-lg)] border border-white/10 p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              style={{ background: "var(--ax-surface-dark-alt)" }}
            >
              <div
                className="w-8 h-8 rounded-[var(--ax-radius-sm)] flex items-center justify-center mb-4"
                style={{ background: "rgba(234,75,113,0.12)" }}
              >
                <Icon size={16} className="text-[var(--ax-primary)]" aria-hidden="true" />
              </div>
              <h3
                className="text-[16px] font-semibold text-white mb-2"
                style={{ fontFamily: "var(--ax-font-display)" }}
              >
                {ind.name}
              </h3>
              <p className="text-[14px] leading-[1.6] text-[var(--ax-fg-on-dark-2)] m-0">
                {ind.desc}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
