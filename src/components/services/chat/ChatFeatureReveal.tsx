"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { MessageCircle, CalendarCheck, UserPlus, BellRing } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Feature data                                                        */
/* ------------------------------------------------------------------ */

type Feature = {
  icon: LucideIcon
  title: string
  desc: string
  miniUI: "chat" | "calendar" | "capture" | "notify"
}

const features: Feature[] = [
  {
    icon: MessageCircle,
    title: "Holds a real conversation",
    desc: "Not a scripted button tree. A conversational agent that handles open-ended questions and reasons from your knowledge base.",
    miniUI: "chat",
  },
  {
    icon: CalendarCheck,
    title: "Books directly into your calendar",
    desc: "Real slots, no back and forth. The appointment lands in your calendar and you get a notification.",
    miniUI: "calendar",
  },
  {
    icon: UserPlus,
    title: "Captures visitors who aren\u2019t ready",
    desc: "For visitors who aren\u2019t ready to book yet, it captures their contact details and hands them to your follow-up sequence.",
    miniUI: "capture",
  },
  {
    icon: BellRing,
    title: "No lead falls through",
    desc: "Every conversation is logged. Every contact is captured. You see the full picture without checking multiple systems.",
    miniUI: "notify",
  },
]

/* ------------------------------------------------------------------ */
/*  Miniature UI elements                                               */
/* ------------------------------------------------------------------ */

function MiniChat() {
  return (
    <div className="space-y-2 p-3">
      <div className="flex justify-end">
        <div className="h-3 w-20 rounded-full" style={{ background: "var(--ax-primary)", opacity: 0.6 }} />
      </div>
      <div className="flex justify-start">
        <div className="h-3 w-28 rounded-full bg-white/10" />
      </div>
      <div className="flex justify-start">
        <div className="h-3 w-16 rounded-full bg-white/10" />
      </div>
    </div>
  )
}

function MiniCalendar() {
  return (
    <div className="p-3">
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={`h-${i}`}
            className="h-2 w-full rounded-[2px] bg-white/10"
          />
        ))}
        {Array.from({ length: 21 }, (_, i) => (
          <div
            key={i}
            className="h-4 w-full rounded-[2px]"
            style={{
              background: i === 10 ? "var(--ax-primary)" : "rgba(255,255,255,0.05)",
              opacity: i === 10 ? 0.8 : 1,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function MiniCapture() {
  return (
    <div className="p-3 space-y-2">
      <div className="h-3 w-12 rounded-[2px] bg-white/10" />
      <div className="h-6 w-full rounded-[var(--ax-radius-xs)] border border-white/10 bg-white/5" />
      <div className="h-3 w-10 rounded-[2px] bg-white/10" />
      <div className="h-6 w-full rounded-[var(--ax-radius-xs)] border border-white/10 bg-white/5" />
      <div
        className="h-6 w-16 rounded-[var(--ax-radius-xs)] mt-1"
        style={{ background: "var(--ax-primary)", opacity: 0.6 }}
      />
    </div>
  )
}

function MiniNotify() {
  return (
    <div className="p-3 space-y-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-[var(--ax-radius-xs)] p-2"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{
              background: i === 0 ? "var(--ax-success)" : "var(--ax-slate-600)",
            }}
          />
          <div className="flex-1 h-2 rounded-full bg-white/10" />
        </div>
      ))}
    </div>
  )
}

const miniMap: Record<Feature["miniUI"], () => React.JSX.Element> = {
  chat: MiniChat,
  calendar: MiniCalendar,
  capture: MiniCapture,
  notify: MiniNotify,
}

/* ------------------------------------------------------------------ */
/*  Feature card                                                        */
/* ------------------------------------------------------------------ */

function FeatureBlock({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  const Icon = feature.icon
  const MiniComponent = miniMap[feature.miniUI]

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    >
      {/* Mini UI card */}
      <div
        className="rounded-[var(--ax-radius-md)] border border-white/10 mb-4 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        <MiniComponent />
      </div>

      {/* Text */}
      <div className="flex items-start gap-3">
        <Icon size={18} className="text-[var(--ax-primary)] mt-0.5 shrink-0" aria-hidden="true" />
        <div>
          <h3
            className="text-[16px] font-semibold text-[var(--ax-fg-on-dark)] mb-1"
            style={{ fontFamily: "var(--ax-font-display)" }}
          >
            {feature.title}
          </h3>
          <p className="text-[14px] leading-[1.6] text-[var(--ax-fg-on-dark-2)] m-0">
            {feature.desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export function ChatFeatureReveal() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Left: sticky heading */}
      <div className="lg:sticky lg:top-[120px] lg:self-start">
        <h2
          className="text-[var(--ax-fg-on-dark)] mb-5"
          style={{
            fontFamily: "var(--ax-font-display)",
            fontWeight: 700,
            fontSize: "var(--ax-fs-h2)",
            lineHeight: "var(--ax-lh-snug)",
            letterSpacing: "var(--ax-tracking-tight)",
          }}
        >
          What we build
        </h2>
        <p className="text-[var(--ax-fs-body-lg)] leading-[1.7] text-[var(--ax-fg-on-dark-2)]">
          We build an AI chat agent that lives on your website and knows
          your business properly. Not a scripted button tree that
          dead-ends after three clicks.
        </p>
      </div>

      {/* Right: scrolling feature cards */}
      <div className="flex flex-col gap-12">
        {features.map((f, i) => (
          <FeatureBlock key={f.title} feature={f} index={i} />
        ))}
      </div>
    </div>
  )
}
