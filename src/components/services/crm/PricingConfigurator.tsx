"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const CALENDLY =
  "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"

type Question = {
  label: string
  options: string[]
}

const questions: Question[] = [
  { label: "How many tools?", options: ["2 tools", "3\u20134 tools", "5+ tools"] },
  { label: "Is your CRM data clean?", options: ["Mostly yes", "Needs cleanup"] },
  { label: "Custom logic needed?", options: ["Standard flows", "Complex conditions"] },
]

function getEstimate(answers: number[]): string {
  const tools = answers[0]
  const dataClean = answers[1]
  const complexity = answers[2]

  if (tools === 2 || (dataClean === 1 && complexity === 1)) {
    return "From $1,250"
  }
  if (tools === 0 && dataClean === 0 && complexity === 0) {
    return "From $250"
  }
  if (tools === 0) {
    return "From $500"
  }
  if (tools === 1 && dataClean === 0 && complexity === 0) {
    return "From $750"
  }
  return "From $1,000"
}

/* ------------------------------------------------------------------ */
/*  Pill toggle                                                         */
/* ------------------------------------------------------------------ */

function PillToggle({
  options,
  selected,
  onChange,
}: {
  options: string[]
  selected: number
  onChange: (i: number) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt, i) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(i)}
          className={cn(
            "px-4 py-2 rounded-[var(--ax-radius-pill)] text-[13px] font-medium border",
            "transition-[border-color,background-color,color] duration-150",
            "focus-visible:outline-2 focus-visible:outline-[var(--ax-primary)] focus-visible:outline-offset-2",
          )}
          style={{
            fontFamily: "var(--ax-font-mono)",
            borderColor: selected === i
              ? "var(--ax-primary)"
              : "rgba(255,255,255,0.15)",
            background: selected === i
              ? "color-mix(in srgb, var(--ax-primary) 12%, transparent)"
              : "transparent",
            color: selected === i
              ? "var(--ax-fg-on-dark)"
              : "var(--ax-fg-on-dark-2)",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function PricingConfigurator() {
  const [answers, setAnswers] = useState([0, 0, 0])

  function setAnswer(q: number, val: number) {
    setAnswers((prev) => prev.map((v, i) => (i === q ? val : v)))
  }

  const estimate = getEstimate(answers)

  return (
    <div
      className="rounded-[var(--ax-radius-xl)] border border-white/10 p-6 sm:p-8 max-w-[520px] mx-auto"
      style={{ background: "var(--ax-surface-dark-alt)" }}
    >
      <div className="flex flex-col gap-6">
        {questions.map((q, qi) => (
          <div key={q.label}>
            <p
              className="text-[14px] font-semibold text-white mb-3 m-0"
              style={{ fontFamily: "var(--ax-font-display)" }}
            >
              {q.label}
            </p>
            <PillToggle
              options={q.options}
              selected={answers[qi]}
              onChange={(val) => setAnswer(qi, val)}
            />
          </div>
        ))}
      </div>

      {/* Result */}
      <div
        className="mt-8 pt-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p
          className="text-white m-0 mb-2"
          style={{
            fontFamily: "var(--ax-font-display)",
            fontWeight: 700,
            fontSize: "var(--ax-fs-h3)",
            transition: "opacity 0.2s ease-out",
          }}
        >
          {estimate}
        </p>
        <p
          className="text-[14px] leading-[1.6] m-0 mb-6"
          style={{ color: "var(--ax-fg-on-dark-2)" }}
        >
          Fixed price confirmed after the systems audit. No hourly billing.
        </p>
        <Button href={CALENDLY} variant="primary" size="lg" className="w-full">
          Book an Audit
        </Button>
      </div>
    </div>
  )
}
