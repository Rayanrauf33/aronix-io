"use client"

import { useRef, useCallback, useEffect } from "react"
import { useScrollProgress } from "@/hooks/useScrollProgress"
import { Eyebrow } from "@/components/ui/Eyebrow"

const steps = [
  { n: "01", t: "Workflow Audit",     d: "We map every manual step: what triggers it, who does it, and what breaks when it goes wrong." },
  { n: "02", t: "System Design",      d: "We design the automation logic, select the right tools, and define the monitoring layer." },
  { n: "03", t: "Build & Test",       d: "We build in sprints, test against your real data, and fix edge cases before go-live." },
  { n: "04", t: "Handover & Monitor", d: "You get documentation, a monitoring dashboard, and a team that stays accountable." },
]

/* ── easing ────────────────────────────────────────────── */

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function backOut(t: number, s = 1.15): number {
  const u = t - 1
  return 1 + u * u * ((s + 1) * u + s)
}

/* ── scroll segments ──────────────────────────────────── */

const TITLE_END  = 0.12
const STEP_START = 0.15
const STEP_SEG   = 0.175

export function HowItWorks() {
  const titleRef    = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)
  const glowRef     = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const badgeEls    = useRef<(HTMLDivElement | null)[]>([])
  const ringEls     = useRef<(HTMLDivElement | null)[]>([])
  const headEls     = useRef<(HTMLHeadingElement | null)[]>([])
  const descEls     = useRef<(HTMLParagraphElement | null)[]>([])

  const ringsTriggered = useRef([false, false, false, false])
  const mobileRef      = useRef(false)
  const shiftRef       = useRef(0)
  const cache = useRef({
    title: "", sub: "", line: "", glow: "", shift: "",
    steps: ["", "", "", ""],
  })

  /* On mobile: reveal all content immediately (no scroll animation).
     On desktop: measure overflow for the content-shift fallback. */
  useEffect(() => {
    mobileRef.current = window.innerWidth < 768
    if (mobileRef.current) {
      const reveal = (el: HTMLElement | null) => {
        if (!el) return
        el.style.opacity = "1"
        el.style.transform = "none"
      }
      reveal(titleRef.current)
      reveal(subtitleRef.current)
      for (let i = 0; i < 4; i++) {
        reveal(badgeEls.current[i])
        reveal(headEls.current[i])
        reveal(descEls.current[i])
      }
      return
    }

    const inner = contentRef.current
    if (!inner) return
    const stickyEl = inner.closest(".process-sticky") as HTMLElement | null
    if (!stickyEl) return
    const overflow = inner.scrollHeight - stickyEl.clientHeight
    if (overflow > 0) {
      shiftRef.current = overflow + 48
      inner.style.willChange = "transform"
    }
  }, [])

  const apply = useCallback((p: number) => {
    if (mobileRef.current) return

    /* ── Title settle (soft zoom to rest) ─────────────── */
    const tEl = titleRef.current
    if (tEl) {
      const raw = Math.min(1, p / TITLE_END)
      const t = easeOutCubic(raw)
      const y = (1 - t) * 56
      const sc = 1.03 - 0.03 * t
      const op = Math.min(1, raw * 5)
      const k = `${y.toFixed(1)}|${sc.toFixed(4)}|${op.toFixed(3)}`
      if (cache.current.title !== k) {
        cache.current.title = k
        tEl.style.transform = `translate3d(0,${y.toFixed(1)}px,0) scale(${sc.toFixed(4)})`
        tEl.style.opacity = op.toFixed(3)
      }
    }

    /* ── Subtitle (slightly delayed fade + rise) ──────── */
    const sEl = subtitleRef.current
    if (sEl) {
      const raw = Math.max(0, Math.min(1, (p - 0.04) / 0.09))
      const t = easeOutCubic(raw)
      const y = (1 - t) * 24
      const k = `${t.toFixed(3)}|${y.toFixed(1)}`
      if (cache.current.sub !== k) {
        cache.current.sub = k
        sEl.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`
        sEl.style.opacity = t.toFixed(3)
      }
    }

    /* ── Connector line draws left to right (lg only) ── */
    const lEl = lineRef.current
    if (lEl) {
      const end = STEP_START + 3 * STEP_SEG + STEP_SEG * 0.5
      const raw = Math.max(0, Math.min(1, (p - 0.10) / (end - 0.10)))
      const k = raw.toFixed(4)
      if (cache.current.line !== k) {
        cache.current.line = k
        lEl.style.transform = `scaleX(${k})`
      }
    }

    /* ── Ambient glow bloom ───────────────────────────── */
    const gEl = glowRef.current
    if (gEl) {
      const raw = Math.max(0, Math.min(1, (p - STEP_START) / 0.45))
      const o = (easeOutCubic(raw) * 0.5).toFixed(3)
      if (cache.current.glow !== o) {
        cache.current.glow = o
        gEl.style.opacity = o
      }
    }

    /* ── Content shift (small viewports only) ─────────── */
    if (shiftRef.current > 0 && contentRef.current) {
      const raw = Math.max(0, Math.min(1, (p - 0.38) / 0.47))
      const shift = (easeOutCubic(raw) * shiftRef.current).toFixed(1)
      if (cache.current.shift !== shift) {
        cache.current.shift = shift
        contentRef.current.style.transform = `translate3d(0,-${shift}px,0)`
      }
    }

    /* ── Steps: sequential reveal ─────────────────────── */
    for (let i = 0; i < 4; i++) {
      const start = STEP_START + i * STEP_SEG
      const raw = Math.max(0, Math.min(1, (p - start) / STEP_SEG))

      /* Badge: pop with overshoot (first 45% of segment) */
      const br = Math.min(1, raw / 0.45)
      const bt = easeOutCubic(br)
      const bs = backOut(br)
      const bOp = bt.toFixed(3)
      const bSc = bs.toFixed(4)

      /* Heading: slide up + fade (20%..65% of segment) */
      const hr = Math.max(0, Math.min(1, (raw - 0.20) / 0.45))
      const ht = easeOutCubic(hr)
      const hY = ((1 - ht) * 22).toFixed(1)
      const hOp = ht.toFixed(3)

      /* Description: slide up + fade (35%..85% of segment) */
      const dr = Math.max(0, Math.min(1, (raw - 0.35) / 0.50))
      const dt = easeOutCubic(dr)
      const dY = ((1 - dt) * 18).toFixed(1)
      const dOp = dt.toFixed(3)

      const sk = `${bOp}|${bSc}|${hOp}|${hY}|${dOp}|${dY}`
      if (cache.current.steps[i] !== sk) {
        cache.current.steps[i] = sk

        const bEl = badgeEls.current[i]
        if (bEl) {
          bEl.style.opacity = bOp
          bEl.style.transform = `scale(${bSc})`
          bEl.dataset.active = br >= 0.9 ? "true" : ""
        }
        const hEl = headEls.current[i]
        if (hEl) {
          hEl.style.opacity = hOp
          hEl.style.transform = `translate3d(0,${hY}px,0)`
        }
        const dEl = descEls.current[i]
        if (dEl) {
          dEl.style.opacity = dOp
          dEl.style.transform = `translate3d(0,${dY}px,0)`
        }
      }

      /* Ring pulse: one-shot, re-triggerable on scroll-back */
      if (raw >= 0.35 && !ringsTriggered.current[i]) {
        ringsTriggered.current[i] = true
        ringEls.current[i]?.classList.add("hiw-ring-active")
      } else if (raw < 0.15 && ringsTriggered.current[i]) {
        ringsTriggered.current[i] = false
        ringEls.current[i]?.classList.remove("hiw-ring-active")
      }
    }
  }, [])

  const containerRef = useScrollProgress(apply)

  return (
    <div
      ref={containerRef}
      className="process-runway"
      aria-labelledby="hiw-heading"
    >
      <div className="process-sticky">
        <div
          ref={glowRef}
          className="process-glow"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />

        <div ref={contentRef} className="process-content">
          {/* Title block */}
          <div
            ref={titleRef}
            className="text-center mb-8 sm:mb-14 mx-auto max-w-[640px]"
            style={{
              opacity: 0,
              transform: "translate3d(0,56px,0) scale(1.03)",
            }}
          >
            <Eyebrow tone="accent-dark" className="mb-3.5">Our process</Eyebrow>
            <h2
              id="hiw-heading"
              className="text-[var(--ax-fg-on-dark)] mb-4"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 700,
                fontSize: "clamp(32px, 3.5vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              From audit to automation in four weeks
            </h2>
            <p
              ref={subtitleRef}
              className="text-[18px] leading-[1.6] text-[var(--ax-fg-on-dark-2)]"
              style={{ opacity: 0, transform: "translate3d(0,24px,0)" }}
            >
              We work alongside your team, not around them. Every automation is
              tested and monitored before it touches live data.
            </p>
          </div>

          {/* Steps grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 md:gap-0">
            {/* Connector line (desktop) */}
            <div
              ref={lineRef}
              className="hidden lg:block absolute top-[22px] left-[10%] right-[10%] h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(234,75,113,0.35) 0%, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.08) 100%)",
                transformOrigin: "left center",
                transform: "scaleX(0)",
              }}
              aria-hidden="true"
            />

            {steps.map(({ n, t, d }, i) => (
              <div key={n} className="hiw-step text-center px-5 relative z-10">
                <div
                  ref={(el) => { badgeEls.current[i] = el }}
                  className="hiw-badge"
                  style={{ opacity: 0, transform: "scale(0.5)" }}
                >
                  {n}
                  <span
                    ref={(el) => { ringEls.current[i] = el as HTMLDivElement | null }}
                    className="hiw-ring"
                    aria-hidden="true"
                  />
                </div>
                <h3
                  ref={(el) => { headEls.current[i] = el }}
                  className="mb-2.5 text-[18px] text-[var(--ax-fg-on-dark)]"
                  style={{
                    fontFamily: "var(--ax-font-display)",
                    fontWeight: 600,
                    opacity: 0,
                    transform: "translate3d(0,22px,0)",
                  }}
                >
                  {t}
                </h3>
                <p
                  ref={(el) => { descEls.current[i] = el }}
                  className="text-[14px] leading-[1.6] text-[var(--ax-fg-on-dark-2)]"
                  style={{ opacity: 0, transform: "translate3d(0,18px,0)" }}
                >
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
