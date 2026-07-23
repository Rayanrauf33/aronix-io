"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  Phone,
  Zap,
  MessageCircle,
  Network,
  ArrowRightLeft,
  Globe,
  MapPin,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ */
/*  Icon registry (string name → component, stays client-side)        */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PillarServiceCards({ services, variant }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  /*
   * "on-dark" = card sits inside a dark section  →  white card
   * "on-light" = card sits inside a light section →  dark card
   * Inverted against the section for contrast.
   */
  const isWhiteCard = variant === "on-dark"

  const cols =
    services.length >= 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2"

  return (
    <>
      <style>{`
        /* Card hover: lift + border. CSS-only, no JS. */
        .sh-sc {
          transition:
            transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.25s ease;
        }
        .sh-sc--white {
          border: 1px solid var(--ax-border);
          background: var(--ax-surface);
        }
        .sh-sc--dark {
          border: 1px solid rgba(255,255,255,0.1);
          background: var(--ax-surface-dark);
        }
        .sh-sc:hover {
          transform: translateY(-4px);
          border-color: var(--ax-primary);
        }
      `}</style>

      <div ref={ref} className={`grid ${cols} gap-4 items-stretch`}>
        {services.map((service, i) => {
          const Icon: LucideIcon = ICON_MAP[service.iconName]
          const cardCls = isWhiteCard ? "sh-sc sh-sc--white" : "sh-sc sh-sc--dark"
          return (
            /* motion.div: scroll entrance only, opacity + translateY.
               Hover lives on the inner div so there is no Framer/CSS conflict. */
            <motion.div
              key={service.href}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.08 }}
              className="h-full"
            >
              <div
                className={`${cardCls} h-full flex flex-col rounded-[var(--ax-radius-xl)] p-8`}
              >
                {/* Icon container, 40 x 40, pink wash */}
                <div
                  className="w-10 h-10 rounded-[var(--ax-radius-md)] flex items-center justify-center mb-5 shrink-0"
                  style={{
                    background: isWhiteCard
                      ? "rgba(234,75,113,0.1)"
                      : "rgba(234,75,113,0.15)",
                  }}
                >
                  <Icon
                    size={18}
                    className="text-[var(--ax-primary)]"
                    aria-hidden="true"
                  />
                </div>

                {/* Service name */}
                <h3
                  className="text-[16px] font-semibold mb-2 leading-[1.3]"
                  style={{
                    fontFamily: "var(--ax-font-display)",
                    color: isWhiteCard ? "var(--ax-fg-1)" : "var(--ax-fg-on-dark)",
                  }}
                >
                  {service.name}
                </h3>

                {/* Outcome line, grows to push CTA down */}
                <p
                  className="text-[13px] leading-[1.65] flex-1 mb-5 m-0"
                  style={{
                    color: isWhiteCard
                      ? "var(--ax-fg-3)"
                      : "var(--ax-fg-on-dark-2)",
                  }}
                >
                  {service.outcome}
                </p>

                {/* Specific CTA */}
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold"
                  style={{
                    color: isWhiteCard ? "var(--ax-primary-dark)" : "var(--ax-primary)",
                    fontFamily: "var(--ax-font-display)",
                  }}
                >
                  {service.ctaText}
                  <ArrowRight size={12} strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}
