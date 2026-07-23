"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Step data                                                           */
/* ------------------------------------------------------------------ */

const steps = [
  {
    n: "01",
    t: "Discovery",
    d: "We look at your current website performance if you have one, who your customers are, what they\u2019re searching, and who you\u2019re competing with. This shapes everything that comes after.",
    wide: false,
    visual: null as "sitemap" | "chart" | null,
  },
  {
    n: "02",
    t: "Structure and copy",
    d: "We map the site structure and write the copy before design starts. Every headline, every section, every call to action is written and reviewed before a single colour is chosen.",
    wide: true,
    visual: "sitemap" as const,
  },
  {
    n: "03",
    t: "Design and build",
    d: "We design and build in Next.js. You review at each stage: wireframes, design, development. Nothing moves forward without your sign-off.",
    wide: false,
    visual: null,
  },
  {
    n: "04",
    t: "Launch and optimise",
    d: "We launch and monitor the first 60 days. Heatmaps, conversion data, page performance. If something isn\u2019t working, we adjust it.",
    wide: true,
    visual: "chart" as const,
  },
]

/* ------------------------------------------------------------------ */
/*  Mini visuals                                                        */
/* ------------------------------------------------------------------ */

function SitemapVisual() {
  return (
    <svg viewBox="0 0 120 80" className="w-full max-w-[120px] h-auto mt-4" aria-hidden="true">
      {/* Homepage box */}
      <rect x="35" y="4" width="50" height="16" rx="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <text x="60" y="15" textAnchor="middle" fill="var(--ax-fg-on-dark-2)" fontSize="6" fontFamily="var(--ax-font-mono)">Home</text>
      {/* Lines */}
      <line x1="45" y1="20" x2="20" y2="36" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="60" y1="20" x2="60" y2="36" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="75" y1="20" x2="100" y2="36" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      {/* Child boxes */}
      <rect x="2" y="36" width="36" height="14" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="20" y="46" textAnchor="middle" fill="var(--ax-fg-on-dark-2)" fontSize="5" fontFamily="var(--ax-font-mono)">Services</text>
      <rect x="42" y="36" width="36" height="14" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="60" y="46" textAnchor="middle" fill="var(--ax-fg-on-dark-2)" fontSize="5" fontFamily="var(--ax-font-mono)">About</text>
      <rect x="82" y="36" width="36" height="14" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="100" y="46" textAnchor="middle" fill="var(--ax-fg-on-dark-2)" fontSize="5" fontFamily="var(--ax-font-mono)">Contact</text>
    </svg>
  )
}

function ChartVisual() {
  return (
    <svg viewBox="0 0 120 60" className="w-full max-w-[120px] h-auto mt-4" aria-hidden="true">
      {/* Axis */}
      <line x1="10" y1="50" x2="110" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="10" y1="50" x2="10" y2="5" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      {/* Upward trend line */}
      <polyline
        points="10,45 30,40 50,35 70,28 90,18 110,10"
        fill="none"
        stroke="var(--ax-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      {/* Data dots */}
      {[[10,45],[30,40],[50,35],[70,28],[90,18],[110,10]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="var(--ax-primary)" />
      ))}
      {/* Labels */}
      <text x="60" y="58" textAnchor="middle" fill="var(--ax-fg-on-dark-2)" fontSize="5" fontFamily="var(--ax-font-mono)">60 days</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function MagazineSteps() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <div ref={ref}>
      {/* Desktop: horizontal full-bleed row */}
      <div className="hidden md:flex gap-0">
        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: i * 0.15, duration: 0.45, ease: "easeOut" }}
            className={`relative overflow-hidden p-6 lg:p-8 ${step.wide ? "flex-[1.4]" : "flex-1"} ${i > 0 ? "border-l border-white/10" : ""}`}
          >
            {/* Watermark number */}
            <span
              className="absolute top-2 right-4 select-none pointer-events-none text-white"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 800,
                fontSize: "clamp(96px, 12vw, 192px)",
                lineHeight: 1,
                opacity: 0.04,
              }}
              aria-hidden="true"
            >
              {step.n}
            </span>

            <div className="relative z-[1]">
              <div
                className="text-[11px] uppercase text-[var(--ax-primary)] mb-3 font-bold"
                style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.1em" }}
              >
                Step {step.n}
              </div>
              <h3
                className="text-[18px] font-semibold text-white mb-3"
                style={{ fontFamily: "var(--ax-font-display)" }}
              >
                {step.t}
              </h3>
              <p className="text-[13px] leading-[1.7] text-[var(--ax-fg-on-dark-2)] m-0">
                {step.d}
              </p>
              {step.visual === "sitemap" && <SitemapVisual />}
              {step.visual === "chart" && <ChartVisual />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden flex flex-col gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={`m-${step.n}`}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[var(--ax-radius-lg)] border border-white/10 p-6"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <span
              className="absolute top-2 right-4 select-none pointer-events-none text-white"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 800,
                fontSize: "80px",
                lineHeight: 1,
                opacity: 0.04,
              }}
              aria-hidden="true"
            >
              {step.n}
            </span>
            <div className="relative z-[1]">
              <div
                className="text-[11px] uppercase text-[var(--ax-primary)] mb-2 font-bold"
                style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.1em" }}
              >
                Step {step.n}
              </div>
              <h3
                className="text-[18px] font-semibold text-white mb-2"
                style={{ fontFamily: "var(--ax-font-display)" }}
              >
                {step.t}
              </h3>
              <p className="text-[13px] leading-[1.7] text-[var(--ax-fg-on-dark-2)] m-0">
                {step.d}
              </p>
              {step.visual === "sitemap" && <SitemapVisual />}
              {step.visual === "chart" && <ChartVisual />}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
