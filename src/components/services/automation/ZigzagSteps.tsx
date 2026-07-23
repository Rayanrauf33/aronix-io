"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Step data                                                           */
/* ------------------------------------------------------------------ */

const steps = [
  {
    n: "01",
    t: "Process audit",
    d: "We spend time understanding how your team actually does the work today. Where the steps are, where the handoffs happen, and where things go wrong or get dropped.",
  },
  {
    n: "02",
    t: "Map and design",
    d: "We document the process as it should work and identify every integration point. You review and sign off on the design before we build anything.",
  },
  {
    n: "03",
    t: "Build and test",
    d: "We build the automation and run it against real scenarios. Edge cases, error conditions, high volume. We don\u2019t hand it over until it handles the hard cases cleanly.",
  },
  {
    n: "04",
    t: "Deploy and train",
    d: "We deploy it into your live environment and walk your team through how to monitor it and what to do if something unexpected happens. You\u2019re not dependent on us to understand your own system.",
  },
]

/* ------------------------------------------------------------------ */
/*  Step block                                                          */
/* ------------------------------------------------------------------ */

function StepBlock({
  step,
  index,
  show,
  reduce,
}: {
  step: (typeof steps)[number]
  index: number
  show: boolean
  reduce: boolean | null
}) {
  return (
    <motion.div
      className="relative overflow-hidden"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: index * 0.3, duration: 0.45, ease: "easeOut" }}
    >
      {/* Watermark number */}
      <span
        className="absolute top-0 right-0 select-none pointer-events-none text-white"
        style={{
          fontFamily: "var(--ax-font-display)",
          fontWeight: 800,
          fontSize: "clamp(96px, 10vw, 160px)",
          lineHeight: 1,
          opacity: 0.04,
        }}
        aria-hidden="true"
      >
        {step.n}
      </span>

      <div className="relative z-[1]">
        <div
          className="text-[11px] uppercase font-bold mb-2"
          style={{
            fontFamily: "var(--ax-font-mono)",
            letterSpacing: "0.1em",
            color: "var(--ax-primary)",
          }}
        >
          Step {step.n}
        </div>
        <h3
          className="text-[22px] font-semibold text-white mb-3"
          style={{ fontFamily: "var(--ax-font-display)" }}
        >
          {step.t}
        </h3>
        <p
          className="text-[14px] leading-[1.7] m-0"
          style={{ color: "var(--ax-fg-on-dark-2)" }}
        >
          {step.d}
        </p>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function ZigzagSteps() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <div ref={ref}>
      {/* Desktop: zigzag layout */}
      <div className="hidden md:block relative">
        {/* SVG zigzag line */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="33%"
            y1="12%"
            x2="66%"
            y2="37%"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={show ? 0 : 1}
            style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
          />
          <line
            x1="66%"
            y1="37%"
            x2="33%"
            y2="62%"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={show ? 0 : 1}
            style={{ transition: "stroke-dashoffset 1.5s ease-out 0.3s" }}
          />
          <line
            x1="33%"
            y1="62%"
            x2="66%"
            y2="87%"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={show ? 0 : 1}
            style={{ transition: "stroke-dashoffset 1.5s ease-out 0.6s" }}
          />
        </svg>

        {/* Steps in grid rows */}
        <div className="flex flex-col gap-16 relative z-[1]">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0
            return (
              <div key={step.n} className="grid grid-cols-3 gap-8">
                {isLeft ? (
                  <>
                    <div className="py-4">
                      <StepBlock step={step} index={i} show={show} reduce={reduce} />
                    </div>
                    <div />
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div />
                    <div className="py-4">
                      <StepBlock step={step} index={i} show={show} reduce={reduce} />
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile: left-aligned stack */}
      <div className="md:hidden relative pl-8">
        {/* Vertical line */}
        <div
          className="absolute left-3 top-0 bottom-0 w-px"
          style={{ background: "rgba(255,255,255,0.1)" }}
          aria-hidden="true"
        />

        <div className="flex flex-col gap-10">
          {steps.map((step, i) => (
            <div key={step.n} className="relative">
              {/* Dot */}
              <div
                className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full"
                style={{ background: "var(--ax-primary)" }}
                aria-hidden="true"
              />
              <StepBlock step={step} index={i} show={show} reduce={reduce} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
