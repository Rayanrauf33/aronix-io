"use client"

import { useEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Phone,
  Bot,
  HelpCircle,
  CalendarCheck,
  MessageSquareText,
  UserCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Node definitions                                                    */
/* ------------------------------------------------------------------ */

type FlowNode = {
  icon: LucideIcon
  label: string
  bg: string
  bd: string
  fg: string
  glow: string
}

const mainPath: FlowNode[] = [
  { icon: Phone, label: "Incoming call", bg: "var(--ax-info-bg)", bd: "var(--ax-sky-blue)", fg: "var(--ax-info-text)", glow: "rgba(152, 204, 231, 0.5)" },
  { icon: Bot, label: "AI answers", bg: "var(--ax-pink-50)", bd: "var(--ax-pink-200)", fg: "var(--ax-pink-600)", glow: "rgba(234, 75, 113, 0.5)" },
  { icon: HelpCircle, label: "Qualifies", bg: "var(--ax-pink-50)", bd: "var(--ax-pink-200)", fg: "var(--ax-pink-600)", glow: "rgba(234, 75, 113, 0.5)" },
  { icon: CalendarCheck, label: "Books", bg: "#EEF0F9", bd: "#C7CEEF", fg: "var(--ax-accent-dark)", glow: "rgba(100, 117, 189, 0.5)" },
  { icon: MessageSquareText, label: "SMS summary", bg: "#EEF0F9", bd: "#C7CEEF", fg: "var(--ax-accent-dark)", glow: "rgba(100, 117, 189, 0.5)" },
]

const branchPath: FlowNode[] = [
  { icon: UserCheck, label: "Needs human", bg: "#FFF4EB", bd: "var(--ax-orange)", fg: "#7A4A00", glow: "rgba(255, 237, 117, 0.7)" },
  { icon: MessageSquareText, label: "Message taken", bg: "#EEF0F9", bd: "#C7CEEF", fg: "var(--ax-accent-dark)", glow: "rgba(100, 117, 189, 0.5)" },
  { icon: Phone, label: "Text to owner", bg: "#EEF0F9", bd: "#C7CEEF", fg: "var(--ax-accent-dark)", glow: "rgba(100, 117, 189, 0.5)" },
]

/* ------------------------------------------------------------------ */
/*  Animation timing                                                    */
/* ------------------------------------------------------------------ */

const STEP = 180 // ms between each element activation

// Main path: node0 conn0 node1 conn1 ... node4 = indices 0..8
function mainNodeDelay(i: number): number { return i * 2 * STEP }
function mainConnDelay(i: number): number { return (i * 2 + 1) * STEP }

// Branch divider at index 9, branch path starts at 10
const BRANCH_DELAY = 9 * STEP
function branchNodeDelay(i: number): number { return (10 + i * 2) * STEP }
function branchConnDelay(i: number): number { return (10 + i * 2 + 1) * STEP }

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function FlowNode({ node, delay }: { node: FlowNode; delay: number }) {
  const { icon: Icon, label, bg, bd, fg, glow } = node
  return (
    <div
      className="cf-step flex flex-col items-center gap-2 shrink-0"
      style={{ "--d": `${delay}ms`, "--glow": glow } as React.CSSProperties}
    >
      <div className="relative">
        {/* Glow ring */}
        <div className="cf-glow absolute inset-[-10px] rounded-full pointer-events-none" aria-hidden="true" />
        {/* Circle */}
        <div
          className="cf-circle relative cf-circle-size rounded-full flex items-center justify-center border-2"
          style={{ background: bg, borderColor: bd, color: fg }}
        >
          <Icon size={18} strokeWidth={1.75} className="relative z-[1]" aria-hidden="true" />
        </div>
      </div>
      <span
        className="cf-label cf-label-size font-semibold uppercase text-[var(--ax-fg-on-dark-2)] whitespace-nowrap"
        style={{ fontFamily: "var(--ax-font-mono)" }}
      >
        {label}
      </span>
    </div>
  )
}

function FlowConnector({ delay, active }: { delay: number; active: boolean }) {
  const base = active ? "rgba(234, 75, 113, 0.15)" : "rgba(255, 255, 255, 0.06)"
  const fill = active ? "var(--ax-primary)" : "var(--ax-slate-600)"
  const dot = active ? "var(--ax-primary)" : "var(--ax-slate-600)"
  return (
    <div
      className="cf-conn relative cf-conn-size mx-1 sm:mx-2.5 shrink-0"
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
      aria-hidden="true"
    >
      {/* Base line (always visible, muted) */}
      <div className="absolute inset-0 rounded-full" style={{ background: base }} />
      {/* Animated fill (draws left to right) */}
      <div className="cf-conn-fill absolute inset-0 rounded-full origin-left" style={{ background: fill }} />
      {/* Arrow head */}
      <span
        className="cf-conn-arrow absolute right-[-6px] top-1/2 -translate-y-1/2 border-y-[4px] border-y-transparent border-l-[6px] z-[2]"
        style={{ borderLeftColor: fill }}
      />
      {/* Travelling pulse dot */}
      {active && (
        <div
          className="cf-dot absolute left-0 top-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: dot, boxShadow: `0 0 10px ${dot}` }}
        />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export function CallFlowDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--ax-radius-xl)] p-6 sm:p-10 border border-white/10",
        active && "cf-active",
      )}
      style={{
        background: "var(--ax-surface-dark-alt)",
        boxShadow: "0 16px 48px rgba(0, 0, 0, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
      role="img"
      aria-label="Voice agent call flow: Incoming call, AI answers, qualifies, books into calendar, SMS summary. Branch from qualify: needs a human, message taken, text to owner."
    >
      {/* Title */}
      <div
        className="text-[10px] uppercase text-[var(--ax-fg-on-dark-2)] mb-8"
        style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.08em" }}
      >
        Voice agent call flow
      </div>

      {/* Main automated path */}
      <div className="flex items-start justify-start flex-nowrap py-4 overflow-x-auto">
        {mainPath.map((node, i) => (
          <div key={node.label} className="flex items-start shrink-0">
            <FlowNode node={node} delay={mainNodeDelay(i)} />
            {i < mainPath.length - 1 && (
              <FlowConnector delay={mainConnDelay(i)} active />
            )}
          </div>
        ))}
      </div>

      {/* Branch separator */}
      <div
        className="cf-branch-div flex items-center gap-4 my-7"
        style={{ "--d": `${BRANCH_DELAY}ms` } as React.CSSProperties}
        aria-hidden="true"
      >
        <div className="h-px flex-1 bg-white/10" />
        <span
          className="text-[10px] uppercase text-[var(--ax-fg-on-dark-2)] shrink-0"
          style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.08em" }}
        >
          Branch from qualify step
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Branch escalation path */}
      <div className="flex items-start justify-start flex-nowrap py-4 overflow-x-auto">
        {branchPath.map((node, i) => (
          <div key={node.label} className="flex items-start shrink-0">
            <FlowNode node={node} delay={branchNodeDelay(i)} />
            {i < branchPath.length - 1 && (
              <FlowConnector delay={branchConnDelay(i)} active={false} />
            )}
          </div>
        ))}
      </div>

      {/* Caption */}
      <p className="mt-8 text-[13px] leading-[1.5] text-[var(--ax-fg-on-dark-2)]">
        Pink path runs on its own, every call. The yellow gate is where
        you stay in control.
      </p>
    </div>
  )
}
