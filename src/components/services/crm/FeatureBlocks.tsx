"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

type Feature = {
  sourceField: string
  destField: string
  title: string
  desc: string
}

const features: Feature[] = [
  {
    sourceField: "Form: Email",
    destField: "CRM: Contact Email",
    title: "Leads land in your CRM correctly",
    desc: "A new lead comes in through your website form and lands directly in your CRM with the right fields populated, the right pipeline stage set, and the first follow-up task created.",
  },
  {
    sourceField: "Deal: Status",
    destField: "PM: New Project",
    title: "Deal closures trigger everything",
    desc: "A deal closes and your project management tool gets the new project, your accounting software gets the invoice trigger, and your onboarding sequence fires.",
  },
  {
    sourceField: "Contact: Last Active",
    destField: "CRM: Flagged",
    title: "Quiet contacts get flagged automatically",
    desc: "A contact goes quiet for 90 days and your CRM flags it without anyone having to run a report.",
  },
]

/* ------------------------------------------------------------------ */
/*  Field mapping diagram                                               */
/* ------------------------------------------------------------------ */

function FieldMapping({ source, dest }: { source: string; dest: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      {/* Source pill */}
      <span
        className="text-[11px] px-3 py-1.5 rounded-[var(--ax-radius-sm)] border border-white/15 shrink-0"
        style={{
          fontFamily: "var(--ax-font-mono)",
          color: "var(--ax-fg-on-dark-2)",
          background: "rgba(255,255,255,0.04)",
        }}
      >
        {source}
      </span>

      {/* Connector line with arrow */}
      <div className="flex items-center flex-1 min-w-[40px]">
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
        <ArrowRight
          size={14}
          style={{ color: "rgba(255,255,255,0.3)" }}
          aria-hidden="true"
          className="shrink-0 -ml-1"
        />
      </div>

      {/* Destination pill */}
      <span
        className="text-[11px] px-3 py-1.5 rounded-[var(--ax-radius-sm)] border shrink-0"
        style={{
          fontFamily: "var(--ax-font-mono)",
          color: "var(--ax-primary)",
          borderColor: "color-mix(in srgb, var(--ax-primary) 30%, transparent)",
          background: "color-mix(in srgb, var(--ax-primary) 6%, transparent)",
        }}
      >
        {dest}
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function FeatureBlocks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16">
      {/* Left column: sticky on desktop */}
      <div className="lg:sticky lg:top-[120px] lg:self-start">
        <h3
          className="text-white mb-4"
          style={{
            fontFamily: "var(--ax-font-display)",
            fontWeight: 700,
            fontSize: "var(--ax-fs-h3)",
            lineHeight: "var(--ax-lh-snug)",
            letterSpacing: "var(--ax-tracking-tight)",
          }}
        >
          What we build
        </h3>
        <p
          className="text-[var(--ax-fs-body-lg)] leading-[1.6] m-0"
          style={{ color: "var(--ax-fg-on-dark-2)" }}
        >
          We audit the tools you use and map how information should move between
          them. Then we build the integrations that make it move automatically.
        </p>
      </div>

      {/* Right column: scrolling feature blocks */}
      <div className="flex flex-col gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: i * 0.15, duration: 0.4, ease: "easeOut" }}
            className="rounded-[var(--ax-radius-lg)] border border-white/10 p-6"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <FieldMapping source={feature.sourceField} dest={feature.destField} />
            <h4
              className="text-[18px] text-white mb-2"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 600,
              }}
            >
              {feature.title}
            </h4>
            <p
              className="text-[14px] leading-[1.7] m-0"
              style={{ color: "var(--ax-fg-on-dark-2)" }}
            >
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
