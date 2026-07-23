"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Shared easing                                                       */
/* ------------------------------------------------------------------ */

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ */
/*  Work items                                                          */
/* ------------------------------------------------------------------ */

type Priority = "high" | "medium" | "ongoing"

const pillStyles: Record<Priority, { bg: string; color: string; label: string }> = {
  high:    { bg: "rgba(234,75,113,0.12)",   color: "var(--ax-primary)",      label: "High impact" },
  medium:  { bg: "rgba(100,117,189,0.14)",  color: "var(--ax-accent-dark)",  label: "Medium impact" },
  ongoing: { bg: "rgba(255,255,255,0.08)",  color: "var(--ax-fg-3)",         label: "Ongoing" },
}

const workItems = [
  {
    priority: "high" as Priority,
    title: "Google Business Profile",
    body: "We start here because it has the biggest impact in the shortest time. Profile completeness, categories, photos, review management, and posts. Most businesses are leaving easy ranking improvements on the table here.",
  },
  {
    priority: "high" as Priority,
    title: "Citation consistency",
    body: "Your business name, address, and phone number must be correct and identical across every directory that matters. Inconsistencies here actively hurt your rankings. We audit and clean every listing.",
  },
  {
    priority: "medium" as Priority,
    title: "Website foundations",
    body: "Location pages, local schema markup, page speed, and the on-page elements Google uses to decide whether your website is relevant to a local search. We fix the foundations the algorithm needs to trust your site.",
  },
  {
    priority: "ongoing" as Priority,
    title: "Review generation",
    body: "Google ranks businesses with more recent, higher-rated reviews higher. We set up the systems that make it easy for happy customers to leave a review without you having to remember to ask.",
  },
]

/* ------------------------------------------------------------------ */
/*  Single work block                                                   */
/* ------------------------------------------------------------------ */

function WorkBlock({ item, i }: { item: typeof workItems[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduce = useReducedMotion()
  const pill = pillStyles[item.priority]

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={(inView || !!reduce) ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: i * 0.07, duration: 0.5, ease: EASE_OUT }}
      className="py-8 border-b last:border-b-0"
      style={{ borderColor: "var(--ax-border)" }}
    >
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.08em] mb-4"
        style={{
          background: pill.bg,
          color: pill.color,
          fontFamily: "var(--ax-font-mono)",
        }}
      >
        {pill.label}
      </div>
      <h3
        className="text-[20px] text-[var(--ax-fg-1)] mb-3"
        style={{
          fontFamily: "var(--ax-font-display)",
          fontWeight: 700,
          lineHeight: "var(--ax-lh-snug)",
        }}
      >
        {item.title}
      </h3>
      <p
        className="text-[var(--ax-fg-2)] m-0"
        style={{ fontSize: "var(--ax-fs-body-lg)", lineHeight: "1.65" }}
      >
        {item.body}
      </p>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function WorkStack() {
  return (
    <section
      className="px-5 sm:px-12 py-20"
      style={{ background: "var(--ax-slate-100)" }}
      aria-labelledby="seo-work-heading"
    >
      <div className="max-w-[var(--ax-container)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-20">

          {/* ── Sticky heading ── */}
          <div className="lg:pt-8">
            <div className="lg:sticky lg:top-[140px]">
              <span
                className="block text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--ax-primary-dark)] mb-3"
                style={{ fontFamily: "var(--ax-font-mono)" }}
              >
                What we work on
              </span>
              <h2
                id="seo-work-heading"
                className="text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 800,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Priority-ordered work that moves the needle.
              </h2>
            </div>
          </div>

          {/* ── Work blocks ── */}
          <div>
            {workItems.map((item, i) => (
              <WorkBlock key={item.title} item={item} i={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
