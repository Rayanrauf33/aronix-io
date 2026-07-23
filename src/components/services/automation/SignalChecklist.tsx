"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/Button"

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const CALENDLY =
  "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"

const signals = [
  "Someone on my team copies data between tools by hand.",
  "The same mistake keeps happening at the same step.",
  "The process breaks down when one person is away.",
  "We can't scale this without hiring another person.",
  "I couldn't tell you right now if the process ran correctly today.",
]

function getResult(count: number): { text: string; tone: "muted" | "normal" | "strong" } | null {
  if (count === 0) return null
  if (count <= 2)
    return {
      text: "Your process has some automation candidates. An audit would find them.",
      tone: "muted",
    }
  if (count <= 4)
    return {
      text: "You have clear automation opportunities. This is worth a conversation.",
      tone: "normal",
    }
  return {
    text: "This process is costing you significantly. Book an audit today.",
    tone: "strong",
  }
}

/* ------------------------------------------------------------------ */
/*  CSS keyframes for CTA pulse (replaces Framer Motion infinite)      */
/* ------------------------------------------------------------------ */

const ctaPulseStyle = `
@keyframes ax-cta-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}
`

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function SignalChecklist() {
  const [checked, setChecked] = useState<boolean[]>(() => signals.map(() => false))
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce
  const [visible, setVisible] = useState(false)

  /* IntersectionObserver to pause CTA pulse when off-screen */
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const count = checked.filter(Boolean).length
  const result = getResult(count)

  function toggle(i: number) {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
  }

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-[var(--ax-radius-xl)] border border-white/10 p-6 sm:p-8"
      style={{ background: "var(--ax-surface-dark-alt)" }}
    >
      {/* Inject CSS keyframes */}
      <style dangerouslySetInnerHTML={{ __html: ctaPulseStyle }} />

      <h3
        className="text-[18px] text-white mb-6"
        style={{
          fontFamily: "var(--ax-font-display)",
          fontWeight: 600,
        }}
      >
        Signs your process is ready to automate
      </h3>

      {/* Checkboxes */}
      <div className="flex flex-col">
        {signals.map((signal, i) => {
          const isChecked = checked[i]
          const isLast = i === signals.length - 1

          return (
            <label
              key={i}
              className={`flex items-start gap-3 py-3 cursor-pointer ${isLast ? "" : "border-b border-white/5"}`}
            >
              {/* Custom checkbox */}
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => toggle(i)}
                className="w-5 h-5 shrink-0 rounded-[var(--ax-radius-xs)] border-2 flex items-center justify-center mt-0.5 transition-[border-color,background-color] duration-150 focus-visible:outline-2 focus-visible:outline-[var(--ax-primary)] focus-visible:outline-offset-2"
                style={{
                  borderColor: isChecked ? "var(--ax-primary)" : "rgba(255,255,255,0.2)",
                  background: isChecked ? "var(--ax-primary)" : "transparent",
                }}
              >
                {isChecked && (
                  <Check size={14} className="text-white" strokeWidth={3} aria-hidden="true" />
                )}
              </button>

              <span
                className="text-[15px] leading-[1.5] select-none"
                style={{ color: "var(--ax-fg-on-dark-2)" }}
                onClick={() => toggle(i)}
              >
                {signal}
              </span>
            </label>
          )
        })}
      </div>

      {/* Result */}
      <div className="mt-6 min-h-[48px]">
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.tone}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <p
                className="text-[14px] leading-[1.6] m-0 mb-4"
                style={{
                  color:
                    result.tone === "strong"
                      ? "var(--ax-primary)"
                      : result.tone === "normal"
                        ? "var(--ax-fg-on-dark)"
                        : "var(--ax-fg-on-dark-2)",
                  fontWeight: result.tone === "strong" ? 600 : 400,
                }}
              >
                {result.text}
              </p>

              {count === 5 && (
                <div
                  style={{
                    animation: visible && !reduce
                      ? "ax-cta-pulse 1.5s ease-in-out infinite"
                      : "none",
                  }}
                >
                  <Button href={CALENDLY} variant="primary" size="lg">
                    Book an Audit
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
