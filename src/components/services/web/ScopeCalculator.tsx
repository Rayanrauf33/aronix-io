"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const CALENDLY =
  "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"

/* ------------------------------------------------------------------ */
/*  Price matrix                                                        */
/*  pages: 0=small, 1=medium, 2=large                                  */
/*  copy:  0=provided, 1=written                                        */
/*  integrations: 0=basic, 1=custom                                     */
/*  Each combo maps to [low, high]                                      */
/* ------------------------------------------------------------------ */

const prices: Record<string, [number, number]> = {
  "0-0-0": [300,  500],
  "0-0-1": [400,  600],
  "0-1-0": [450,  700],
  "0-1-1": [500,  800],
  "1-0-0": [500,  750],
  "1-0-1": [600,  900],
  "1-1-0": [650, 1000],
  "1-1-1": [700, 1100],
  "2-0-0": [700, 1000],
  "2-0-1": [750, 1200],
  "2-1-0": [850, 1300],
  "2-1-1": [900, 1500],
}

/* ------------------------------------------------------------------ */
/*  Pill button                                                         */
/* ------------------------------------------------------------------ */

function Pill({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "px-4 py-2 min-h-[44px] rounded-[var(--ax-radius-pill)] text-[13px] font-medium border",
        "transition-[border-color,background-color,color] duration-150",
        "focus-visible:outline-2 focus-visible:outline-[var(--ax-primary)] focus-visible:outline-offset-2",
        selected
          ? "border-[var(--ax-primary)] text-white"
          : "border-white/15 text-[var(--ax-fg-on-dark-2)] hover:border-white/30",
      )}
      style={{
        background: selected
          ? "color-mix(in srgb, var(--ax-primary) 15%, transparent)"
          : "transparent",
      }}
    >
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function ScopeCalculator() {
  const [pages, setPages] = useState(0)
  const [copy, setCopy] = useState(1)
  const [integrations, setIntegrations] = useState(0)
  const [fade, setFade] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const key = `${pages}-${copy}-${integrations}`
  const [low, high] = prices[key] ?? [300, 500]

  // Fade transition when price changes
  useEffect(() => {
    setFade(true)
    timerRef.current = setTimeout(() => setFade(false), 150)
    return () => clearTimeout(timerRef.current)
  }, [key])

  return (
    <div
      className="max-w-[520px] mx-auto rounded-[var(--ax-radius-xl)] border border-white/10 p-6 sm:p-8"
      style={{
        background: "var(--ax-surface-dark-alt)",
        boxShadow: "var(--ax-shadow-xl)",
      }}
    >
      {/* Toggle rows */}
      <div className="flex flex-col gap-6 mb-8">
        {/* Pages */}
        <div>
          <div
            id="scope-pages"
            className="block text-[13px] text-[var(--ax-fg-on-dark-2)] mb-3"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            How many pages?
          </div>
          <div role="radiogroup" aria-labelledby="scope-pages" className="flex flex-wrap gap-2">
            <Pill selected={pages === 0} onClick={() => setPages(0)}>1 &ndash; 5 pages</Pill>
            <Pill selected={pages === 1} onClick={() => setPages(1)}>6 &ndash; 10 pages</Pill>
            <Pill selected={pages === 2} onClick={() => setPages(2)}>10+ pages</Pill>
          </div>
        </div>

        {/* Copy */}
        <div>
          <div
            id="scope-copy"
            className="block text-[13px] text-[var(--ax-fg-on-dark-2)] mb-3"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            Do you need copy written?
          </div>
          <div role="radiogroup" aria-labelledby="scope-copy" className="flex flex-wrap gap-2">
            <Pill selected={copy === 1} onClick={() => setCopy(1)}>Yes, write it for us</Pill>
            <Pill selected={copy === 0} onClick={() => setCopy(0)}>We&apos;ll provide it</Pill>
          </div>
        </div>

        {/* Integrations */}
        <div>
          <div
            id="scope-integrations"
            className="block text-[13px] text-[var(--ax-fg-on-dark-2)] mb-3"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            Integrations needed?
          </div>
          <div role="radiogroup" aria-labelledby="scope-integrations" className="flex flex-wrap gap-2">
            <Pill selected={integrations === 0} onClick={() => setIntegrations(0)}>Basic</Pill>
            <Pill selected={integrations === 1} onClick={() => setIntegrations(1)}>Custom</Pill>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10 mb-6" aria-hidden="true" />

      {/* Result */}
      <div className="text-center mb-6">
        <div
          className="text-[13px] text-[var(--ax-fg-on-dark-2)] mb-2"
          style={{ fontFamily: "var(--ax-font-mono)" }}
        >
          Estimated range
        </div>
        <div
          className="transition-opacity duration-150"
          style={{ opacity: fade ? 0 : 1 }}
        >
          <span
            className="text-white"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 800,
              fontSize: "var(--ax-fs-h2)",
              lineHeight: 1,
              letterSpacing: "var(--ax-tracking-tight)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            ${low.toLocaleString("en-US")} &ndash; ${high.toLocaleString("en-US")}
          </span>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[11px] text-[var(--ax-fg-on-dark-2)] mb-6 text-center leading-[1.5]">
        Exact price confirmed after the discovery session.
      </p>

      {/* CTA */}
      <Button href={CALENDLY} variant="primary" size="lg" className="w-full justify-center">
        Book an Audit
      </Button>
    </div>
  )
}
