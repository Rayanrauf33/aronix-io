"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Phone, Network, Search, ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ */
/*  Data (copy verbatim from services-hub.md)                          */
/* ------------------------------------------------------------------ */

type Card = {
  icon: LucideIcon
  heading: string
  body: string
  linkText: string
  href: string
}

const cards: Card[] = [
  {
    icon: Phone,
    heading: "You\u2019re missing calls and losing leads",
    body: "Leads come in and don\u2019t get answered fast enough. Calls go to voicemail. Website visitors leave without making contact. The business exists but the front door keeps closing.",
    linkText: "Take me to Lead Capture \u0026 Response Systems",
    href: "#pillar-1",
  },
  {
    icon: Network,
    heading: "Your team is doing work that a system should do",
    body: "The same data gets entered into three different tools. The same status gets updated by hand. The same report gets pulled together every week. It works, but it\u2019s not scalable.",
    linkText: "Take me to Workflow Automation \u0026 Integrations",
    href: "#pillar-2",
  },
  {
    icon: Search,
    heading: "People can\u2019t find you or your website doesn\u2019t convert them",
    body: "You\u2019re not showing up in local search when potential customers look. Or you\u2019re getting the traffic but it\u2019s not turning into enquiries. Either way, the website isn\u2019t pulling its weight.",
    linkText: "Take me to Websites \u0026 Local SEO",
    href: "#pillar-3",
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function ProblemCards() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <>
      <style>{`
        .sh-pcard {
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.15s ease;
        }
        .sh-pcard:hover { border-color: var(--ax-primary); }
      `}</style>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.href}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
              className="sh-pcard rounded-[var(--ax-radius-xl)] p-7 flex flex-col"
              style={{ background: "var(--ax-surface-dark)" }}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-[var(--ax-radius-md)] flex items-center justify-center mb-5"
                style={{ background: "rgba(234,75,113,0.12)" }}
              >
                <Icon size={18} className="text-[var(--ax-primary)]" aria-hidden="true" />
              </div>

              {/* Heading */}
              <h3
                className="text-[16px] leading-[1.4] text-[var(--ax-fg-on-dark)] mb-3"
                style={{ fontFamily: "var(--ax-font-display)", fontWeight: 600 }}
              >
                {card.heading}
              </h3>

              {/* Body */}
              <p
                className="text-[14px] leading-[1.65] text-[var(--ax-fg-on-dark-2)] flex-1 mb-6"
              >
                {card.body}
              </p>

              {/* Link */}
              <a
                href={card.href}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
                style={{ color: "var(--ax-primary)", fontFamily: "var(--ax-font-display)" }}
              >
                {card.linkText}
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
              </a>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}
