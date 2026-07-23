"use client"

import { useEffect, useRef, useState } from "react"

/* ------------------------------------------------------------------ */
/*  Deliverables                                                        */
/* ------------------------------------------------------------------ */

const lines = [
  "AI chat agent installed on your website",
  "Full knowledge base built from your services, pricing, and FAQs",
  "Direct calendar booking for visitors who are ready",
  "Contact capture and handoff to your follow-up system for visitors who aren\u2019t",
  "Full chat transcripts so you can see every conversation",
  "Escalation path for conversations that need a human",
  "Monthly knowledge base updates based on new questions",
]

const LINE_GAP = 120 // ms between each line

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function TerminalWindow() {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const [inViewport, setInViewport] = useState(false)
  const animatedRef = useRef(false)

  /* One-shot: triggers the typing sequence on first entry */
  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleCount(lines.length)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animatedRef.current) return
        animatedRef.current = true
        observer.disconnect()

        let count = 0
        const interval = setInterval(() => {
          count++
          setVisibleCount(count)
          if (count >= lines.length) clearInterval(interval)
        }, LINE_GAP)
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* Persistent IO: pauses cursor blink when scrolled off-screen */
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="rounded-[var(--ax-radius-xl)] overflow-hidden border border-white/10 max-w-[720px] mx-auto"
      style={{
        background: "var(--ax-surface-dark-alt)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.25)",
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
        <span
          className="ml-3 text-[11px] text-[var(--ax-fg-on-dark-2)]"
          style={{ fontFamily: "var(--ax-font-mono)" }}
        >
          agent.config
        </span>
      </div>

      {/* Terminal body */}
      <div className="relative p-5 sm:p-6 min-h-[280px]">
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)",
          }}
          aria-hidden="true"
        />

        {/* Lines */}
        <div className="relative flex flex-col gap-2">
          {lines.map((line, i) => (
            <div
              key={i}
              className="flex items-start gap-2 transition-opacity duration-200"
              style={{ opacity: i < visibleCount ? 1 : 0 }}
            >
              <span
                className="shrink-0 select-none"
                style={{
                  fontFamily: "var(--ax-font-mono)",
                  fontSize: "14px",
                  color: "var(--ax-primary)",
                  lineHeight: "1.7",
                }}
                aria-hidden="true"
              >
                &gt;
              </span>
              <span
                className="text-[var(--ax-fg-on-dark-2)]"
                style={{
                  fontFamily: "var(--ax-font-mono)",
                  fontSize: "14px",
                  lineHeight: "1.7",
                }}
              >
                {line}
              </span>
            </div>
          ))}

          {/* Blinking cursor */}
          {visibleCount >= lines.length && (
            <div className="flex items-center gap-2">
              <span
                className="shrink-0"
                style={{
                  fontFamily: "var(--ax-font-mono)",
                  fontSize: "14px",
                  color: "var(--ax-primary)",
                }}
                aria-hidden="true"
              >
                &gt;
              </span>
              <span
                className={inViewport ? "terminal-cursor w-2 h-4 inline-block" : "w-2 h-4 inline-block"}
                style={{ background: "var(--ax-primary)" }}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
