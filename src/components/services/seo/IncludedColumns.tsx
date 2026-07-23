"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Check } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Shared easing                                                       */
/* ------------------------------------------------------------------ */

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const setupItems = [
  "Full local SEO audit including competitor review",
  "Citation audit and cleanup across major directories",
  "On-page local SEO for your website: location pages, schema, technical fixes",
]

const ongoingItems = [
  "Google Business Profile optimisation and ongoing management",
  "Review generation system setup",
  "Monthly ranking reports for your target searches",
  "Monthly Google Business Profile performance report",
]

/* ------------------------------------------------------------------ */
/*  Column                                                             */
/* ------------------------------------------------------------------ */

function Column({
  label,
  items,
  accent,
  delay,
}: {
  label: string
  items: string[]
  accent?: boolean
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={(inView || !!reduce) ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, ease: EASE_OUT, delay }}
      className="rounded-[var(--ax-radius-xl)] p-7 sm:p-8 h-full"
      style={{
        background: accent ? "var(--ax-surface-dark)" : "#fff",
        border: accent
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid var(--ax-border)",
      }}
    >
      <div
        className="text-[10px] font-bold uppercase tracking-[0.1em] mb-5"
        style={{
          color: accent ? "var(--ax-primary)" : "var(--ax-fg-3)",
          fontFamily: "var(--ax-font-mono)",
        }}
      >
        {label}
      </div>
      <ul className="flex flex-col gap-3 list-none p-0 m-0">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check
              size={15}
              strokeWidth={2.5}
              className="shrink-0 mt-0.5"
              style={{ color: accent ? "var(--ax-success)" : "var(--ax-primary)" }}
              aria-hidden="true"
            />
            <span
              className="text-[14px] leading-[1.6]"
              style={{ color: accent ? "var(--ax-fg-on-dark-2)" : "var(--ax-fg-2)" }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function IncludedColumns() {
  return (
    <section
      className="px-5 sm:px-12 py-20"
      style={{ background: "var(--ax-slate-200)" }}
      aria-labelledby="seo-included-heading"
    >
      <div className="max-w-[var(--ax-container)] mx-auto">

        {/* ── Heading ── */}
        <div className="mb-12">
          <span
            className="block text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--ax-primary-dark)] mb-3"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            What&apos;s included
          </span>
          <h2
            id="seo-included-heading"
            className="text-[var(--ax-fg-1)]"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 800,
              fontSize: "var(--ax-fs-h2)",
              lineHeight: "var(--ax-lh-snug)",
              letterSpacing: "var(--ax-tracking-tight)",
            }}
          >
            Foundation work, then ongoing management.
          </h2>
        </div>

        {/* ── Columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          <Column label="Setup" items={setupItems} delay={0} />
          <Column label="Ongoing" items={ongoingItems} accent delay={0.1} />
        </div>

      </div>
    </section>
  )
}
