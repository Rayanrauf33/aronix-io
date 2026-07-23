"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Search, GitBranch, Wrench, Rocket } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

type Step = {
  n: string
  icon: LucideIcon
  title: string
  desc: string
  /** Position as % along the line */
  pos: number
  /** true = content above the line, false = below */
  above: boolean
}

const steps: Step[] = [
  {
    n: "01",
    icon: Search,
    title: "Systems audit",
    pos: 20,
    above: true,
    desc: "We map every tool you use, what data lives in it, and where the manual handoffs are today. This usually surfaces problems you didn\u2019t know were costing you.",
  },
  {
    n: "02",
    icon: GitBranch,
    title: "Integration design",
    pos: 40,
    above: false,
    desc: "We design the data flows. What triggers what, what maps to what, and where a human decision needs to stay in the loop. You review and approve the design before we build.",
  },
  {
    n: "03",
    icon: Wrench,
    title: "Build and clean",
    pos: 60,
    above: true,
    desc: "We build the integrations and clean your existing CRM data as part of the same process. Duplicates removed, missing fields filled where possible, pipelines structured correctly.",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Test and hand over",
    pos: 80,
    above: false,
    desc: "We test every data flow with real scenarios before going live. We then document the integrations clearly so you understand what\u2019s running in your own system.",
  },
]

/* ------------------------------------------------------------------ */
/*  Desktop: horizontal timeline                                        */
/* ------------------------------------------------------------------ */

function DesktopTimeline({ show, reduce }: { show: boolean; reduce: boolean | null }) {
  return (
    <div className="hidden md:block relative" style={{ minHeight: 420 }}>
      {/* Horizontal line */}
      <svg
        className="absolute left-0"
        width="100%"
        height="2"
        style={{ top: "50%", transform: "translateY(-50%)" }}
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="1"
          x2="100%"
          y2="1"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={show ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
        />
      </svg>

      {/* Steps */}
      {steps.map((step, i) => {
        const Icon = step.icon
        const delay = 0.4 + i * 0.3

        return (
          <motion.div
            key={step.n}
            className="absolute"
            style={{
              left: `${step.pos}%`,
              transform: "translateX(-50%)",
              ...(step.above
                ? { bottom: "50%", paddingBottom: 28 }
                : { top: "50%", paddingTop: 28 }),
            }}
            initial={reduce ? false : { opacity: 0, y: step.above ? 12 : -12 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay, duration: 0.4, ease: "easeOut" }}
          >
            {/* Vertical connector line */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-px"
              style={{
                background: "rgba(255,255,255,0.15)",
                height: 20,
                ...(step.above ? { bottom: 0 } : { top: 0 }),
              }}
              aria-hidden="true"
            />

            {/* Marker dot on the line */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2"
              style={{
                borderColor: "var(--ax-primary)",
                background: "var(--ax-surface-dark)",
                ...(step.above
                  ? { bottom: -6 }
                  : { top: -6 }),
              }}
              aria-hidden="true"
            />

            {/* Content card */}
            <div className="w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "color-mix(in srgb, var(--ax-primary) 12%, transparent)",
                  }}
                >
                  <Icon
                    size={16}
                    style={{ color: "var(--ax-primary)" }}
                    aria-hidden="true"
                  />
                </div>
                <span
                  className="text-[11px] font-bold"
                  style={{
                    fontFamily: "var(--ax-font-mono)",
                    letterSpacing: "0.08em",
                    color: "var(--ax-fg-on-dark-2)",
                  }}
                >
                  Step {step.n}
                </span>
              </div>
              <h4
                className="text-[16px] font-semibold text-white mb-1.5"
                style={{ fontFamily: "var(--ax-font-display)" }}
              >
                {step.title}
              </h4>
              <p
                className="text-[13px] leading-[1.6] m-0"
                style={{ color: "var(--ax-fg-on-dark-2)" }}
              >
                {step.desc}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile: vertical timeline                                           */
/* ------------------------------------------------------------------ */

function MobileTimeline({ show, reduce }: { show: boolean; reduce: boolean | null }) {
  return (
    <div className="md:hidden relative pl-8">
      {/* Vertical line */}
      <div
        className="absolute left-3 top-0 bottom-0 w-px"
        style={{ background: "rgba(255,255,255,0.1)" }}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-8">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.n}
              className="relative"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: i * 0.15, duration: 0.4, ease: "easeOut" }}
            >
              {/* Dot on line */}
              <div
                className="absolute -left-5 top-1 w-3 h-3 rounded-full border-2"
                style={{
                  borderColor: "var(--ax-primary)",
                  background: "var(--ax-surface-dark)",
                }}
                aria-hidden="true"
              />

              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "color-mix(in srgb, var(--ax-primary) 12%, transparent)",
                  }}
                >
                  <Icon
                    size={16}
                    style={{ color: "var(--ax-primary)" }}
                    aria-hidden="true"
                  />
                </div>
                <span
                  className="text-[11px] font-bold"
                  style={{
                    fontFamily: "var(--ax-font-mono)",
                    letterSpacing: "0.08em",
                    color: "var(--ax-fg-on-dark-2)",
                  }}
                >
                  Step {step.n}
                </span>
              </div>
              <h4
                className="text-[16px] font-semibold text-white mb-1.5"
                style={{ fontFamily: "var(--ax-font-display)" }}
              >
                {step.title}
              </h4>
              <p
                className="text-[13px] leading-[1.6] m-0"
                style={{ color: "var(--ax-fg-on-dark-2)" }}
              >
                {step.desc}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export function TimelineSteps() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <div ref={ref}>
      <DesktopTimeline show={show} reduce={reduce} />
      <MobileTimeline show={show} reduce={reduce} />
    </div>
  )
}
