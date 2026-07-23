"use client"

import { useEffect, useRef, useState } from "react"

/* ------------------------------------------------------------------ */
/*  Station data                                                        */
/* ------------------------------------------------------------------ */

type Station = {
  label: string
  position: "above" | "below"
}

const stations: Station[] = [
  { label: "Lead arrives", position: "above" },
  { label: "Response sent\n47 seconds", position: "below" },
  { label: "Qualification\ncomplete", position: "above" },
  { label: "Calendar\nbooked", position: "below" },
  { label: "You\u2019re\nnotified", position: "above" },
]

const branchLabel = "Flagged to you\nfull thread attached"

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function RaceTrackFlow() {
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
        const duration = 2000

        function tick(now: number) {
          const elapsed = now - start
          const raw = Math.min(1, elapsed / duration)
          const t = raw < 0.5
            ? 2 * raw * raw
            : 1 - Math.pow(-2 * raw + 2, 2) / 2
          setProgress(t)
          if (raw < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const stationPositions = stations.map((_, i) => i / (stations.length - 1))

  return (
    <div ref={ref}>
      <div className="hidden md:block">
        <HorizontalTrack progress={progress} stationPositions={stationPositions} />
      </div>
      <div className="md:hidden">
        <VerticalTrack progress={progress} stationPositions={stationPositions} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Horizontal track (desktop) -- SVG-based for precise layout          */
/* ------------------------------------------------------------------ */

function HorizontalTrack({
  progress,
  stationPositions,
}: {
  progress: number
  stationPositions: number[]
}) {
  const svgWidth = 900
  const padX = 60
  const trackY = 120
  const usable = svgWidth - padX * 2
  const branchIdx = 2
  const branchX = padX + stationPositions[branchIdx] * usable

  return (
    <div className="max-w-[900px] mx-auto">
      <svg viewBox={`0 0 ${svgWidth} 280`} className="w-full h-auto" role="img" aria-label="Lead response race track">
        {/* Background track */}
        <line x1={padX} y1={trackY} x2={svgWidth - padX} y2={trackY} stroke="rgba(255,255,255,0.1)" strokeWidth="2" />

        {/* Animated fill */}
        <line
          x1={padX}
          y1={trackY}
          x2={padX + usable * progress}
          y2={trackY}
          stroke="var(--ax-primary)"
          strokeWidth="2"
        />

        {/* Travelling dot */}
        {progress > 0 && (
          <circle
            cx={padX + usable * progress}
            cy={trackY}
            r={6}
            fill="var(--ax-primary)"
            style={{ filter: "drop-shadow(0 0 6px rgba(234,75,113,0.5))" }}
          />
        )}

        {/* Stations */}
        {stations.map((s, i) => {
          const x = padX + stationPositions[i] * usable
          const reached = progress >= stationPositions[i]
          const isAbove = s.position === "above"

          return (
            <g key={s.label}>
              {/* Tick mark */}
              <line
                x1={x}
                y1={trackY - 8}
                x2={x}
                y2={trackY + 8}
                stroke={reached ? "var(--ax-primary)" : "rgba(255,255,255,0.2)"}
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Station dot */}
              <circle
                cx={x}
                cy={trackY}
                r={4}
                fill={reached ? "var(--ax-primary)" : "rgba(255,255,255,0.15)"}
              />

              {/* Label */}
              <text
                x={x}
                y={isAbove ? trackY - 24 : trackY + 28}
                textAnchor="middle"
                dominantBaseline={isAbove ? "auto" : "hanging"}
                fill="var(--ax-fg-on-dark-2)"
                fontSize="11"
                fontFamily="var(--ax-font-mono)"
                style={{ opacity: reached ? 1 : 0.3, transition: "opacity 0.3s" }}
              >
                {s.label.split("\n").map((line, li) => (
                  <tspan key={li} x={x} dy={li === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          )
        })}

        {/* Branch line from station 3 */}
        <line
          x1={branchX}
          y1={trackY + 8}
          x2={branchX + 50}
          y2={trackY + 60}
          stroke="var(--ax-warning)"
          strokeWidth="1.5"
          strokeDasharray="80"
          strokeDashoffset={progress >= stationPositions[branchIdx] ? 0 : 80}
          style={{ transition: "stroke-dashoffset 0.6s ease-out 0.3s" }}
          opacity="0.5"
        />

        {/* Branch node background */}
        <rect
          x={branchX + 10}
          y={trackY + 56}
          width="170"
          height="42"
          rx="8"
          fill="rgba(251,191,36,0.08)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          style={{
            opacity: progress >= stationPositions[branchIdx] ? 1 : 0,
            transition: "opacity 0.5s ease-out 0.5s",
            filter: "drop-shadow(0 0 12px rgba(251,191,36,0.2))",
          }}
        />

        {/* Branch node text */}
        <text
          x={branchX + 95}
          y={trackY + 72}
          textAnchor="middle"
          fill="var(--ax-warning)"
          fontSize="10"
          fontFamily="var(--ax-font-mono)"
          style={{
            opacity: progress >= stationPositions[branchIdx] ? 1 : 0,
            transition: "opacity 0.5s ease-out 0.5s",
          }}
        >
          {branchLabel.split("\n").map((line, li) => (
            <tspan key={li} x={branchX + 95} dy={li === 0 ? 0 : 13}>
              {line}
            </tspan>
          ))}
        </text>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Vertical track (mobile) -- also SVG for consistency                 */
/* ------------------------------------------------------------------ */

function VerticalTrack({
  progress,
  stationPositions,
}: {
  progress: number
  stationPositions: number[]
}) {
  const svgHeight = 400
  const padY = 20
  const trackX = 20
  const usable = svgHeight - padY * 2
  const branchIdx = 2
  const branchY = padY + stationPositions[branchIdx] * usable

  return (
    <svg viewBox={`0 0 300 ${svgHeight + 60}`} className="w-full max-w-[300px] mx-auto h-auto" role="img" aria-label="Lead response flow">
      {/* Background track */}
      <line x1={trackX} y1={padY} x2={trackX} y2={svgHeight - padY} stroke="rgba(255,255,255,0.1)" strokeWidth="2" />

      {/* Animated fill */}
      <line
        x1={trackX}
        y1={padY}
        x2={trackX}
        y2={padY + usable * progress}
        stroke="var(--ax-primary)"
        strokeWidth="2"
      />

      {/* Stations */}
      {stations.map((s, i) => {
        const y = padY + stationPositions[i] * usable
        const reached = progress >= stationPositions[i]

        return (
          <g key={s.label}>
            <circle
              cx={trackX}
              cy={y}
              r={5}
              fill={reached ? "var(--ax-primary)" : "rgba(255,255,255,0.15)"}
              style={{
                transform: reached ? "scale(1)" : "scale(0)",
                transformOrigin: `${trackX}px ${y}px`,
                transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            />
            <text
              x={trackX + 20}
              y={y}
              dominantBaseline="middle"
              fill="var(--ax-fg-on-dark-2)"
              fontSize="12"
              fontFamily="var(--ax-font-mono)"
              style={{ opacity: reached ? 1 : 0.3 }}
            >
              {s.label.split("\n").map((line, li) => (
                <tspan key={li} x={trackX + 20} dy={li === 0 ? 0 : 15}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        )
      })}

      {/* Branch */}
      <line
        x1={trackX}
        y1={branchY}
        x2={trackX + 30}
        y2={branchY + 40}
        stroke="var(--ax-warning)"
        strokeWidth="1.5"
        strokeDasharray="60"
        strokeDashoffset={progress >= stationPositions[branchIdx] ? 0 : 60}
        style={{ transition: "stroke-dashoffset 0.6s ease-out 0.3s" }}
        opacity="0.5"
      />
      <rect
        x={trackX + 20}
        y={branchY + 36}
        width="170"
        height="38"
        rx="8"
        fill="rgba(251,191,36,0.08)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
        style={{
          opacity: progress >= stationPositions[branchIdx] ? 1 : 0,
          transition: "opacity 0.5s ease-out 0.5s",
        }}
      />
      <text
        x={trackX + 105}
        y={branchY + 50}
        textAnchor="middle"
        fill="var(--ax-warning)"
        fontSize="10"
        fontFamily="var(--ax-font-mono)"
        style={{
          opacity: progress >= stationPositions[branchIdx] ? 1 : 0,
          transition: "opacity 0.5s ease-out 0.5s",
        }}
      >
        {branchLabel.split("\n").map((line, li) => (
          <tspan key={li} x={trackX + 105} dy={li === 0 ? 0 : 13}>
            {line}
          </tspan>
        ))}
      </text>
    </svg>
  )
}
