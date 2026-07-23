"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Feature data                                                        */
/* ------------------------------------------------------------------ */

type Feature = {
  title: string
  desc: string
  thumb: "homepage" | "service" | "copy" | "integrations"
}

const features: Feature[] = [
  {
    title: "Homepage that routes visitors, not confuses them",
    desc: "The homepage gets the right visitor to the right service page. Clear navigation, single primary CTA, no wall of text.",
    thumb: "homepage",
  },
  {
    title: "Service pages that answer objections before they\u2019re asked",
    desc: "Every service page is structured around the questions that stop people from enquiring. Pricing, process, timeline, social proof.",
    thumb: "service",
  },
  {
    title: "Copy written before design starts",
    desc: "Every headline, section, and CTA is written and reviewed before a single colour is chosen. Structure and words work together.",
    thumb: "copy",
  },
  {
    title: "Integrations built in from day one, not bolted on",
    desc: "Chat agents, booking systems, lead capture, analytics tracking. Part of the build, not an afterthought.",
    thumb: "integrations",
  },
]

/* ------------------------------------------------------------------ */
/*  Mini thumbnails                                                     */
/* ------------------------------------------------------------------ */

function ThumbHomepage() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="h-2 w-10 rounded bg-white/20" />
        <div className="flex gap-1.5">
          <div className="h-1.5 w-6 rounded bg-white/10" />
          <div className="h-1.5 w-6 rounded bg-white/10" />
          <div className="h-3 w-8 rounded-[2px]" style={{ background: "var(--ax-primary)", opacity: 0.6 }} />
        </div>
      </div>
      <div className="h-3 w-3/4 rounded bg-white/15 mt-3" />
      <div className="h-2 w-1/2 rounded bg-white/8" />
      <div className="flex gap-2 mt-2">
        <div className="h-10 flex-1 rounded-[3px] bg-white/5 border border-white/10" />
        <div className="h-10 flex-1 rounded-[3px] bg-white/5 border border-white/10" />
        <div className="h-10 flex-1 rounded-[3px] bg-white/5 border border-white/10" />
      </div>
    </div>
  )
}

function ThumbService() {
  return (
    <div className="space-y-2">
      <div className="h-3 w-2/3 rounded bg-white/15" />
      <div className="h-1.5 w-full rounded bg-white/8" />
      <div className="h-1.5 w-[90%] rounded bg-white/8" />
      <div className="flex items-center gap-2 mt-2">
        <div className="w-3 h-3 rounded-full" style={{ background: "var(--ax-success)", opacity: 0.5 }} />
        <div className="h-1.5 w-20 rounded bg-white/10" />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ background: "var(--ax-success)", opacity: 0.5 }} />
        <div className="h-1.5 w-16 rounded bg-white/10" />
      </div>
    </div>
  )
}

function ThumbCopy() {
  return (
    <div className="space-y-1.5">
      <div className="h-2.5 w-3/4 rounded bg-white/20" />
      <div className="h-1.5 w-full rounded bg-white/8" />
      <div className="h-1.5 w-full rounded bg-white/8" />
      <div className="h-1.5 w-2/3 rounded bg-white/8" />
      <div className="h-5 w-20 rounded-[3px] mt-2" style={{ background: "var(--ax-primary)", opacity: 0.5 }} />
    </div>
  )
}

function ThumbIntegrations() {
  return (
    <div className="flex items-center gap-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 rounded-[3px] bg-white/10 border border-white/10" />
          <div className="h-1 w-5 rounded bg-white/8" />
        </div>
      ))}
      <div className="flex-1 flex items-center">
        <div className="h-px flex-1 bg-white/10" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 4px, transparent 4px, transparent 8px)" }} />
        <div className="w-4 h-4 rounded-full border border-white/15 flex items-center justify-center ml-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--ax-success)", opacity: 0.6 }} />
        </div>
      </div>
    </div>
  )
}

const thumbMap: Record<Feature["thumb"], () => React.JSX.Element> = {
  homepage: ThumbHomepage,
  service: ThumbService,
  copy: ThumbCopy,
  integrations: ThumbIntegrations,
}

/* ------------------------------------------------------------------ */
/*  Feature block                                                       */
/* ------------------------------------------------------------------ */

function FeatureBlock({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce
  const Thumb = thumbMap[feature.thumb]

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: index * 0.15, duration: 0.45, ease: "easeOut" }}
      className="flex gap-5"
    >
      {/* Thumbnail */}
      <div
        className="w-[120px] shrink-0 rounded-[var(--ax-radius-md)] border border-white/10 p-3 hidden sm:block"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        <Thumb />
      </div>

      {/* Text */}
      <div>
        <h3
          className="text-[16px] font-semibold text-[var(--ax-fg-on-dark)] mb-2"
          style={{ fontFamily: "var(--ax-font-display)" }}
        >
          {feature.title}
        </h3>
        <p className="text-[14px] leading-[1.6] text-[var(--ax-fg-on-dark-2)] m-0">
          {feature.desc}
        </p>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export function WebFeatureReveal() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Left: sticky heading */}
      <div className="lg:sticky lg:top-[120px] lg:self-start">
        <h2
          className="text-[var(--ax-fg-on-dark)] mb-5"
          style={{
            fontFamily: "var(--ax-font-display)",
            fontWeight: 700,
            fontSize: "var(--ax-fs-h2)",
            lineHeight: "var(--ax-lh-snug)",
            letterSpacing: "var(--ax-tracking-tight)",
          }}
        >
          What we build
        </h2>
        <p className="text-[var(--ax-fs-body-lg)] leading-[1.7] text-[var(--ax-fg-on-dark-2)]">
          We build conversion-focused websites on Next.js. Fast, clean,
          and structured around the decisions your customers make before
          they contact you.
        </p>
      </div>

      {/* Right: scrolling features */}
      <div className="flex flex-col gap-10">
        {features.map((f, i) => (
          <FeatureBlock key={f.title} feature={f} index={i} />
        ))}
      </div>
    </div>
  )
}
