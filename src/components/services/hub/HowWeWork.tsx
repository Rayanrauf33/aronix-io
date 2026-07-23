"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const steps = [
  {
    n: "01",
    title: "Audit",
    body: "We map your current setup. Calls, leads, processes, tools, and search visibility. We find the leaks.",
  },
  {
    n: "02",
    title: "Build",
    body: "We build the system that fixes the priority problems. Fixed scope, fixed price, agreed before we start.",
  },
  {
    n: "03",
    title: "Care",
    body: "We monitor, tune, and improve the system monthly. Most clients see ongoing improvement in performance for the first six months after launch.",
  },
]

export function HowWeWork() {
  const stepsRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stepsRef, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <section
      className="px-5 sm:px-12 py-20"
      style={{ background: "var(--ax-slate-100)" }}
      aria-labelledby="how-we-work-heading"
    >
      <div className="max-w-[var(--ax-container)] mx-auto">

        {/* Heading block */}
        <div className="mb-16 max-w-[560px]">
          <span
            className="block text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--ax-fg-3)] mb-3"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            How every engagement starts
          </span>
          <h2
            id="how-we-work-heading"
            className="text-[var(--ax-fg-1)]"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 800,
              fontSize: "var(--ax-fs-h2)",
              lineHeight: "var(--ax-lh-snug)",
              letterSpacing: "var(--ax-tracking-tight)",
            }}
          >
            The Audit comes first. Every time.
          </h2>
          <p
            className="mt-4 m-0"
            style={{
              fontSize: "var(--ax-fs-body-lg)",
              lineHeight: "1.65",
              color: "var(--ax-fg-2)",
            }}
          >
            We don&apos;t take on work we can&apos;t deliver results on. Every engagement starts with a paid automation audit: a structured review of your current setup, your lead flow, and your operations. The audit is a flat fee, confirmed when you book the call.
          </p>
          <p
            className="mt-3 m-0"
            style={{
              fontSize: "var(--ax-fs-body-lg)",
              lineHeight: "1.65",
              color: "var(--ax-fg-2)",
            }}
          >
            At the end of it you get a clear document: what&apos;s working, what&apos;s broken, and what we&apos;d build to fix it, with realistic timelines and pricing. If what we find doesn&apos;t justify the build cost, we&apos;ll tell you that instead.
          </p>
          <p
            className="mt-3 m-0"
            style={{
              fontSize: "var(--ax-fs-body)",
              lineHeight: "1.65",
              color: "var(--ax-fg-3)",
            }}
          >
            The audit cost is credited toward your build if you proceed.
          </p>
        </div>

        {/* Desktop step grid */}
        <div ref={stepsRef} className="hidden lg:block relative">
          {/* Horizontal connecting line through circle centres */}
          <div
            className="absolute h-px"
            style={{
              top: "27px",
              left: "28px",
              right: "28px",
              background: "var(--ax-border)",
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={show ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.55, ease: EASE_OUT, delay: i * 0.1 }}
                className="relative pt-1"
              >
                {/* Watermark number */}
                <div
                  className="absolute -bottom-4 right-0 leading-none select-none pointer-events-none"
                  style={{
                    fontFamily: "var(--ax-font-display)",
                    fontWeight: 900,
                    fontSize: "120px",
                    color: "var(--ax-fg-1)",
                    opacity: 0.04,
                    letterSpacing: "-0.05em",
                  }}
                  aria-hidden="true"
                >
                  {step.n}
                </div>

                {/* Circle */}
                <div
                  className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-[13px] font-bold mb-6 shrink-0"
                  style={{
                    background: "var(--ax-surface)",
                    border: "1px solid var(--ax-border)",
                    fontFamily: "var(--ax-font-mono)",
                    color: "var(--ax-primary)",
                  }}
                >
                  {step.n}
                </div>

                <h3
                  className="text-[20px] font-bold text-[var(--ax-fg-1)] mb-3"
                  style={{
                    fontFamily: "var(--ax-font-display)",
                    lineHeight: "var(--ax-lh-snug)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="m-0 text-[var(--ax-fg-2)]"
                  style={{ fontSize: "var(--ax-fs-body)", lineHeight: "1.65" }}
                >
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden flex flex-col">
          {steps.map((step, i) => (
            <div key={step.n} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold"
                  style={{
                    background: "var(--ax-surface)",
                    border: "1px solid var(--ax-border)",
                    fontFamily: "var(--ax-font-mono)",
                    color: "var(--ax-primary)",
                  }}
                >
                  {step.n}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="w-px flex-1 mt-2"
                    style={{ background: "var(--ax-border)", minHeight: "32px" }}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="pb-10">
                <h3
                  className="text-[18px] font-bold text-[var(--ax-fg-1)] mb-2"
                  style={{
                    fontFamily: "var(--ax-font-display)",
                    lineHeight: "var(--ax-lh-snug)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[14px] leading-[1.6] text-[var(--ax-fg-2)] m-0"
                >
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
