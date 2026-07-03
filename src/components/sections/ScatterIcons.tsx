"use client"

import { useRef, useImperativeHandle, forwardRef } from "react"
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
const END_POSITIONS: { x: number; y: number }[] = [
  { x: -42, y: -34 }, { x: -24, y: -38 }, { x: -6,  y: -36 }, { x: 12,  y: -40 },
  { x: 30,  y: -35 }, { x: 44,  y: -30 }, { x: -46, y: -16 }, { x: 46,  y: -14 },
  { x: -34, y: 22 },  { x: 36,  y: 20 },  { x: -16, y: 26 },  { x: 18,  y: 24 },
  { x: -45, y: 14 },  { x: 44,  y: 16 },  { x: -43, y: 32 },  { x: -26, y: 38 },
  { x: -8,  y: 34 },  { x: 10,  y: 39 },  { x: 28,  y: 33 },  { x: 45,  y: 29 },
]

// Scatter completes before the first metric segment begins at 0.42
const SCATTER_START = 0.02
const SCATTER_END = 0.42
const DRIFT_AMOUNT = 0.04

type IconData = IconDef & {
  startX: number
  startY: number
  startRot: number
  endX: number
  endY: number
  endRot: number
  arc: number
  delay: number
  scaleEnd: number
}

const total = ICONS.length

const iconData: IconData[] = ICONS.map((icon, i) => ({
  ...icon,
  // Pile: everything in one spot with deterministic jitter + rotation,
  // like a stack of dealt cards
  startX: ((i * 37) % 17) - 8,
  startY: ((i * 53) % 15) - 7,
  startRot: ((i * 29) % 21) - 10,
  endX: END_POSITIONS[i].x,
  endY: END_POSITIONS[i].y,
  // Cards straighten as they fly out
  endRot: ((i * 13) % 9) - 4,
  // Perpendicular arc offset so trajectories swoop instead of beaming
  arc: (i % 2 === 0 ? 1 : -1) * (36 + ((i * 11) % 44)),
  // Top of the pile (rendered last) deals off first
  delay: ((total - 1 - i) / total) * 0.14,
  scaleEnd: 0.82 + ((i * 3) % 3) * 0.04,
}))

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

export const ScatterIcons = forwardRef<ScatterIconsHandle>(
  function ScatterIcons(_, ref) {
    const elRefs = useRef<(HTMLDivElement | null)[]>([])

    useImperativeHandle(ref, () => ({
      applyProgress(progress: number) {
        const vw = window.innerWidth / 100
        const vh = window.innerHeight / 100
        const mobile = window.innerWidth < 640
        for (let i = 0; i < iconData.length; i++) {
          const el = elRefs.current[i]
          if (!el) continue
          const d = iconData[i]

          const start = SCATTER_START + d.delay
          const seg = Math.max(0, Math.min(1, (progress - start) / (SCATTER_END - start)))
          const t = easeInOutCubic(seg)

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

          const u = 1 - t
          let x = u * u * d.startX + 2 * u * t * mx + t * t * ex
          let y = u * u * d.startY + 2 * u * t * my + t * t * ey

          const driftSeg = Math.max(0, Math.min(1, (progress - SCATTER_END) / (1 - SCATTER_END)))
          const drift = 1 + smoothstep(driftSeg) * DRIFT_AMOUNT
          x *= drift
          y *= drift

          const scale = 1 + (d.scaleEnd - 1) * t
          const rot = d.startRot + (d.endRot - d.startRot) * t

          el.style.transform =
            `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`
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
              transform: `translate(-50%, -50%) translate3d(${d.startX}px, ${d.startY}px, 0) rotate(${d.startRot}deg)`,
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
              />
            </div>
          </div>
        ))}
      </div>
    )
  },
)
