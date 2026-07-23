"use client"

import { useEffect, useRef, useState } from "react"

/* ------------------------------------------------------------------ */
/*  Deliverable labels                                                  */
/* ------------------------------------------------------------------ */

const nodes = [
  "Connected to every lead source",
  "First message in 60 seconds",
  "Qualification over SMS email or WhatsApp",
  "Auto follow-up if quiet",
  "Calendar booking for qualified leads",
  "Full thread visible",
  "Monthly sequence review",
]

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function ResponseTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const start = performance.now()
        const duration = 1500

        function tick(now: number) {
          const raw = Math.min(1, (now - start) / duration)
          setProgress(raw)
          if (raw < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {/* Desktop: horizontal */}
      <div className="hidden md:block">
        <HorizontalTimeline progress={progress} />
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden">
        <VerticalTimeline progress={progress} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Horizontal (desktop)                                                */
/* ------------------------------------------------------------------ */

function wrapLabel(label: string): string[] {
  if (label.length <= 24) return [label]
  return label
    .split(" ")
    .reduce<string[][]>(
      (lines, word) => {
        const last = lines[lines.length - 1]
        if (last.join(" ").length + word.length < 20) {
          last.push(word)
        } else {
          lines.push([word])
        }
        return lines
      },
      [[]],
    )
    .map((l) => l.join(" "))
}

function HorizontalTimeline({ progress }: { progress: number }) {
  const svgWidth = 800
  const padding = 80
  const lineY = 100
  const radius = 6
  const LINE_HEIGHT = 13
  const NODE_GAP = 14
  const usable = svgWidth - padding * 2
  const gap = usable / (nodes.length - 1)

  return (
    <div className="relative max-w-[800px] mx-auto px-4">
      <svg
        viewBox={`0 0 ${svgWidth} 210`}
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* Background line */}
        <line
          x1={padding} y1={lineY}
          x2={svgWidth - padding} y2={lineY}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        />

        {/* Animated fill line */}
        <line
          x1={padding} y1={lineY}
          x2={padding + usable * progress} y2={lineY}
          stroke="var(--ax-primary)"
          strokeWidth="2"
        />

        {nodes.map((label, i) => {
          const x = padding + i * gap
          const nodeProgress = i / (nodes.length - 1)
          const reached = progress >= nodeProgress
          const isAbove = i % 2 === 0
          const lines = wrapLabel(label)

          // Anchor nearest tspan NODE_GAP away from the circle edge.
          // Above: last tspan baseline = lineY - radius - NODE_GAP
          // Below: first tspan baseline = lineY + radius + NODE_GAP
          const anchorY = isAbove
            ? lineY - radius - NODE_GAP
            : lineY + radius + NODE_GAP
          const firstY = isAbove
            ? anchorY - (lines.length - 1) * LINE_HEIGHT
            : anchorY

          return (
            <g key={i}>
              <circle
                cx={x}
                cy={lineY}
                r={radius}
                fill={reached ? "var(--ax-primary)" : "rgba(255,255,255,0.1)"}
                style={{
                  transform: `scale(${reached ? 1 : 0})`,
                  transformOrigin: `${x}px ${lineY}px`,
                  transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />

              <text
                textAnchor="middle"
                fill="var(--ax-fg-on-dark-2)"
                fontSize="10"
                fontFamily="var(--ax-font-mono)"
                style={{ opacity: reached ? 1 : 0.3 }}
              >
                {lines.map((line, li) => (
                  <tspan key={li} x={x} y={firstY + li * LINE_HEIGHT}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Vertical (mobile)                                                   */
/* ------------------------------------------------------------------ */

function VerticalTimeline({ progress }: { progress: number }) {
  return (
    <div className="relative pl-8">
      {/* Track */}
      <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-white/10" />
      <div
        className="absolute left-3 top-0 w-[2px] origin-top"
        style={{
          background: "var(--ax-primary)",
          height: `${progress * 100}%`,
        }}
      />

      {/* Nodes */}
      <div className="flex flex-col gap-8">
        {nodes.map((label, i) => {
          const nodeProgress = i / (nodes.length - 1)
          const reached = progress >= nodeProgress
          return (
            <div key={i} className="flex items-center gap-4 relative">
              <div
                className="absolute left-[-20px] w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  background: reached ? "var(--ax-primary)" : "rgba(255,255,255,0.15)",
                  transform: reached ? "scale(1)" : "scale(0)",
                  boxShadow: reached ? "0 0 8px rgba(234,75,113,0.3)" : "none",
                }}
              />
              <span
                className="text-[13px] leading-[1.4] transition-opacity duration-300"
                style={{
                  fontFamily: "var(--ax-font-mono)",
                  color: "var(--ax-fg-on-dark-2)",
                  opacity: reached ? 1 : 0.3,
                }}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
