"use client"

import { useRef, useImperativeHandle, forwardRef, useEffect } from "react"
import Image from "next/image"

export type ScatterIconsHandle = {
  applyProgress: (progress: number) => void
}

type IconDef = { name: string; icon: string }

const ICONS: IconDef[] = [
  { name: "HubSpot",    icon: "/Assets/icons/icons/hubspot.png" },
  { name: "Salesforce",  icon: "/Assets/icons/icons/salesforce.png" },
  { name: "Slack",       icon: "/Assets/icons/icons/slack.png" },
  { name: "Notion",      icon: "/Assets/icons/icons/notion.png" },
  { name: "Stripe",      icon: "/Assets/icons/icons/stripe.svg" },
  { name: "n8n",         icon: "/Assets/icons/icons/n8n.png" },
  { name: "Airtable",    icon: "/Assets/icons/icons/airtable.svg" },
  { name: "Make",        icon: "/Assets/icons/icons/make.png" },
  { name: "Zapier",      icon: "/Assets/icons/icons/zapier.png" },
  { name: "Shopify",     icon: "/Assets/icons/icons/shopify-icon-3.svg" },
  { name: "Gmail",       icon: "/Assets/icons/icons/gmail-icon-3.svg" },
  { name: "Monday",      icon: "/Assets/icons/icons/monday.svg" },
  { name: "Sheets",      icon: "/Assets/icons/icons/sheets.png" },
  { name: "PayPal",      icon: "/Assets/icons/icons/paypal.svg" },
  { name: "Meta",        icon: "/Assets/icons/icons/meta.svg" },
  { name: "Supabase",    icon: "/Assets/icons/icons/supabase.svg" },
  { name: "Drive",       icon: "/Assets/icons/icons/drive.png" },
  { name: "Twilio",      icon: "/Assets/icons/icons/twilio.png" },
  { name: "Mailchimp",   icon: "/Assets/icons/icons/mailchimp-icon-3.svg" },
  { name: "Telegram",    icon: "/Assets/icons/icons/telegram.svg" },
]

// Hand-curated end positions as percent of viewport from centre.
// Spread organically across the screen, leaving the central band
// clear for the metrics text.
// Order matters: mobile only shows the FIRST 15, so those are chosen
// to spread evenly (7 up / 8 down, 8 left / 7 right). The remaining
// 5 fill in the desktop layout.
const END_POSITIONS: { x: number; y: number }[] = [
  { x: -42, y: -34 }, { x: 12,  y: -40 }, { x: 44,  y: -30 }, { x: -6,  y: -36 },
  { x: -46, y: -16 }, { x: -24, y: -38 }, { x: 30,  y: -35 }, { x: -34, y: 22 },
  { x: 36,  y: 20 },  { x: -26, y: 38 },  { x: 10,  y: 39 },  { x: 45,  y: 29 },
  { x: -45, y: 14 },  { x: 18,  y: 24 },  { x: -43, y: 32 },  { x: 46,  y: -14 },
  { x: -16, y: 26 },  { x: 44,  y: 16 },  { x: -8,  y: 34 },  { x: 28,  y: 33 },
]

// Phase timeline: logos fly in from a marquee-like strip at the top
// (continuing the hero marquee's motion), stack into the pile, then
// scatter outward. Metrics reveal from 0.54 (see MetricsReveal).
const GATHER_END = 0.16
const SCATTER_START = 0.2
const SCATTER_END = 0.5
const DRIFT_AMOUNT = 0.04

type IconData = IconDef & {
  startX: number
  startY: number
  startRot: number
  gatherX: number
  gatherY: number
  gatherDelay: number
  gatherArc: number
  endX: number
  endY: number
  endRot: number
  arc: number
  delay: number
  scaleEnd: number
  opacityEnd: number
}

const total = ICONS.length

