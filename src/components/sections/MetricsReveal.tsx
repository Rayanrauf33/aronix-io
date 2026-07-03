"use client"

import { useRef, useImperativeHandle, forwardRef, useEffect } from "react"

export type MetricsRevealHandle = {
  applyProgress: (progress: number) => void
}

// num counts up during the reveal; affix stays static. SSR renders the
// final value so crawlers and no-JS visitors always see "40+" etc.
const metrics = [
  { num: 40, affix: "+", lbl: "Companies automated" },
  { num: 14, affix: "h", lbl: "Avg hours saved per week" },
  { num: 98, affix: "%", lbl: "Automation uptime" },
  { num: 3,  affix: "\u00d7", lbl: "Avg team throughput gain" },
]

// Sequential reveals: each metric owns its own scroll segment, so one
// appears fully before the next begins (Mobbin-style pacing).
// Starts after the gather + scatter phases complete at 0.5.
const REVEAL_START = 0.54
const SEGMENT = 0.105

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

// Mild settle overshoot: eases past the target then back (s controls it)
function backOut(t: number, s = 1.1): number {
  const u = t - 1
  return 1 + u * u * ((s + 1) * u + s)
}

export const MetricsReveal = forwardRef<MetricsRevealHandle>(
  function MetricsReveal(_, ref) {
    const elRefs = useRef<(HTMLDivElement | null)[]>([])
    const numRefs = useRef<(HTMLSpanElement | null)[]>([])
    const glowRef = useRef<HTMLDivElement>(null)
    const lastWrittenRef = useRef<string[]>([])
    const lastGlowRef = useRef("")
    // Blur-to-sharp is desktop-only: animating filter is the costliest
    // part of the reveal, and at phone sizes the rise + fade + count-up
    // carry the effect on their own
    const mobileRef = useRef(false)

    useEffect(() => {
      mobileRef.current = window.innerWidth < 640
    }, [])

    useImperativeHandle(ref, () => ({
      applyProgress(progress: number) {
        for (let i = 0; i < metrics.length; i++) {
          const el = elRefs.current[i]
          if (!el) continue

          const start = REVEAL_START + i * SEGMENT
          const raw = Math.max(0, Math.min(1, (progress - start) / SEGMENT))
          const t = easeOutCubic(raw)

          // Scale lands with a whisper of overshoot; blur sharpens as the
          // card rises. Filter cleared entirely once settled so no layer
          // lingers.
          const scale = 0.96 + 0.04 * backOut(raw)
          const y = (1 - t) * 28
          const blur = raw >= 1 || mobileRef.current ? 0 : (1 - t) * 6

          const transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
          const key = `${transform}|${t.toFixed(3)}|${blur.toFixed(2)}`
          if (lastWrittenRef.current[i] !== key) {
            lastWrittenRef.current[i] = key
            el.style.transform = transform
            el.style.opacity = t.toFixed(3)
            el.style.filter = blur === 0 ? "" : `blur(${blur.toFixed(2)}px)`
          }

          // Count-up: the number rides the same eased segment
          const numEl = numRefs.current[i]
          if (numEl) {
            const shown = String(Math.round(metrics[i].num * t))
            if (numEl.textContent !== shown) numEl.textContent = shown
          }
        }

        // Ambient glow blooms with the first metric's segment
        const glow = glowRef.current
        if (glow) {
          const raw = Math.max(0, Math.min(1, (progress - REVEAL_START) / SEGMENT))
          const o = (easeOutCubic(raw) * 0.6).toFixed(3)
          if (lastGlowRef.current !== o) {
            lastGlowRef.current = o
            glow.style.opacity = o
          }
        }
      },
    }))

    return (
      <>
        <div
          ref={glowRef}
          className="scatter-metrics-glow"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />
        <dl className="scatter-metrics">
          {metrics.map(({ num, affix, lbl }, i) => (
            <div
              key={lbl}
              ref={(node) => { elRefs.current[i] = node }}
              className="scatter-metric"
              style={{ opacity: 0, transform: "translate3d(0, 28px, 0) scale(0.96)" }}
            >
              <dt className="scatter-metric-val">
                <span ref={(node) => { numRefs.current[i] = node }}>{num}</span>
                {affix}
              </dt>
              <dd className="scatter-metric-lbl">{lbl}</dd>
            </div>
          ))}
        </dl>
      </>
    )
  },
)
