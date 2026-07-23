"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Globe, MessageCircle } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Lead data (loops)                                                   */
/* ------------------------------------------------------------------ */

type Lead = {
  name: string
  source: string
  sourceIcon: "web" | "facebook" | "google" | "whatsapp"
}

const leads: Lead[] = [
  { name: "Sarah M.", source: "Web Form", sourceIcon: "web" },
  { name: "James T.", source: "Facebook Ad", sourceIcon: "facebook" },
  { name: "Priya K.", source: "Google Ad", sourceIcon: "google" },
  { name: "Daniel R.", source: "WhatsApp", sourceIcon: "whatsapp" },
  { name: "Olivia W.", source: "Web Form", sourceIcon: "web" },
  { name: "Liam C.", source: "Google Ad", sourceIcon: "google" },
  { name: "Emma B.", source: "Facebook Ad", sourceIcon: "facebook" },
  { name: "Noah S.", source: "WhatsApp", sourceIcon: "whatsapp" },
]

const INTERVAL = 2500
const MAX_VISIBLE = 4

/* ------------------------------------------------------------------ */
/*  Source icon                                                         */
/* ------------------------------------------------------------------ */

function SourceIcon({ type }: { type: Lead["sourceIcon"] }) {
  const base = "w-8 h-8 rounded-[var(--ax-radius-sm)] flex items-center justify-center shrink-0 text-[12px] font-bold"

  switch (type) {
    case "web":
      return (
        <div className={base} style={{ background: "rgba(152,204,231,0.15)" }}>
          <Globe size={14} className="text-[var(--ax-info)]" />
        </div>
      )
    case "facebook":
      return (
        <div className={base} style={{ background: "rgba(66,103,178,0.15)", color: "#4267B2" }}>
          F
        </div>
      )
    case "google":
      return (
        <div className={base} style={{ background: "rgba(234,67,53,0.15)", color: "#EA4335" }}>
          G
        </div>
      )
    case "whatsapp":
      return (
        <div className={base} style={{ background: "rgba(37,211,102,0.15)" }}>
          <MessageCircle size={14} className="text-[var(--ax-success)]" />
        </div>
      )
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function LeadFeedHero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [visibleLeads, setVisibleLeads] = useState<Array<Lead & { id: number; age: number }>>([])
  const [visible, setVisible] = useState(false)
  const idCounter = useRef(0)

  /* IntersectionObserver: pause all intervals when off-screen */
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

  const addLead = useCallback(() => {
    const lead = leads[idCounter.current % leads.length]
    const id = idCounter.current++
    setVisibleLeads((prev) => {
      const next = [{ ...lead, id, age: 0 }, ...prev]
      return next.slice(0, MAX_VISIBLE)
    })
  }, [])

  /* Show static state for reduced motion */
  useEffect(() => {
    if (!reduce) return
    setVisibleLeads(
      leads.slice(0, MAX_VISIBLE).map((l, i) => ({
        ...l,
        id: i,
        age: i * 12,
      })),
    )
  }, [reduce])

  /* Lead feed interval -- only runs when visible and not reduced */
  useEffect(() => {
    if (reduce || !visible) return
    addLead()
    const interval = setInterval(addLead, INTERVAL)
    return () => clearInterval(interval)
  }, [reduce, visible, addLead])

  /* Age ticker -- only runs when visible and not reduced */
  useEffect(() => {
    if (reduce || !visible) return
    const tick = setInterval(() => {
      setVisibleLeads((prev) =>
        prev.map((l) => ({
          ...l,
          age: l.age >= 47 ? 0 : l.age + 1,
        })),
      )
    }, 1000)
    return () => clearInterval(tick)
  }, [reduce, visible])

  return (
    <div ref={ref} className="hidden lg:block w-full">
      <div
        className="rounded-[var(--ax-radius-xl)] overflow-hidden border border-white/10"
        style={{
          background: "var(--ax-surface-dark-alt)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/10">
          {/* lead-feed-pulse dot: only animates when visible */}
          <span
            className={visible && !reduce ? "lead-feed-pulse w-2 h-2 rounded-full bg-[var(--ax-success)]" : "w-2 h-2 rounded-full bg-[var(--ax-success)]"}
          />
          <span
            className="text-[11px] uppercase font-bold text-[var(--ax-fg-on-dark-2)]"
            style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.1em" }}
          >
            Incoming leads
          </span>
        </div>

        {/* Feed */}
        <div className="p-3 h-[280px] flex flex-col gap-2 overflow-hidden">
          <AnimatePresence initial={false}>
            {visibleLeads.map((lead) => (
              <motion.div
                key={lead.id}
                layout
                initial={reduce ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-[var(--ax-radius-md)] border border-white/8 p-3 flex items-center gap-3 shrink-0"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <SourceIcon type={lead.sourceIcon} />
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[13px] font-semibold text-white"
                    style={{ fontFamily: "var(--ax-font-display)" }}
                  >
                    {lead.name}
                  </div>
                  <div className="text-[11px] text-[var(--ax-fg-on-dark-2)]">
                    {lead.source}
                  </div>
                </div>
                <span
                  className="text-[11px] text-[var(--ax-fg-on-dark-2)] shrink-0 tabular-nums"
                  style={{ fontFamily: "var(--ax-font-mono)" }}
                >
                  {lead.age}s ago
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Response timer */}
        <div
          className="px-5 py-3 border-t border-white/10 text-center"
          style={{ fontFamily: "var(--ax-font-mono)" }}
        >
          <ResponseTimer reduce={!!reduce} visible={visible} />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Response timer                                                      */
/* ------------------------------------------------------------------ */

function ResponseTimer({ reduce, visible }: { reduce: boolean; visible: boolean }) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (reduce) {
      setSeconds(47)
      return
    }
    if (!visible) return
    const interval = setInterval(() => {
      setSeconds((s) => (s >= 59 ? 0 : s + 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [reduce, visible])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <span className="text-[12px] text-[var(--ax-success)]">
      Response sent in {mins}:{String(secs).padStart(2, "0")}
    </span>
  )
}
