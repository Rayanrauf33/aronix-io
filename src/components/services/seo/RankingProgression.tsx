"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ */
/*  Chart geometry (SVG viewBox 0 0 1000 280)                          */
/* ------------------------------------------------------------------ */

const VBW = 1000
const VBH = 280
const PL  = 52   // left gutter for axis labels
const PR  = 24
const PT  = 22
const PB  = 40   // bottom gutter for step labels
const CW  = VBW - PL - PR   // 924
const CH  = VBH - PT - PB   // 218

/** X centre of each of the 4 evenly-spaced columns */
const SX = [0, 1, 2, 3].map((i) => PL + (CW / 4) * (i + 0.5))
// ≈ 168, 399, 631, 863

/** Y for a given rank (rank 1 near top, rank 18 near bottom) */
function ry(rank: number) {
  return PT + ((rank - 1) / 17) * CH
}

const steps = [
  {
    n: "01",
    title: "Local SEO audit",
    desc: "We look at where you currently rank, what your Google Business Profile is missing, and what your competitors are doing that you aren\u2019t. You get a report of what needs to happen and in what order.",
    rank: 18,
  },
  {
    n: "02",
    title: "Foundation fixes",
    desc: "We fix the highest-impact issues first. Google Business Profile, citation consistency, technical issues on your site. Most clients see ranking movement within a few months of consistent work at this stage.",
    rank: 9,
  },
  {
    n: "03",
    title: "Ongoing optimisation",
    desc: "Local SEO isn\u2019t a one-time fix. We manage your Google Business Profile, monitor rankings, handle review requests, and publish local content that builds relevance over time.",
    rank: 4,
  },
  {
    n: "04",
    title: "Monthly reporting",
    desc: "Every month you get a report on your rankings, Google Business Profile performance \u2014 views, calls, direction requests \u2014 and what we worked on that month.",
    rank: 1,
  },
]

const pts = steps.map((s, i) => ({ ...s, x: SX[i], y: ry(s.rank) }))

const LINE_D = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")
const AREA_D = `${LINE_D} L ${pts[3].x.toFixed(1)},${(PT + CH).toFixed(1)} L ${pts[0].x.toFixed(1)},${(PT + CH).toFixed(1)} Z`

/* Segment fractions, used to time dot reveals proportionally */
function segLen(a: typeof pts[number], b: typeof pts[number]) {
  return Math.hypot(b.x - a.x, b.y - a.y)
}
const segLengths = [segLen(pts[0], pts[1]), segLen(pts[1], pts[2]), segLen(pts[2], pts[3])]
const totalSeg  = segLengths.reduce((a, b) => a + b, 0)
/** Fraction of total path length at which each dot sits */
const dotFrac   = [0, segLengths[0], segLengths[0] + segLengths[1], totalSeg].map((v) => v / totalSeg)

