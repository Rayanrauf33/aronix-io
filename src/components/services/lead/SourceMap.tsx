"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  Globe,
  MessageCircle,
  Phone,
  Zap,
  UserPlus,
  MailCheck,
  Send,
  CalendarCheck,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Source nodes                                                         */
/* ------------------------------------------------------------------ */

type Source = { icon: LucideIcon; label: string }

const sources: Source[] = [
  { icon: Globe, label: "Web Form" },
  { icon: Send, label: "Facebook Ad" },
  { icon: Globe, label: "Google Ad" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: MessageCircle, label: "Instagram DM" },
  { icon: Phone, label: "Missed Call" },
]

/* ------------------------------------------------------------------ */
/*  Feature cards                                                       */
/* ------------------------------------------------------------------ */

type Feature = { icon: LucideIcon; title: string; desc: string }

const features: Feature[] = [
  {
    icon: MailCheck,
    title: "First response personalised, not generic",
    desc: "References what they filled in and asks the one question that moves the conversation forward.",
  },
  {
    icon: UserPlus,
    title: "Qualification handled automatically",
    desc: "The system handles the back-and-forth, qualifies the lead, and answers basic questions.",
  },
  {
    icon: Send,
    title: "Follow-up if they go quiet",
    desc: "Once after 24 hours, again at 72 hours. A short, direct nudge that gets replies.",
  },
  {
    icon: CalendarCheck,
    title: "Full thread visible to you",
    desc: "You see the full conversation. You can jump in at any point with full context.",
  },
]

/* ------------------------------------------------------------------ */
/*  Hub and spoke diagram                                               */
/* ------------------------------------------------------------------ */

function HubSpoke() {
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
    <div ref={ref} className="relative py-8">
      {/* Mobile: simple vertical list */}
      <div className="md:hidden flex flex-col gap-3">
        {sources.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-[var(--ax-radius-md)] border border-[var(--ax-border)] p-3"
              style={{ background: "var(--ax-surface)" }}
            >
              <div
                className="w-8 h-8 rounded-[var(--ax-radius-sm)] flex items-center justify-center"
                style={{ background: "rgba(234,75,113,0.08)" }}
              >
                <Icon size={14} className="text-[var(--ax-primary)]" aria-hidden="true" />
              </div>
              <span className="text-[14px] font-medium text-[var(--ax-fg-1)]">{s.label}</span>
            </div>
          )
        })}
        <div className="flex justify-center py-3">
          <svg width="2" height="32" aria-hidden="true">
            <line x1="1" y1="0" x2="1" y2="32" stroke="var(--ax-primary)" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        </div>
        <div
          className="rounded-[var(--ax-radius-lg)] border border-[var(--ax-border)] p-4 text-center"
          style={{
            background: "var(--ax-surface-dark)",
            boxShadow: "0 0 24px rgba(234,75,113,0.15)",
          }}
        >
          <Zap size={20} className="text-[var(--ax-primary)] mx-auto mb-2" aria-hidden="true" />
          <span className="text-[14px] font-semibold text-white">Instant Response System</span>
        </div>
      </div>

      {/* Desktop: hub and spoke */}
      <div className="hidden md:block">
        <svg viewBox="0 0 700 280" className="w-full max-w-[700px] mx-auto h-auto" aria-hidden="true">
          {/* Source nodes */}
          {sources.map((s, i) => {
            const y = 20 + i * 44
            return (
              <g key={s.label}>
                {/* Node card */}
                <rect
                  x="10"
                  y={y}
                  width="140"
                  height="36"
                  rx="8"
                  fill="white"
                  stroke="var(--ax-border)"
                  strokeWidth="1"
                />
                {/* Icon bg */}
                <rect
                  x="18"
                  y={y + 6}
                  width="24"
                  height="24"
                  rx="4"
                  fill="rgba(234,75,113,0.08)"
                />
                {/* Icon placeholder dot */}
                <circle cx="30" cy={y + 18} r="4" fill="var(--ax-primary)" opacity="0.6" />
                {/* Label */}
                <text
                  x="50"
                  y={y + 22}
                  fill="var(--ax-fg-1)"
                  fontSize="12"
                  fontWeight="500"
                  fontFamily="var(--ax-font-body)"
                >
                  {s.label}
                </text>

                {/* Connector line */}
                <line
                  x1="150"
                  y1={y + 18}
                  x2="490"
                  y2="140"
                  stroke="var(--ax-primary)"
                  strokeWidth="1"
                  opacity="0.25"
                  strokeDasharray="4 4"
                  strokeDashoffset={active ? 0 : 400}
                  style={{ transition: `stroke-dashoffset 0.8s ease-out ${i * 0.15}s` }}
                />
              </g>
            )
          })}

          {/* Central hub */}
          <rect
            x="490"
            y="100"
            width="180"
            height="80"
            rx="16"
            fill="var(--ax-surface-dark)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            style={{ filter: "drop-shadow(0 0 20px rgba(234,75,113,0.15))" }}
          />
          {/* Hub icon */}
          <circle cx="580" cy="130" r="10" fill="rgba(234,75,113,0.15)" />
          <line x1="580" y1="125" x2="580" y2="135" stroke="var(--ax-primary)" strokeWidth="2" strokeLinecap="round" />
          <line x1="575" y1="130" x2="585" y2="130" stroke="var(--ax-primary)" strokeWidth="2" strokeLinecap="round" />
          {/* Hub text */}
          <text x="580" y="155" textAnchor="middle" fill="white" fontSize="13" fontWeight="600" fontFamily="var(--ax-font-display)">
            Instant Response System
          </text>
        </svg>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export function SourceMap() {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const showGrid = gridInView || !!reduce

  return (
    <div>
      {/* Hub and spoke */}
      <HubSpoke />

      {/* Feature cards */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-12">
        {features.map((f, i) => {
          const Icon = f.icon
          return (
            <motion.div
              key={f.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={showGrid ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
              className="rounded-[var(--ax-radius-lg)] border border-[var(--ax-border)] p-6"
              style={{ background: "var(--ax-surface)" }}
            >
              <div
                className="w-9 h-9 rounded-[var(--ax-radius-sm)] flex items-center justify-center mb-4"
                style={{ background: "rgba(234,75,113,0.08)" }}
              >
                <Icon size={18} className="text-[var(--ax-primary)]" aria-hidden="true" />
              </div>
              <h3
                className="text-[16px] font-semibold text-[var(--ax-fg-1)] mb-2"
                style={{ fontFamily: "var(--ax-font-display)" }}
              >
                {f.title}
              </h3>
              <p className="text-[14px] leading-[1.6] text-[var(--ax-fg-2)] m-0">
                {f.desc}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
