"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"

const waveHeights = [10, 18, 12, 24, 8, 20, 14, 28, 10, 22, 6, 16, 24, 12, 20, 8, 18, 26, 10, 14]

export function VoiceHeroCard() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

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

  const animate = visible && !reduce

  return (
    <div
      ref={ref}
      className="rounded-[var(--ax-radius-xl)] overflow-hidden"
      style={{ background: "var(--ax-surface-dark)" }}
      role="img"
      aria-label="Live call simulation showing the AI agent answering a call, qualifying the enquiry, and confirming a booking"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          {/* Pulse dot gated by visibility */}
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: "#22C55E",
              boxShadow: animate ? undefined : "0 0 0 0 rgba(34,197,94,0)",
              animation: animate
                ? "pulse-ring 2s cubic-bezier(0.455,0.03,0.515,0.955) infinite"
                : "none",
            }}
            aria-hidden="true"
          />
          <span
            className="text-[12px] uppercase tracking-[0.08em] text-[var(--ax-success)]"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            Active
          </span>
        </div>
        <span
          className="text-[13px] font-semibold text-[var(--ax-fg-on-dark)]"
          style={{ fontFamily: "var(--ax-font-display)" }}
        >
          AI Voice Agent
        </span>
      </div>

      {/* Waveform */}
      <div className="flex items-center justify-center gap-[3px] py-8 px-6" aria-hidden="true">
        {waveHeights.map((h, i) => (
          <div
            key={i}
            className="voice-waveform-bar"
            style={{
              height: `${h}px`,
              animationDelay: `${i * 0.08}s`,
              animationPlayState: animate ? "running" : "paused",
            }}
          />
        ))}
      </div>

      {/* Caller quote */}
      <div className="px-6 pb-5">
        <p
          className="text-[14px] text-[var(--ax-fg-on-dark-2)] italic m-0"
          style={{ fontFamily: "var(--ax-font-body)" }}
        >
          &ldquo;How much for a full house clean?&rdquo;
        </p>
      </div>

      {/* Booking confirmation */}
      <div
        className="flex items-center gap-3 px-6 py-4 border-t border-white/10"
        style={{ background: "var(--ax-surface-dark-alt)" }}
      >
        <Check
          size={18}
          strokeWidth={2}
          className="shrink-0 text-[var(--ax-success)]"
          aria-hidden="true"
        />
        <div>
          <div className="text-[13px] font-semibold text-[var(--ax-fg-on-dark)]">
            Booking confirmed
          </div>
          <div
            className="text-[11px] text-[var(--ax-fg-on-dark-2)]"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            Thursday, 2:00 pm
          </div>
        </div>
      </div>
    </div>
  )
}
