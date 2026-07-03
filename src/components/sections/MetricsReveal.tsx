"use client"

import { useRef, useImperativeHandle, forwardRef } from "react"

export type MetricsRevealHandle = {
  applyProgress: (progress: number) => void
}

const metrics = [
  { val: "40+", lbl: "Companies automated" },
  { val: "14h", lbl: "Avg hours saved per week" },
  { val: "98%", lbl: "Automation uptime" },
  { val: "3\u00d7",  lbl: "Avg team throughput gain" },
]

// Sequential reveals: each metric owns its own scroll segment, so one
// appears fully before the next begins (Mobbin-style pacing)
const REVEAL_START = 0.42
const SEGMENT = 0.12

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export const MetricsReveal = forwardRef<MetricsRevealHandle>(
  function MetricsReveal(_, ref) {
    const elRefs = useRef<(HTMLDivElement | null)[]>([])

    useImperativeHandle(ref, () => ({
      applyProgress(progress: number) {
        for (let i = 0; i < metrics.length; i++) {
          const el = elRefs.current[i]
          if (!el) continue

          const start = REVEAL_START + i * SEGMENT
          const raw = Math.max(0, Math.min(1, (progress - start) / SEGMENT))
          const t = easeOutCubic(raw)

          const scale = 0.96 + t * 0.04
          el.style.transform = `translate3d(0, ${(1 - t) * 28}px, 0) scale(${scale})`
          el.style.opacity = String(t)
        }
      },
    }))

    return (
      <dl className="scatter-metrics">
        {metrics.map(({ val, lbl }, i) => (
          <div
            key={lbl}
            ref={(node) => { elRefs.current[i] = node }}
            className="scatter-metric"
            style={{ opacity: 0, transform: "translate3d(0, 28px, 0) scale(0.96)" }}
          >
            <dt className="scatter-metric-val">{val}</dt>
            <dd className="scatter-metric-lbl">{lbl}</dd>
          </div>
        ))}
      </dl>
    )
  },
)
