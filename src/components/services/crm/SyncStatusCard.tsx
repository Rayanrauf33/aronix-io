"use client"

import { useRef, useState, useEffect } from "react"

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const transfers = [
  { source: "Web Form", delay: "0s" },
  { source: "Stripe", delay: "0.45s" },
  { source: "Calendly", delay: "0.9s" },
  { source: "Gmail", delay: "1.35s" },
]

/* ------------------------------------------------------------------ */
/*  CSS keyframes for the travelling dot                               */
/* ------------------------------------------------------------------ */

const syncDotStyle = `
@keyframes ax-sync-dot {
  0% { left: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}
`

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function SyncStatusCard() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [reduce, setReduce] = useState(false)
  const [elapsed, setElapsed] = useState(12)

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  /* IntersectionObserver to pause continuous animations when off-screen */
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

  /* Counter: increments every second, resets at 60 */
  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setElapsed((prev) => (prev >= 59 ? 0 : prev + 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [visible])

  return (
    <div
      ref={ref}
      className="rounded-[var(--ax-radius-xl)] border border-white/10 overflow-hidden"
      style={{ background: "var(--ax-surface-dark-alt)" }}
    >
      {/* Inject CSS keyframes */}
      <style dangerouslySetInnerHTML={{ __html: syncDotStyle }} />

      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: "var(--ax-success)" }}
        />
        <span
          className="text-[11px] uppercase font-bold"
          style={{
            fontFamily: "var(--ax-font-mono)",
            letterSpacing: "0.1em",
            color: "var(--ax-success)",
          }}
        >
          Syncing
        </span>
        <span
          className="text-[11px] uppercase ml-auto"
          style={{
            fontFamily: "var(--ax-font-mono)",
            letterSpacing: "0.08em",
            color: "var(--ax-fg-on-dark-2)",
          }}
        >
          Integration status
        </span>
      </div>

      {/* Transfer rows */}
      <div className="px-5 py-4 flex flex-col gap-4">
        {transfers.map((t) => (
          <div key={t.source} className="flex items-center gap-3">
            {/* Source pill */}
            <span
              className="text-[11px] px-3 py-1.5 rounded-[var(--ax-radius-sm)] border border-white/10 shrink-0 w-[88px] text-center"
              style={{
                fontFamily: "var(--ax-font-mono)",
                color: "var(--ax-fg-on-dark)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              {t.source}
            </span>

            {/* Animated line with travelling dot */}
            <div className="flex-1 relative h-px" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div
                className="absolute top-1/2 w-1.5 h-1.5 rounded-full -translate-y-1/2"
                style={{
                  background: "var(--ax-primary)",
                  animation: visible && !reduce
                    ? `ax-sync-dot 1.8s linear ${t.delay} infinite`
                    : "none",
                }}
              />
            </div>

            {/* Destination pill */}
            <span
              className="text-[11px] px-3 py-1.5 rounded-[var(--ax-radius-sm)] border shrink-0"
              style={{
                fontFamily: "var(--ax-font-mono)",
                color: "var(--ax-primary)",
                borderColor: "color-mix(in srgb, var(--ax-primary) 30%, transparent)",
                background: "color-mix(in srgb, var(--ax-primary) 6%, transparent)",
              }}
            >
              CRM
            </span>
          </div>
        ))}
      </div>

      {/* Footer stats */}
      <div
        className="px-5 py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span
          className="text-[11px]"
          style={{
            fontFamily: "var(--ax-font-mono)",
            color: "var(--ax-fg-on-dark-2)",
          }}
        >
          247 records synced today
          <span className="mx-2" style={{ color: "rgba(255,255,255,0.2)" }}>
            ·
          </span>
          Last sync {elapsed}s ago
        </span>
      </div>
    </div>
  )
}
