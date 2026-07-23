"use client"

import { useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  Search,
  LayoutGrid,
  PenLine,
  Code,
  Gauge,
  Globe,
  BarChart3,
  MessageCircle,
  CalendarCheck,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Deliverable data                                                    */
/* ------------------------------------------------------------------ */

type Item = {
  icon: LucideIcon
  label: string
  desc: string
  preview: "search" | "grid" | "pen" | "code" | "gauge" | "seo" | "chart" | "chat" | "calendar"
}

const items: Item[] = [
  { icon: Search, label: "Discovery session and competitor review", desc: "Understand who you compete with and what wins.", preview: "search" },
  { icon: LayoutGrid, label: "Sitemap and page structure", desc: "Based on customer research, not guesswork.", preview: "grid" },
  { icon: PenLine, label: "Copy written or edited for every page", desc: "Words that convert, not fill space.", preview: "pen" },
  { icon: Code, label: "Design and development in Next.js", desc: "Fast, server-rendered, built to last.", preview: "code" },
  { icon: Gauge, label: "Performance optimisation", desc: "Core Web Vitals, image optimisation, caching.", preview: "gauge" },
  { icon: Globe, label: "SEO foundations", desc: "Page titles, meta descriptions, schema, sitemap.", preview: "seo" },
  { icon: BarChart3, label: "Analytics and conversion tracking", desc: "Set up from day one, not bolted on later.", preview: "chart" },
  { icon: MessageCircle, label: "Chat agent or booking widget", desc: "Integrated if required, part of the build.", preview: "chat" },
  { icon: CalendarCheck, label: "60 days of post-launch monitoring", desc: "We adjust based on real data.", preview: "calendar" },
]

/* ------------------------------------------------------------------ */
/*  Hover previews                                                      */
/* ------------------------------------------------------------------ */

function PreviewContent({ type }: { type: Item["preview"] }) {
  switch (type) {
    case "chart":
      return (
        <div className="flex items-end gap-1 h-6">
          {[30, 50, 40, 65, 55, 80].map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-t-[1px]"
              style={{ height: `${h}%`, background: "var(--ax-primary)", opacity: 0.5, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      )
    case "chat":
      return (
        <div className="flex flex-col gap-1">
          <div className="w-4 h-4 rounded-full self-end" style={{ background: "var(--ax-primary)", opacity: 0.4 }} />
          <div className="w-12 h-2 rounded-full self-start bg-[var(--ax-slate-300)]" />
        </div>
      )
    case "seo":
      return (
        <div className="space-y-1">
          <div className="h-1.5 w-16 rounded bg-[var(--ax-accent)]" style={{ opacity: 0.5 }} />
          <div className="h-1 w-full rounded bg-[var(--ax-slate-300)]" />
          <div className="h-1 w-3/4 rounded bg-[var(--ax-slate-300)]" />
        </div>
      )
    case "gauge":
      return (
        <svg viewBox="0 0 40 24" className="w-10 h-auto" aria-hidden="true">
          <path d="M4 20 A 16 16 0 0 1 36 20" fill="none" stroke="var(--ax-slate-300)" strokeWidth="3" strokeLinecap="round" />
          <path d="M4 20 A 16 16 0 0 1 32 10" fill="none" stroke="var(--ax-success)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </svg>
      )
    default:
      return (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--ax-primary)", opacity: 0.4 }} />
          <div className="h-1 w-10 rounded bg-[var(--ax-slate-300)]" />
        </div>
      )
  }
}

/* ------------------------------------------------------------------ */
/*  Card                                                                */
/* ------------------------------------------------------------------ */

function IncludedCard({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce
  const [hovered, setHovered] = useState(false)
  const Icon = item.icon

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: index * 0.06, duration: 0.35, ease: "easeOut" }}
      className="rounded-[var(--ax-radius-lg)] border border-[var(--ax-border)] p-5 bg-[var(--ax-surface)] transition-shadow duration-200 hover:shadow-[var(--ax-shadow-md)] cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-[var(--ax-radius-sm)] flex items-center justify-center shrink-0"
          style={{ background: "color-mix(in srgb, var(--ax-primary) 8%, transparent)" }}
        >
          <Icon size={16} className="text-[var(--ax-primary)]" aria-hidden="true" />
        </div>
      </div>
      <h3
        className="text-[14px] font-semibold text-[var(--ax-fg-1)] mb-1"
        style={{ fontFamily: "var(--ax-font-display)" }}
      >
        {item.label}
      </h3>
      <p className="text-[13px] leading-[1.5] text-[var(--ax-fg-3)] m-0">
        {item.desc}
      </p>
      {/* Hover preview */}
      <div
        className="mt-3 overflow-hidden transition-[max-height,opacity] duration-200"
        style={{ maxHeight: hovered ? "48px" : "0", opacity: hovered ? 1 : 0 }}
      >
        <PreviewContent type={item.preview} />
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export function IncludedGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <IncludedCard key={item.label} item={item} index={i} />
      ))}
    </div>
  )
}
