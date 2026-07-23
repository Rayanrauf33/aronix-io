"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  Zap,
  Database,
  ArrowRightLeft,
  Bell,
  HelpCircle,
  UserCheck,
  ArrowRight,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Step data                                                           */
/* ------------------------------------------------------------------ */

type PipelineStep = {
  icon: LucideIcon
  label: string
  side: "left" | "right" | "centre"
  variant: "default" | "gate"
  sub?: string
}

const steps: PipelineStep[] = [
  { icon: Zap, label: "Trigger event", side: "left", variant: "default" },
  { icon: Database, label: "Data captured and validated", side: "right", variant: "default" },
  { icon: ArrowRightLeft, label: "Routed to correct system", side: "left", variant: "default" },
  { icon: Bell, label: "Notifications sent", side: "right", variant: "default" },
  { icon: HelpCircle, label: "Approval required?", side: "centre", variant: "gate", sub: "Yes / No" },
  { icon: UserCheck, label: "Human reviews and approves", side: "left", variant: "default" },
  { icon: ArrowRight, label: "Next automated step continues", side: "right", variant: "default" },
]

/* ------------------------------------------------------------------ */
/*  Step card                                                           */
/* ------------------------------------------------------------------ */

function StepCard({
  step,
  index,
  show,
  reduce,
}: {
  step: PipelineStep
  index: number
  show: boolean
  reduce: boolean | null
}) {
  const Icon = step.icon
  const isGate = step.variant === "gate"

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: 0.3 + index * 0.12, duration: 0.4, ease: "easeOut" }}
      className={`rounded-[var(--ax-radius-lg)] border p-4 sm:p-5 ${isGate ? "text-center" : ""}`}
      style={{
        background: isGate
          ? "color-mix(in srgb, var(--ax-warning) 6%, transparent)"
          : "rgba(255,255,255,0.03)",
        borderColor: isGate ? "var(--ax-warning)" : "rgba(255,255,255,0.1)",
        ...(isGate
          ? { boxShadow: "0 0 12px rgba(251,191,36,0.2)" }
          : {}),
      }}
    >
      <div className={`flex items-center gap-3 ${isGate ? "justify-center" : ""}`}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: isGate
              ? "color-mix(in srgb, var(--ax-warning) 15%, transparent)"
              : "color-mix(in srgb, var(--ax-primary) 12%, transparent)",
          }}
        >
          <Icon
            size={18}
            aria-hidden="true"
            style={{
              color: isGate ? "var(--ax-warning)" : "var(--ax-primary)",
            }}
          />
        </div>
        <span
          className="text-[15px] font-semibold text-white"
          style={{ fontFamily: "var(--ax-font-display)" }}
        >
          {step.label}
        </span>
      </div>
      {step.sub && (
        <p
          className="text-[13px] mt-2 m-0"
          style={{
            color: "var(--ax-fg-on-dark-2)",
            fontFamily: "var(--ax-font-mono)",
          }}
        >
          {step.sub}
        </p>
      )}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Desktop pipeline                                                    */
/* ------------------------------------------------------------------ */

function DesktopPipeline({ show, reduce }: { show: boolean; reduce: boolean | null }) {
  return (
    <div className="hidden md:block max-w-[800px] mx-auto relative">
      {/* Central vertical line (SVG) */}
      <svg
        className="absolute left-1/2 top-0 h-full -translate-x-1/2"
        width="4"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <line
          x1="2" y1="0" x2="2" y2="100%"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="3"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={show ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
        />
      </svg>

      {/* Steps */}
      <div className="relative flex flex-col gap-8" style={{ zIndex: 1 }}>
        {steps.map((step, i) => {
          if (step.side === "centre") {
            return (
              <div key={step.label} className="flex justify-center">
                <div className="w-full max-w-[320px]">
                  <StepCard step={step} index={i} show={show} reduce={reduce} />
                </div>
              </div>
            )
          }

          const isLeft = step.side === "left"

          return (
            <div
              key={step.label}
              className="grid gap-4"
              style={{ gridTemplateColumns: "1fr 4px 1fr" }}
            >
              {isLeft ? (
                <>
                  <div className="flex justify-end">
                    <div className="w-full max-w-[300px]">
                      <StepCard step={step} index={i} show={show} reduce={reduce} />
                    </div>
                  </div>
                  {/* Pipeline spacer */}
                  <div />
                  <div />
                </>
              ) : (
                <>
                  <div />
                  <div />
                  <div className="flex justify-start">
                    <div className="w-full max-w-[300px]">
                      <StepCard step={step} index={i} show={show} reduce={reduce} />
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile pipeline                                                     */
/* ------------------------------------------------------------------ */

function MobilePipeline({ show, reduce }: { show: boolean; reduce: boolean | null }) {
  return (
    <div className="md:hidden relative pl-8">
      {/* Vertical line */}
      <div
        className="absolute left-3 top-0 bottom-0 w-px"
        style={{ background: "rgba(255,255,255,0.1)" }}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-6">
        {steps.map((step, i) => (
          <div key={step.label} className="relative">
            {/* Dot on line */}
            <div
              className="absolute -left-5 top-5 w-2.5 h-2.5 rounded-full"
              style={{
                background: step.variant === "gate"
                  ? "var(--ax-warning)"
                  : "var(--ax-primary)",
              }}
              aria-hidden="true"
            />
            <StepCard step={step} index={i} show={show} reduce={reduce} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export function PipelineSteps() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <div ref={ref}>
      <DesktopPipeline show={show} reduce={reduce} />
      <MobilePipeline show={show} reduce={reduce} />
    </div>
  )
}