const ANIM_DURATION = 1800 // ms

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function RankingProgression() {
  const pathRef    = useRef<SVGPathElement>(null)
  const areaRef    = useRef<SVGPathElement>(null)
  const wrapRef    = useRef<HTMLDivElement>(null)
  const totalRef   = useRef(0)
  const reduce     = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, amount: 0.1 })

  /* Measure path length once on mount */
  useEffect(() => {
    const p = pathRef.current
    if (!p) return
    const len = p.getTotalLength()
    totalRef.current = len
    p.style.strokeDasharray  = `${len}`
    p.style.strokeDashoffset = `${len}`
  }, [])

  /* Animate path + reveal class when in view */
  useEffect(() => {
    if (!inView) return

    if (reduce) {
      const p = pathRef.current
      if (p) p.style.strokeDashoffset = "0"
      if (areaRef.current) areaRef.current.style.opacity = "1"
      wrapRef.current?.classList.add("rp-active")
      return
    }

    /* Activate dot / area CSS animations */
    wrapRef.current?.classList.add("rp-active")

    /* rAF-driven path animation */
    const p = pathRef.current
    const total = totalRef.current
    if (!p || total === 0) return

    const start = performance.now()

    function frame(now: number) {
      const t = Math.min((now - start) / ANIM_DURATION, 1)
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      if (p) p.style.strokeDashoffset = `${total * (1 - e)}`
      if (t < 1) requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
  }, [inView, reduce])

  return (
    <>
      <style>{`
        /* ── Dot reveal ───────────────────────────────────────── */
        .rp-dot {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .rp-area {
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        ${pts.map((_, i) => `
          .rp-active .rp-dot-${i} {
            animation: rp-dot-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) ${(dotFrac[i] * ANIM_DURATION * 0.001 + 0.05).toFixed(2)}s both;
          }
        `).join("")}
        .rp-active .rp-area { opacity: 1; }

        @keyframes rp-dot-pop {
          from { opacity: 0; transform: scale(0); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* ── Rank label reveal ────────────────────────────────── */
        .rp-label {
          opacity: 0;
        }
        ${pts.map((_, i) => `
          .rp-active .rp-label-${i} {
            animation: rp-label-in 0.4s cubic-bezier(0.16,1,0.3,1) ${(dotFrac[i] * ANIM_DURATION * 0.001 + 0.25).toFixed(2)}s both;
          }
        `).join("")}
        @keyframes rp-label-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="px-5 sm:px-12 py-24"
        style={{ background: "var(--ax-surface-dark)" }}
        aria-labelledby="seo-process-heading"
      >
        <div className="max-w-[var(--ax-container)] mx-auto">

          {/* ── Heading ── */}
          <div className="mb-14 max-w-[480px]">
            <span
              className="block text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--ax-fg-on-dark-2)] mb-3"
              style={{ fontFamily: "var(--ax-font-mono)" }}
            >
              How it works
            </span>
            <h2
              id="seo-process-heading"
              className="text-[var(--ax-fg-on-dark)]"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 800,
                fontSize: "var(--ax-fs-h2)",
                lineHeight: "var(--ax-lh-snug)",
                letterSpacing: "var(--ax-tracking-tight)",
              }}
            >
              From audit to ranking.
            </h2>
          </div>

          {/* ── Desktop chart ── */}
          <div ref={wrapRef} className="hidden lg:block">

            {/* SVG chart */}
            <svg
              viewBox={`0 0 ${VBW} ${VBH}`}
              className="w-full"
              style={{ height: 260 }}
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="rp-area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EA4B71" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#EA4B71" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Horizontal gridlines */}
              {pts.map((p) => (
                <line
                  key={p.n}
                  x1={PL}
                  y1={p.y}
                  x2={VBW - PR}
                  y2={p.y}
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="0.5"
                  strokeDasharray="4 6"
                />
              ))}

              {/* Vertical guide lines from each data point to bottom */}
              {pts.map((p) => (
                <line
                  key={p.n}
                  x1={p.x}
                  y1={p.y}
                  x2={p.x}
                  y2={PT + CH}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.4"
                  strokeDasharray="3 5"
                />
              ))}

              {/* Y axis labels */}
              {pts.map((p) => (
                <text
                  key={p.n}
                  x={PL - 8}
                  y={p.y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fill="rgba(200,200,200,0.4)"
                  fontSize="9"
                  fontFamily="var(--ax-font-mono)"
                >
                  #{p.rank}
                </text>
              ))}

              {/* Area fill, animates via CSS class */}
              <path
                ref={areaRef}
                d={AREA_D}
                fill="url(#rp-area-grad)"
                className="rp-area"
              />

              {/* Animated line */}
              <path
                ref={pathRef}
                d={LINE_D}
                fill="none"
                stroke="#EA4B71"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data point outer ring */}
              {pts.map((p, i) => (
                <circle
                  key={p.n}
                  cx={p.x}
                  cy={p.y}
                  r={i === 3 ? 10 : 7}
                  fill="rgba(234,75,113,0.12)"
                  className={`rp-dot rp-dot-${i}`}
                />
              ))}

              {/* Data point inner circle */}
              {pts.map((p, i) => (
                <circle
                  key={p.n}
                  cx={p.x}
                  cy={p.y}
                  r={i === 3 ? 5 : 3.5}
                  fill={i === 3 ? "#EA4B71" : "#EA4B71"}
                  className={`rp-dot rp-dot-${i}`}
                />
              ))}

              {/* Rank improvement label above each dot */}
              {pts.map((p, i) => (
                <text
                  key={p.n}
                  x={p.x}
                  y={p.y - (i === 3 ? 16 : 13)}
                  textAnchor="middle"
                  fill={i === 3 ? "#EA4B71" : "rgba(200,200,200,0.7)"}
                  fontSize={i === 3 ? "10" : "8.5"}
                  fontFamily="var(--ax-font-mono)"
                  fontWeight={i === 3 ? "700" : "400"}
                  className={`rp-label rp-label-${i}`}
                >
                  {i === 3 ? "#1" : `#${p.rank}`}
                </text>
              ))}

              {/* Step number labels at bottom */}
              {pts.map((p) => (
                <text
                  key={p.n}
                  x={p.x}
                  y={VBH - 6}
                  textAnchor="middle"
                  fill="rgba(200,200,200,0.3)"
                  fontSize="9"
                  fontFamily="var(--ax-font-mono)"
                >
                  {p.n}
                </text>
              ))}
            </svg>

            {/* Step cards */}
            <div className="grid grid-cols-4 gap-5 mt-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={(inView || !!reduce) ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 + i * 0.08 }}
                  className="rounded-[var(--ax-radius-lg)] p-5"
                  style={{
                    background: "var(--ax-surface-dark-alt)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold mb-3"
                    style={{
                      background: "rgba(234,75,113,0.15)",
                      color: "var(--ax-primary)",
                      fontFamily: "var(--ax-font-mono)",
                    }}
                  >
                    {s.n}
                  </div>
                  <h3
                    className="text-[14px] font-semibold text-[var(--ax-fg-on-dark)] mb-2 leading-[1.4]"
                    style={{ fontFamily: "var(--ax-font-display)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-[12px] leading-[1.65] text-[var(--ax-fg-on-dark-2)] m-0">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>

          {/* ── Mobile: vertical timeline ── */}
          <div className="lg:hidden flex flex-col">
            {steps.map((s, i) => (
              <div key={s.n} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold"
                    style={{
                      background: "rgba(234,75,113,0.15)",
                      color: "var(--ax-primary)",
                      fontFamily: "var(--ax-font-mono)",
                      border: "1px solid rgba(234,75,113,0.3)",
                    }}
                  >
                    {s.n}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 mt-2" style={{ background: "rgba(255,255,255,0.08)" }} />
                  )}
                </div>
                <div className="pb-10">
                  <div
                    className="text-[10px] font-bold uppercase tracking-[0.08em] mb-2"
                    style={{ color: "var(--ax-primary)", fontFamily: "var(--ax-font-mono)" }}
                  >
                    Rank {s.rank}
                  </div>
                  <h3
                    className="text-[16px] font-semibold text-[var(--ax-fg-on-dark)] mb-2"
                    style={{ fontFamily: "var(--ax-font-display)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-[var(--ax-fg-on-dark-2)] m-0">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
