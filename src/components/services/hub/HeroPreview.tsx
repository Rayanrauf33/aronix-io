"use client"

import { useRef } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { Phone, MessageCircle, Zap, Network } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const rows: { icon: LucideIcon; label: string }[] = [
  { icon: Phone,         label: "Voice" },
  { icon: MessageCircle, label: "Chat" },
  { icon: Zap,           label: "Lead Response" },
  { icon: Network,       label: "Automation" },
]

export function HeroPreview() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const reduce = useReducedMotion()
  const active = inView && !reduce

  return (
    <>
      <style>{`
        @keyframes sh-dot-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.55); }
          65%  { box-shadow: 0 0 0 9px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        .sh-dot-active {
          animation: sh-dot-pulse 0.85s ease-out 1 both;
        }
      `}</style>

      <div
        ref={ref}
        className="rounded-[var(--ax-radius-xl)] p-7 w-[360px]"
        style={{
          background: "var(--ax-surface-dark-alt)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        aria-hidden="true"
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 mb-5 pb-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
          <span
            className="ml-2 text-[11px] text-[var(--ax-fg-on-dark-2)]"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            active systems
          </span>
        </div>

        {/* Service rows */}
        {rows.map((row, i) => {
          const Icon = row.icon
          return (
            <div
              key={row.label}
              className="flex items-center gap-4 py-4"
              style={{
                borderBottom:
                  i < rows.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : undefined,
              }}
            >
              <div
                className="w-9 h-9 rounded-[var(--ax-radius-md)] flex items-center justify-center shrink-0"
                style={{ background: "rgba(234,75,113,0.12)" }}
              >
                <Icon size={16} className="text-[var(--ax-primary)]" />
              </div>

              <span
                className="flex-1 text-[14px] font-medium text-[var(--ax-fg-on-dark)]"
                style={{ fontFamily: "var(--ax-font-display)" }}
              >
                {row.label}
              </span>

              {/* Status dot, pulses once when in view */}
              <div
                className={`w-2.5 h-2.5 rounded-full ${active ? "sh-dot-active" : ""}`}
                style={{
                  background: "#22C55E",
                  opacity: active ? 1 : 0.3,
                  ...(active ? { animationDelay: `${0.3 + i * 0.15}s` } : {}),
                }}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