const iconData: IconData[] = ICONS.map((icon, i) => ({
  ...icon,
  // Pile: everything in one spot with deterministic jitter + rotation,
  // like a stack of dealt cards
  startX: ((i * 37) % 17) - 8,
  startY: ((i * 53) % 15) - 7,
  startRot: ((i * 29) % 21) - 10,
  // Gather: a horizontal strip just above the viewport top, echoing the
  // hero marquee the user has just scrolled past. i*7 mod 20 permutes
  // the order so neighbours don't arrive in a mechanical left-to-right
  gatherX: ((((i * 7) % total) / (total - 1)) - 0.5) * 88,
  gatherY: -58 - ((i * 11) % 3) * 4,
  // Arrival order shuffled independently of position, wider window
  gatherDelay: (((i * 13) % total) / total) * 0.08,
  // Perpendicular bend so tiles swoop into the pile instead of beaming
  gatherArc: (i % 2 === 0 ? -1 : 1) * (20 + ((i * 17) % 31)),
  endX: END_POSITIONS[i].x,
  endY: END_POSITIONS[i].y,
  // Cards straighten as they fly out
  endRot: ((i * 13) % 9) - 4,
  // Perpendicular arc offset so trajectories swoop instead of beaming
  arc: (i % 2 === 0 ? 1 : -1) * (36 + ((i * 11) % 44)),
  // Top of the pile (rendered last) deals off first
  delay: ((total - 1 - i) / total) * 0.14,
  scaleEnd: 0.82 + ((i * 3) % 3) * 0.04,
  // Outer tiles settle slightly dimmer: depth hierarchy that keeps the
  // eye on the central metrics
  opacityEnd:
    1 - 0.06 * Math.min(1, Math.hypot(END_POSITIONS[i].x, END_POSITIONS[i].y) / 55),
}))

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

