"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Step data                                                           */
/* ------------------------------------------------------------------ */

const steps = [
  {
    n: "01",
    t: "Train",
    d: "We work through your services, pricing, FAQs, and the questions your existing customers ask most. This becomes the agent\u2019s knowledge base.",
  },
  {
    n: "02",
    t: "Build",
    d: "We build the agent and configure the booking flow to connect directly to your calendar. We also write the opening messages and the capture sequences for visitors who aren\u2019t ready to book yet.",
  },
  {
    n: "03",
    t: "Test",
    d: "We run it through a full range of real visitor scenarios. Difficult questions, edge cases, attempts to confuse it. You review how it handles them before it goes live.",
  },
  {
    n: "04",
    t: "Launch and tune",
    d: "It goes live on your website. We review chat transcripts in the first few weeks and update the knowledge base whenever it hits a question it handles poorly.",
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function HorizontalScrollSteps() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Translate the strip horizontally based on scroll progress
  // 4 cards, each ~320px + gap, we need to move ~960px on a 1280px viewport
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

  if (reduce) {
    // Reduced motion: simple vertical stack
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map(({ n, t, d }) => (
          <StepCard key={n} n={n} t={t} d={d} />
        ))}
      </div>
    )
  }

  return (
    <>
      {/* Mobile: vertical stack */}
      <div className="md:hidden grid grid-cols-1 gap-8">
        {steps.map(({ n, t, d }) => (
          <StepCard key={n} n={n} t={t} d={d} />
        ))}
      </div>

      {/* Desktop: horizontal scroll */}
      <div
        ref={sectionRef}
        className="hidden md:block relative"
        style={{ height: "300vh" }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div
            className="flex gap-8 pl-8"
            style={{ x }}
          >
            {steps.map(({ n, t, d }) => (
              <div key={n} className="w-[360px] shrink-0">
                <StepCard n={n} t={t} d={d} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Step card                                                           */
/* ------------------------------------------------------------------ */

function StepCard({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div
      className="rounded-[var(--ax-radius-xl)] border border-white/10 p-8 relative overflow-hidden"
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      {/* Watermark number */}
      <span
        className="absolute top-4 right-6 select-none pointer-events-none text-white"
        style={{
          fontFamily: "var(--ax-font-display)",
          fontWeight: 800,
          fontSize: "clamp(80px, 8vw, 120px)",
          lineHeight: 1,
          opacity: 0.04,
        }}
        aria-hidden="true"
      >
        {n}
      </span>

      {/* Content */}
      <div className="relative z-[1]">
        <div
          className="text-[12px] uppercase text-[var(--ax-primary)] mb-3 font-bold"
          style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.1em" }}
        >
          Step {n}
        </div>
        <h3
          className="text-[20px] font-semibold text-white mb-3"
          style={{ fontFamily: "var(--ax-font-display)" }}
        >
          {t}
        </h3>
        <p className="text-[14px] leading-[1.7] text-[var(--ax-fg-on-dark-2)] m-0">
          {d}
        </p>
      </div>
    </div>
  )
}
