"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Search } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Shared easing                                                       */
/* ------------------------------------------------------------------ */

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const industries = [
  {
    query: "dentist near me",
    label: "Dental",
    pack: ["City Dental Clinic", "Bright Smiles", "Your Business"],
  },
  {
    query: "HVAC repair near me",
    label: "HVAC and plumbing",
    pack: ["Metro HVAC Co.", "Your Business", "Cool Air Services"],
  },
  {
    query: "family law attorney near me",
    label: "Legal firms",
    pack: ["Your Business", "Hart Law Group", "Apex Legal"],
  },
  {
    query: "house cleaning near me",
    label: "Home services",
    pack: ["SparkClean", "Your Business", "Fresh Home Co."],
  },
  {
    query: "restaurant near me",
    label: "Restaurants",
    pack: ["The Corner Table", "Olive and Vine", "Your Business"],
  },
]

/* ------------------------------------------------------------------ */
/*  Single card                                                        */
/* ------------------------------------------------------------------ */

function IndustryCard({
  industry,
  i,
  show,
  reduce,
}: {
  industry: typeof industries[number]
  i: number
  show: boolean
  reduce: boolean | null
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: i * 0.07, duration: 0.5, ease: EASE_OUT }}
      className="seo-industry-card rounded-[var(--ax-radius-xl)] p-5 cursor-default"
      style={{ background: "var(--ax-surface-dark-alt)" }}
    >
      {/* Search bar */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-[var(--ax-radius-sm)] mb-4"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Search size={11} className="text-[var(--ax-fg-on-dark-2)] shrink-0" />
        <span
          className="text-[11px] text-[var(--ax-fg-on-dark-2)] leading-none truncate"
          style={{ fontFamily: "var(--ax-font-mono)" }}
        >
          {industry.query}
        </span>
      </div>

      {/* Mini result list */}
      <div className="flex flex-col gap-1.5 mb-4">
        {industry.pack.map((name, j) => {
          const isYours = name === "Your Business"
          return (
            <div
              key={j}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-[var(--ax-radius-sm)]"
              style={{
                background: isYours ? "rgba(234,75,113,0.08)" : undefined,
                border: isYours ? "1px solid rgba(234,75,113,0.2)" : undefined,
              }}
            >
              <span
                className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{
                  background: isYours ? "var(--ax-primary)" : "rgba(255,255,255,0.1)",
                  color: isYours ? "#fff" : "var(--ax-fg-on-dark-2)",
                  fontFamily: "var(--ax-font-display)",
                }}
              >
                {j + 1}
              </span>
              <span
                className="text-[12px] leading-none truncate"
                style={{
                  color: isYours ? "var(--ax-fg-on-dark)" : "var(--ax-fg-on-dark-2)",
                  fontFamily: isYours ? "var(--ax-font-display)" : undefined,
                  fontWeight: isYours ? 600 : undefined,
                }}
              >
                {name}
              </span>
            </div>
          )
        })}
      </div>

      {/* Label */}
      <div
        className="text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--ax-fg-on-dark-2)]"
        style={{ fontFamily: "var(--ax-font-mono)" }}
      >
        {industry.label}
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function IndustrySearchCards() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <>
      <style>{`
        .seo-industry-card {
          border: 1px solid rgba(255,255,255,0.08);
          border-bottom: 2px solid rgba(255,255,255,0.08);
          transition: border-bottom-color 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .seo-industry-card:hover {
          border-bottom-color: var(--ax-primary);
        }
      `}</style>

      <section
        className="px-5 sm:px-12 py-20"
        style={{ background: "var(--ax-surface-dark)" }}
        aria-labelledby="seo-audience-heading"
      >
        <div className="max-w-[var(--ax-container)] mx-auto">

          {/* ── Heading ── */}
          <div className="mb-12 max-w-[560px]">
            <span
              className="block text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--ax-primary)] mb-3"
              style={{ fontFamily: "var(--ax-font-mono)" }}
            >
              Who it&apos;s for
            </span>
            <h2
              id="seo-audience-heading"
              className="text-[var(--ax-fg-on-dark)]"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 800,
                fontSize: "var(--ax-fs-h2)",
                lineHeight: "var(--ax-lh-snug)",
                letterSpacing: "var(--ax-tracking-tight)",
              }}
            >
              Built for businesses customers search for by location.
            </h2>
            <p
              className="mt-4 m-0 text-[var(--ax-fg-on-dark-2)]"
              style={{ fontSize: "var(--ax-fs-body-lg)", lineHeight: "1.65" }}
            >
              If you rely on customers in a specific geographic area and those
              customers use Google to find businesses like yours, local SEO is
              how you show up instead of being invisible.
            </p>
          </div>

          {/* ── Cards ── */}
          <div
            ref={ref}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {industries.map((ind, i) => (
              <IndustryCard
                key={ind.label}
                industry={ind}
                i={i}
                show={show}
                reduce={reduce}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