// Mild settle overshoot: eases past the target then back (s controls it)
function backOut(t: number, s = 1.1): number {
  const u = t - 1
  return 1 + u * u * ((s + 1) * u + s)
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

// Mobile renders only the first N icons (hidden via CSS, skipped here)
const MOBILE_COUNT = 15
const MOBILE_BREAKPOINT = 640

export const ScatterIcons = forwardRef<ScatterIconsHandle>(
  function ScatterIcons(_, ref) {
    const elRefs = useRef<(HTMLDivElement | null)[]>([])
    const lastWrittenRef = useRef<string[]>([])
    // Cached viewport metrics. Reading window dims per frame on mobile is
    // poison: the collapsing browser toolbar changes innerHeight while
    // scrolling, so vh-based end positions drift mid-flight (jitter).
    // We cache once and refresh only when the WIDTH changes -- height-only
    // resizes are toolbar noise, width changes mean rotation/real resize.
    const viewRef = useRef({ vw: 0, vh: 0, mobile: false, width: 0 })
    // Flight geometry (end positions + bezier control points) only changes
    // with the viewport, so it's computed once per resize instead of per
    // frame per icon
    const geomRef = useRef<
      { gx: number; gy: number; gmx: number; gmy: number; ex: number; ey: number; mx: number; my: number }[]
    >([])

    useEffect(() => {
      const measure = () => {
        const vw = window.innerWidth / 100
        const vh = window.innerHeight / 100
        const mobile = window.innerWidth < MOBILE_BREAKPOINT
        viewRef.current = { vw, vh, mobile, width: window.innerWidth }

        geomRef.current = iconData.map((d) => {
          // Gather: strip position and swoop control point
          const gx = d.gatherX * vw
          const gy = d.gatherY * vh
          const gdx = d.startX - gx
          const gdy = d.startY - gy
          const glen = Math.hypot(gdx, gdy) || 1
          const gmx = (gx + d.startX) / 2 + (-gdy / glen) * d.gatherArc
          const gmy = (gy + d.startY) / 2 + (gdx / glen) * d.gatherArc

          // Scatter: end position (mobile-remapped) and arc control point
          let endXPct = d.endX
          let endYPct = d.endY
          if (mobile) {
            endXPct = Math.sign(endXPct) * (12 + (Math.abs(endXPct) - 6) * 0.7)
            endYPct = Math.sign(endYPct) * (30 + (Math.abs(endYPct) - 14) * 0.55)
          }
          const ex = endXPct * vw
          const ey = endYPct * vh
          const dx = ex - d.startX
          const dy = ey - d.startY
          const len = Math.hypot(dx, dy) || 1
          const mx = (d.startX + ex) / 2 + (-dy / len) * d.arc
          const my = (d.startY + ey) / 2 + (dx / len) * d.arc

          return { gx, gy, gmx, gmy, ex, ey, mx, my }
        })
      }
      measure()
      const onResize = () => {
        if (window.innerWidth !== viewRef.current.width) measure()
      }
      window.addEventListener("resize", onResize)
      return () => window.removeEventListener("resize", onResize)
    }, [])

    useImperativeHandle(ref, () => ({
      applyProgress(progress: number) {
        const { vw, mobile } = viewRef.current
        if (vw === 0 || geomRef.current.length === 0) return
        const limit = mobile ? MOBILE_COUNT : iconData.length
        for (let i = 0; i < limit; i++) {
          const el = elRefs.current[i]
          if (!el) continue
          const d = iconData[i]
          const geom = geomRef.current[i]

          // Gather phase: fly in from the top strip and stack into the
          // pile. Ends before SCATTER_START so the phases never overlap.
          if (progress < SCATTER_START) {
            const g = Math.max(0, Math.min(1, (progress - d.gatherDelay) / (GATHER_END - d.gatherDelay)))
            const e = easeOutCubic(g)
            const gu = 1 - e
            const x = gu * gu * geom.gx + 2 * gu * e * geom.gmx + e * e * d.startX
            const y = gu * gu * geom.gy + 2 * gu * e * geom.gmy + e * e * d.startY

            // Rotation lands with a mild overshoot: the card "settles"
            const rot = d.startRot * backOut(g)
            const scale = 0.85 + 0.15 * e
            // Fade in over the first 35% of the flight
            const opacity = Math.min(1, g / 0.35)

            const transform =
              `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`
            const key = `${transform}|${opacity.toFixed(3)}`
            if (lastWrittenRef.current[i] !== key) {
              lastWrittenRef.current[i] = key
              el.style.transform = transform
              el.style.opacity = opacity.toFixed(3)
            }
            continue
          }

          const start = SCATTER_START + d.delay
          const seg = Math.max(0, Math.min(1, (progress - start) / (SCATTER_END - start)))
          const t = easeInOutCubic(seg)

          const { ex, ey, mx, my } = geom
          const u = 1 - t
          let x = u * u * d.startX + 2 * u * t * mx + t * t * ex
          let y = u * u * d.startY + 2 * u * t * my + t * t * ey

          const driftSeg = Math.max(0, Math.min(1, (progress - SCATTER_END) / (1 - SCATTER_END)))
          const drift = 1 + smoothstep(driftSeg) * DRIFT_AMOUNT
          x *= drift
          y *= drift

          const scale = 1 + (d.scaleEnd - 1) * t
          // Mid-flight tumble: peaks halfway, zero at both ends so the
          // pile and the landing stay exactly as designed
          const tumble = Math.sign(d.arc) * 6 * Math.sin(t * Math.PI)
          const rot = d.startRot + (d.endRot - d.startRot) * t + tumble
          const opacity = 1 + (d.opacityEnd - 1) * t

          // Rounded values keep strings short (less build/parse/GC churn),
          // and identical strings are skipped entirely
          const transform =
            `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`
          const key = `${transform}|${opacity.toFixed(3)}`
          if (lastWrittenRef.current[i] !== key) {
            lastWrittenRef.current[i] = key
            el.style.transform = transform
            el.style.opacity = opacity.toFixed(3)
          }
        }
      },
    }))

    return (
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        {iconData.map((d, i) => (
          <div
            key={d.name}
            ref={(node) => { elRefs.current[i] = node }}
            className="scatter-pos"
            style={{
              zIndex: i,
              // Initial state = gather strip above the viewport, invisible,
              // so the first painted frame matches progress 0 (no flash)
              opacity: 0,
              transform: `translate(-50%, -50%) translate3d(${d.gatherX}vw, ${d.gatherY}vh, 0) rotate(0deg) scale(0.85)`,
            }}
          >
            <div
              className="scatter-icon"
              style={{
                animationDuration: `${5 + ((i * 7) % 8) * 0.45}s`,
                animationDelay: `${-((i * 13) % 10) * 0.7}s`,
                animationDirection: i % 2 === 0 ? "normal" : "reverse",
              }}
            >
              <Image
                src={d.icon}
                alt=""
                width={38}
                height={38}
                className="object-contain"
                draggable={false}
                // Decode before the section arrives: no image pop-in
                // mid-animation (each icon is only a few KB)
                loading="eager"
              />
            </div>
          </div>
        ))}
      </div>
    )
  },
)
