"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/Button"

const CALENDLY =
  "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"

/* ------------------------------------------------------------------ */
/*  Calculation logic                                                   */
/* ------------------------------------------------------------------ */

function calcLostRate(responseMinutes: number): number {
  if (responseMinutes > 240) return 0.7   // over 4 hours
  if (responseMinutes > 60) return 0.55   // over 1 hour
  if (responseMinutes > 5) return 0.35    // over 5 minutes
  return 0.1                               // under 5 minutes
}

function responseLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  return h === 1 ? "1 hour" : `${h} hours`
}

/* ------------------------------------------------------------------ */
/*  Animated number                                                     */
/* ------------------------------------------------------------------ */

function AnimatedNumber({ value, prefix }: { value: number; prefix?: string }) {
  const [displayed, setDisplayed] = useState(value)
  const prevRef = useRef(value)
  const frameRef = useRef(0)

  const animate = useCallback((from: number, to: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(to)
      return
    }

    cancelAnimationFrame(frameRef.current)
    const start = performance.now()
    const duration = 400

    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplayed(Math.round(from + (to - from) * eased))
      if (t < 1) frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    animate(prevRef.current, value)
    prevRef.current = value
    return () => cancelAnimationFrame(frameRef.current)
  }, [value, animate])

  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}{displayed.toLocaleString("en-US")}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Slider stops (non-linear: 1, 5, 15, 30, 60, 120, 240, 480, 2880)  */
/* ------------------------------------------------------------------ */

const sliderStops = [1, 5, 15, 30, 60, 120, 240, 480, 2880]

function sliderToMinutes(val: number): number {
  const idx = Math.round(val)
  return sliderStops[Math.min(idx, sliderStops.length - 1)]
}

function minutesToSlider(min: number): number {
  const idx = sliderStops.indexOf(min)
  return idx >= 0 ? idx : 5 // default to 120 min
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function ROICalculator() {
  const [leads, setLeads] = useState(20)
  const [jobValue, setJobValue] = useState(800)
  const [sliderVal, setSliderVal] = useState(minutesToSlider(240))

  const responseMinutes = sliderToMinutes(sliderVal)
  const lostRate = calcLostRate(responseMinutes)
  const leadsLost = Math.round(leads * lostRate)
  const revenueAtRisk = leadsLost * jobValue

  return (
    <div
      className="max-w-[480px] mx-auto rounded-[var(--ax-radius-xl)] border border-white/10 p-6 sm:p-8"
      style={{
        background: "var(--ax-surface-dark-alt)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.25)",
      }}
    >
      {/* Inputs */}
      <div className="flex flex-col gap-5 mb-8">
        {/* Leads per month */}
        <div>
          <label
            className="block text-[13px] text-[var(--ax-fg-on-dark-2)] mb-2"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            Leads per month
          </label>
          <input
            type="number"
            min={1}
            max={999}
            value={leads}
            onChange={(e) => setLeads(Math.max(1, Number(e.target.value) || 1))}
            className="w-full h-11 px-3 rounded-[var(--ax-radius-sm)] border border-white/15 bg-white/5 text-white text-[15px] focus:border-[var(--ax-primary)] focus-visible:outline-2 focus-visible:outline-[var(--ax-primary)] focus-visible:outline-offset-2"
            style={{ fontFamily: "var(--ax-font-mono)", fontVariantNumeric: "tabular-nums" }}
          />
        </div>

        {/* Average job value */}
        <div>
          <label
            className="block text-[13px] text-[var(--ax-fg-on-dark-2)] mb-2"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            Average job value
          </label>
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ax-fg-on-dark-2)] text-[15px]"
              style={{ fontFamily: "var(--ax-font-mono)" }}
            >
              $
            </span>
            <input
              type="number"
              min={1}
              value={jobValue}
              onChange={(e) => setJobValue(Math.max(1, Number(e.target.value) || 1))}
              className="w-full h-11 pl-7 pr-3 rounded-[var(--ax-radius-sm)] border border-white/15 bg-white/5 text-white text-[15px] focus:border-[var(--ax-primary)] focus-visible:outline-2 focus-visible:outline-[var(--ax-primary)] focus-visible:outline-offset-2"
              style={{ fontFamily: "var(--ax-font-mono)", fontVariantNumeric: "tabular-nums" }}
            />
          </div>
        </div>

        {/* Response time slider */}
        <div>
          <label
            className="block text-[13px] text-[var(--ax-fg-on-dark-2)] mb-2"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            Current response time:{" "}
            <span className="text-white font-semibold">
              {responseLabel(responseMinutes)}
            </span>
          </label>
          <input
            type="range"
            min={0}
            max={sliderStops.length - 1}
            step={1}
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            className="roi-slider w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--ax-primary) ${(sliderVal / (sliderStops.length - 1)) * 100}%, rgba(255,255,255,0.1) ${(sliderVal / (sliderStops.length - 1)) * 100}%)`,
            }}
          />
          <div className="flex justify-between text-[10px] text-[var(--ax-fg-on-dark-2)] mt-1"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            <span>1 min</span>
            <span>48 hrs</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10 mb-6" aria-hidden="true" />

      {/* Output */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex justify-between items-baseline">
          <span
            className="text-[13px] text-[var(--ax-fg-on-dark-2)]"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            Estimated leads lost per month
          </span>
          <span
            className="text-[20px] font-bold text-[var(--ax-error)]"
            style={{ fontFamily: "var(--ax-font-display)" }}
          >
            <AnimatedNumber value={leadsLost} />
          </span>
        </div>
        <div className="flex justify-between items-baseline">
          <span
            className="text-[13px] text-[var(--ax-fg-on-dark-2)]"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            Estimated revenue at risk
          </span>
          <span
            className="text-[20px] font-bold text-[var(--ax-error)]"
            style={{ fontFamily: "var(--ax-font-display)" }}
          >
            <AnimatedNumber value={revenueAtRisk} prefix="$" />
          </span>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[11px] text-[var(--ax-fg-on-dark-2)] mb-6 leading-[1.5]">
        Based on industry response rate benchmarks. Your actual figures may vary.
      </p>

      {/* CTA */}
      <Button href={CALENDLY} variant="primary" size="lg" className="w-full justify-center">
        Book an Audit
      </Button>
    </div>
  )
}
