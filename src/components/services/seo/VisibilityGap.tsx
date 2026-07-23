"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Shared easing                                                       */
/* ------------------------------------------------------------------ */

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ */
/*  Mini pack rows                                                      */
/* ------------------------------------------------------------------ */

function PackRow({
  rank,
  name,
  stars,
  highlight,
}: {
  rank: number
  name: string
  stars: string
  highlight?: boolean
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-[var(--ax-radius-md)]"
      style={{
        background: highlight ? "rgba(234,75,113,0.08)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${highlight ? "rgba(234,75,113,0.25)" : "rgba(255,255,255,0.07)"}`,
      }}
    >
      <span
        className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
        style={{
          background: highlight ? "var(--ax-primary)" : "rgba(255,255,255,0.1)",
          color: highlight ? "#fff" : "var(--ax-fg-on-dark-2)",
          fontFamily: "var(--ax-font-display)",
        }}
      >
        {rank}
      </span>
      <span
        className="flex-1 text-[12px] font-medium text-[var(--ax-fg-on-dark)] truncate"
        style={{ fontFamily: "var(--ax-font-display)" }}
      >
        {name}
      </span>
      <span className="text-[11px] text-[#FBBC04]">{stars}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function VisibilityGap() {
  const cardRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const cardInView = useInView(cardRef, { once: true, amount: 0.3 })
  const copyInView = useInView(copyRef, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()

  return (
    <section
      className="px-5 sm:px-12 py-20"
      aria-labelledby="seo-problem-heading"
    >
      <div className="max-w-[var(--ax-container)] mx-auto">

        {/* ── Visual card ── */}
        <div
          ref={cardRef}
          className="rounded-[var(--ax-radius-xl)] overflow-hidden mb-16"
          style={{
            background: "var(--ax-surface-dark)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2">

            {/* Left: without SEO */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -12 }}
              animate={(cardInView || !!reduce) ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className="px-6 py-8 sm:py-10"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="text-[10px] font-bold uppercase tracking-[0.1em] mb-5"
                style={{ color: "var(--ax-fg-on-dark-2)", fontFamily: "var(--ax-font-mono)" }}
              >
                Without local SEO
              </div>
              <div
                className="flex items-center gap-2 mb-4 px-3 py-2 rounded-[var(--ax-radius-sm)]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--ax-fg-on-dark-2)] shrink-0">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <span className="text-[12px] text-[var(--ax-fg-on-dark-2)]" style={{ fontFamily: "var(--ax-font-mono)" }}>
                  dentist near me
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <PackRow rank={1} name="Comfort Dental Care" stars="4.9" />
                <PackRow rank={2} name="City Smiles Dental" stars="4.7" />
                <PackRow rank={3} name="Bright Dental Studio" stars="4.5" />
              </div>
              <div
                className="mt-4 text-[11px] text-center"
                style={{ color: "var(--ax-error)", fontFamily: "var(--ax-font-mono)" }}
              >
                Your business is not here
              </div>
            </motion.div>

            {/* Right: with SEO */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: 12 }}
              animate={(cardInView || !!reduce) ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.1 }}
              className="px-6 py-8 sm:py-10"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="text-[10px] font-bold uppercase tracking-[0.1em] mb-5"
                style={{ color: "var(--ax-success)", fontFamily: "var(--ax-font-mono)" }}
              >
                With local SEO
              </div>
              <div
                className="flex items-center gap-2 mb-4 px-3 py-2 rounded-[var(--ax-radius-sm)]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--ax-fg-on-dark-2)] shrink-0">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <span className="text-[12px] text-[var(--ax-fg-on-dark-2)]" style={{ fontFamily: "var(--ax-font-mono)" }}>
                  dentist near me
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <PackRow rank={1} name="Your Business" stars="4.9" highlight />
                <PackRow rank={2} name="Comfort Dental Care" stars="4.7" />
                <PackRow rank={3} name="City Smiles Dental" stars="4.5" />
              </div>
              <div
                className="mt-4 text-[11px] text-center"
                style={{ color: "var(--ax-success)", fontFamily: "var(--ax-font-mono)" }}
              >
                First call goes to you
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Copy ── */}
        <div ref={copyRef} className="max-w-[620px] mx-auto">
          <h2 id="seo-problem-heading" className="sr-only">
            What happens when you&apos;re not ranking locally
          </h2>
          {[
            "Local search is where buying intent is highest. Someone searching for a plumber, a dental clinic, or an electrician in their area is ready to book, not browsing. If your business isn\u2019t showing in the local pack (the three results with the map on Google), they\u2019re calling one of the businesses that is.",
            "Most local businesses aren\u2019t ranking because of problems that are completely fixable. An incomplete Google Business Profile. Inconsistent name, address, and phone number across directories. A website that loads slowly or has no local content. These aren\u2019t technical mysteries; they\u2019re maintenance problems that compound over time when nobody\u2019s paying attention to them.",
            "The businesses ranking at the top aren\u2019t necessarily better than you. They\u2019ve just done the work to be more visible.",
          ].map((para, i) => (
            <motion.p
              key={i}
              className="m-0 mb-5 last:mb-0"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={(copyInView || !!reduce) ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.08 }}
              style={{ fontSize: "var(--ax-fs-body-lg)", lineHeight: "1.7", color: "var(--ax-fg-2)" }}
            >
              {para}
            </motion.p>
          ))}
        </div>

      </div>
    </section>
  )
}
