"use client"

import { useRef, useCallback, useEffect } from "react"
import { useScrollProgress } from "@/hooks/useScrollProgress"
import { ScatterIcons, type ScatterIconsHandle } from "@/components/sections/ScatterIcons"
import { MetricsReveal, type MetricsRevealHandle } from "@/components/sections/MetricsReveal"

export function ScatterMetrics() {
  const scatterRef = useRef<ScatterIconsHandle>(null)
  const metricsRef = useRef<MetricsRevealHandle>(null)

  const onProgress = useCallback((p: number) => {
    scatterRef.current?.applyProgress(p)
    metricsRef.current?.applyProgress(p)
  }, [])

  const containerRef = useScrollProgress(onProgress)

  // Pause the tiles' idle float animations while the section is off
  // screen -- they are invisible but would otherwise run forever
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      el.dataset.idle = entry.isIntersecting ? "false" : "true"
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [containerRef])

  return (
    <div ref={containerRef} className="scatter-runway" role="region" aria-label="Key metrics">
      <div className="scatter-sticky">
        <ScatterIcons ref={scatterRef} />
        <MetricsReveal ref={metricsRef} />
      </div>
    </div>
  )
}
