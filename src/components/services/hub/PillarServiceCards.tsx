"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  Phone,
  Zap,
  MessageCircle,
  Network,
  ArrowRightLeft,
  Globe,
  MapPin,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { CSSProperties } from "react"
import { GlassServiceCard } from "@/components/cards/GlassServiceCard"

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ── Icon registry (string name -> component) ────────────────────── */

const ICON_MAP = {
  Phone,
  Zap,
  MessageCircle,
  Network,
  ArrowRightLeft,
  Globe,
  MapPin,
} as const

export type IconName = keyof typeof ICON_MAP

/* ── Types ───────────────────────────────────────────────────────── */

export type ServiceItem = {
  name: string
  outcome: string
  href: string
  iconName: IconName
  ctaText: string
}

type Props = {
  services: ServiceItem[]
  variant: "on-light" | "on-dark"
}

/* ── Blob positions — cycle per card index so each card looks unique */

const BLOB_POSITIONS: CSSProperties[] = [
  { top: -40, left: -40 },
  { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  { bottom: -40, right: -40 },
  { top: -40, right: -40 },
  { bottom: -40, left: -40 },
  { top: "30%", right: -40 },
  { bottom: "30%", left: -40 },
]

/* ── Component ───────────────────────────────────────────────────── */

export function PillarServiceCards({ services, variant }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  const cols =
    services.length >= 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2"

  return (
    <div ref={ref} className={`grid ${cols} gap-5 items-stretch`}>
      {services.map((service, i) => {
        const Icon: LucideIcon = ICON_MAP[service.iconName]
        return (
          /* motion.div: scroll entrance only. Hover is handled inside GlassServiceCard. */
          <motion.div
            key={service.href}
            className="h-full"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.08 }}
          >
            <GlassServiceCard
              icon={Icon}
              headline={service.name}
              outcome={service.outcome}
              cta={service.ctaText}
              href={service.href}
              variant={variant}
              blobStyle={BLOB_POSITIONS[i % BLOB_POSITIONS.length]}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
