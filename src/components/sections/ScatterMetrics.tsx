"use client"

import { useRef, useCallback } from "react"
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

  return (
    <div ref={containerRef} className="scatter-runway" role="region" aria-label="Key metrics">
      <div className="scatter-sticky">
        <ScatterIcons ref={scatterRef} />
        <MetricsReveal ref={metricsRef} />
      </div>
    </div>
  )
}
