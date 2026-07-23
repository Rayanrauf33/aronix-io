"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Phone, Network, Globe, ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Eyebrow } from "@/components/ui/Eyebrow"
import "./ServicesGrid.css"

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

type Card = {
  label: string
  icon: LucideIcon
  headline: string
  outcome: string
  cta: string
  href: string
  blobStyle: React.CSSProperties
}

const CARDS: Card[] = [
  {
    label: "AI Voice Agents",
    icon: Phone,
    headline: "Every call answered. Every job booked.",
    outcome:
      "An AI receptionist that picks up in two rings, answers questions about your business, and books the appointment straight into your calendar.",
    cta: "Hear it take a call",
    href: "/services/ai-voice-agents",
    blobStyle: { top: -40, left: -40 },
  },
  {
    label: "Workflow Automation",
    icon: Network,
    headline: "Less admin. Same output.",
    outcome:
      "Every business has tasks that happen the same way, every time, with a human in the middle for no good reason. We find those tasks and automate them.",
    cta: "See what we automate",
    href: "/services/workflow-automation",
    blobStyle: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  },
  {
    label: "Websites",
    icon: Globe,
    headline: "A website that actually brings in business.",
    outcome:
      "Most service business websites look fine and do very little. We build websites designed around a single outcome: getting a qualified visitor to take action.",
    cta: "See how we build",
    href: "/services/websites",
    blobStyle: { bottom: -40, right: -40 },
  },
]

export function ServicesGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()

  return (
    <section
      className="px-5 sm:px-12 py-24"
      aria-labelledby="services-heading"
      style={{ background: "linear-gradient(180deg, var(--ax-slate-100) 0%, var(--ax-soft-blush) 100%)" }}
    >
      <div className="max-w-[1280px] mx-auto">

        {/* Heading */}
        <div className="mb-14 max-w-[560px]">
          <Eyebrow className="mb-3.5">What we build</Eyebrow>
          <h2
            id="services-heading"
            className="text-[var(--ax-fg-1)] mb-3"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px, 3.5vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Pick the problem you&apos;re working on.
          </h2>
          <p className="text-[18px] leading-[1.6] text-[var(--ax-fg-2)] m-0">
            Three of the systems we build most often.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch"
        >
          {CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.label}
                className="sg-card"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={(inView || !!reduce) ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.08 }}
              >
                {/* Static pink blob — sits behind the glass surface */}
                <div
                  className="sg-blob"
                  aria-hidden="true"
                  style={card.blobStyle}
                />

                {/* Glass card surface */}
                <Link href={card.href} className="sg-card-inner group">
                  {/* Icon */}
                  <span
                    className="w-11 h-11 rounded-[var(--ax-radius-md)] inline-flex items-center justify-center mb-3 shrink-0"
                    style={{ background: "var(--ax-pink-50)", color: "var(--ax-primary)" }}
                    aria-hidden="true"
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </span>

                  {/* Category label */}
                  <span
                    className="text-[11px] font-medium uppercase mb-2 block"
                    style={{
                      fontFamily: "var(--ax-font-mono)",
                      letterSpacing: "0.1em",
                      color: "var(--ax-fg-2)",
                    }}
                  >
                    {card.label}
                  </span>

                  {/* Headline */}
                  <h3
                    className="text-[var(--ax-fg-1)] mt-0 mb-3"
                    style={{
                      fontFamily: "var(--ax-font-display)",
                      fontWeight: 600,
                      fontSize: "22px",
                      lineHeight: 1.25,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {card.headline}
                  </h3>

                  {/* Outcome — grows to push CTA to bottom */}
                  <p
                    className="text-[15px] leading-[1.65] m-0 grow"
                    style={{ color: "var(--ax-fg-2)" }}
                  >
                    {card.outcome}
                  </p>

                  {/* CTA */}
                  <span
                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold mt-6 shrink-0"
                    style={{ color: "var(--ax-primary)" }}
                  >
                    {card.cta}
                    <ArrowRight
                      size={16}
                      strokeWidth={1.75}
                      className="transition-transform duration-150 ease-out group-hover:translate-x-[3px]"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* View all services */}
        <div className="text-center mt-10">
          <Button href="/services" variant="outline" size="md" trailingArrow>
            View all services
          </Button>
        </div>

      </div>
    </section>
  )
}
