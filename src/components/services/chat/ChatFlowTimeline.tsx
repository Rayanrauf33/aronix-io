"use client"

import { useEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Globe,
  MessageCircle,
  HelpCircle,
  CalendarCheck,
  CheckCircle,
  UserCheck,
  MessageSquareText,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Timeline data                                                       */
/* ------------------------------------------------------------------ */

type TimelineNode = {
  icon: LucideIcon
  label: string
  desc: string
  side: "left" | "right"
  variant: "default" | "escalation"
}

const nodes: TimelineNode[] = [
  {
    icon: Globe,
    label: "Visitor lands",
    desc: "Someone arrives on your website from Google, an ad, or a referral link.",
    side: "left",
    variant: "default",
  },
  {
    icon: MessageCircle,
    label: "Agent greets",
    desc: "The chat widget opens and starts a conversation within seconds.",
    side: "right",
    variant: "default",
  },
  {
    icon: HelpCircle,
    label: "Qualifies",
    desc: "Asks the right questions, answers objections, and identifies buying intent.",
    side: "left",
    variant: "default",
  },
  {
    icon: CalendarCheck,
    label: "Books",
    desc: "Opens your live calendar and lets the visitor pick a slot on the spot.",
    side: "right",
    variant: "default",
  },
  {
    icon: CheckCircle,
    label: "Confirmed",
    desc: "Appointment lands in your calendar. You get notified immediately.",
    side: "left",
    variant: "default",
  },
  {
    icon: UserCheck,
    label: "Needs a human",
    desc: "Complex or sensitive enquiry flagged to you with the full conversation thread.",
    side: "left",
    variant: "escalation",
  },
  {
    icon: MessageSquareText,
    label: "Flagged with thread",
    desc: "You see the entire conversation and pick up exactly where the agent left off.",
    side: "right",
    variant: "escalation",
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/*  No scroll listener. Uses IntersectionObserver + one-shot rAF loop. */
/* ------------------------------------------------------------------ */

export function ChatFlowTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const start = performance.now()
        const duration = 2000

        function tick(now: number) {
          const raw = Math.min(1, (now - start) / duration)
          setProgress(raw)
          if (raw < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.1 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const lineLength = 100
  const dashOffset = lineLength - lineLength * progress
  const branchIndex = 5

  return (
    <div ref={sectionRef} className="relative max-w-[800px] mx-auto">
      {/* Centre line (desktop) / left line (mobile) */}
      <div className="absolute top-0 bottom-0 left-5 md:left-1/2 md:-translate-x-px w-px">
        {/* Background track */}
        <div className="absolute inset-0 bg-white/10" />
        {/* Animated fill */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1 100"
          aria-hidden="true"
        >
          <line
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="100"
            stroke="var(--ax-primary)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            strokeDasharray={lineLength}
            strokeDashoffset={dashOffset}
          />
        </svg>
      </div>

      {/* Nodes */}
      <div className="flex flex-col">
        {nodes.map((node, i) => {
          const Icon = node.icon
          const isEscalation = node.variant === "escalation"
          const nodeProgress = progress * nodes.length
          const visible = nodeProgress > i

          return (
            <div key={node.label}>
              {/* Branch separator */}
              {i === branchIndex && (
                <div className="relative py-6 pl-14 md:pl-0">
                  <div className="flex items-center gap-4 md:justify-center">
                    <div className="h-px flex-1 bg-white/10" />
                    <span
                      className="text-[10px] uppercase text-[var(--ax-fg-on-dark-2)] shrink-0"
                      style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.08em" }}
                    >
                      Escalation branch
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                </div>
              )}

              {/* Node row */}
              <div
                className={`
                  relative flex items-start gap-6 py-6
                  pl-14 md:pl-0
                  ${node.side === "right" ? "md:flex-row-reverse md:text-right" : ""}
                `}
              >
                {/* Dot on the line */}
                <div
                  className={`
                    absolute left-5 md:left-1/2 top-8
                    w-3 h-3 rounded-full border-2 -translate-x-1/2
                    transition-all duration-500
                    ${visible ? "scale-100 opacity-100" : "scale-0 opacity-0"}
                  `}
                  style={{
                    background: isEscalation ? "var(--ax-warning)" : "var(--ax-primary)",
                    borderColor: isEscalation ? "var(--ax-warning)" : "var(--ax-primary)",
                    boxShadow: isEscalation
                      ? "0 0 16px rgba(251,191,36,0.25)"
                      : "0 0 12px rgba(234,75,113,0.3)",
                  }}
                  aria-hidden="true"
                />

                {/* Spacer for centre alignment on desktop */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div
                  className={`
                    md:w-1/2 rounded-[var(--ax-radius-md)] border border-white/10 p-5
                    transition-all duration-500
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                    ${node.side === "right" ? "md:pr-10" : "md:pl-10"}
                  `}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    boxShadow: isEscalation
                      ? "0 0 16px rgba(251,191,36,0.25)"
                      : undefined,
                  }}
                >
                  <div className={`flex items-center gap-3 mb-2 ${node.side === "right" ? "md:flex-row-reverse" : ""}`}>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: isEscalation
                          ? "rgba(251,191,36,0.15)"
                          : "rgba(234,75,113,0.12)",
                      }}
                    >
                      <Icon
                        size={16}
                        className={isEscalation ? "text-[var(--ax-warning)]" : "text-[var(--ax-primary)]"}
                        aria-hidden="true"
                      />
                    </div>
                    <h3
                      className="text-[15px] font-semibold text-white m-0"
                      style={{ fontFamily: "var(--ax-font-display)" }}
                    >
                      {node.label}
                    </h3>
                  </div>
                  <p className="text-[13px] leading-[1.6] text-[var(--ax-fg-on-dark-2)] m-0">
                    {node.desc}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
