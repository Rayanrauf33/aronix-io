"use client"

import { useEffect, useRef } from "react"

export type CountUpStat = {
  num: number
  prefix?: string
  suffix?: string
  comma?: boolean
  lbl: string
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function fmt(n: number, comma?: boolean): string {
  const rounded = Math.round(n)
  if (comma) return rounded.toLocaleString("en-US")
  return String(rounded)
}

export function StatCountUp({ stats }: { stats: CountUpStat[] }) {
  const wrapRef = useRef<HTMLDListElement>(null)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Reset to 0 after hydration (SSR renders final values for no-JS / SEO)
    for (let i = 0; i < stats.length; i++) {
      const el = numRefs.current[i]
      if (el) el.textContent = "0"
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const duration = 1200
        let start: number | null = null

        function tick(ts: number) {
          if (start === null) start = ts
          const raw = Math.min(1, (ts - start) / duration)
          const t = easeOutCubic(raw)

          for (let i = 0; i < stats.length; i++) {
            const el = numRefs.current[i]
            if (!el) continue
            el.textContent = fmt(stats[i].num * t, stats[i].comma)
          }

          if (raw < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )

    observer.observe(wrap)
    return () => observer.disconnect()
  }, [stats])

  return (
    <dl ref={wrapRef} className="flex items-stretch gap-6 flex-col sm:flex-row">
      {stats.map(({ num, prefix, suffix, comma, lbl }, i) => (
        <div key={lbl} className="flex flex-1 items-stretch">
          <div className="flex-1 text-center py-8 px-6">
            <dt
              className="text-white"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 800,
                fontSize: "clamp(40px, 4vw, 56px)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {prefix}
              <span ref={(node) => { numRefs.current[i] = node }}>
                {fmt(num, comma)}
              </span>
              {suffix}
            </dt>
            <dd className="text-[14px] text-[var(--ax-fg-on-dark-2)] mt-2">
              {lbl}
            </dd>
          </div>
          {i < stats.length - 1 && (
            <div
              className="hidden sm:block w-px self-stretch bg-white/10"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </dl>
  )
}
