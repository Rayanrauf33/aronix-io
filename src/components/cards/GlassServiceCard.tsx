"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { CSSProperties } from "react"
import "./GlassServiceCard.css"

type Props = {
  /** Service name shown as small grey uppercase label. Optional — omit for hub cards where name doubles as headline. */
  label?: string
  icon: LucideIcon
  headline: string
  outcome: string
  cta: string
  href: string
  /** "on-light" (default) for sections with a light background; "on-dark" for dark sections. */
  variant?: "on-light" | "on-dark"
  /** Position of the static pink blob behind the card. Default: top-left. */
  blobStyle?: CSSProperties
}

export function GlassServiceCard({
  label,
  icon: Icon,
  headline,
  outcome,
  cta,
  href,
  variant = "on-light",
  blobStyle = { top: -40, left: -40 },
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const maybeWrap = wrapRef.current
    if (!maybeWrap) return

    // Skip all JS-driven interaction for users who prefer reduced motion.
    // CSS still suppresses the glow (display: none) and removes all
    // transitions, leaving only an instant border-color change on hover.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // TypeScript does not preserve narrowing across closure boundaries.
    // Re-assign to a typed const so all inner functions inherit HTMLDivElement.
    const el: HTMLDivElement = maybeWrap

    let rafPending = false
    let pendingX = 0
    let pendingY = 0

    // mousemove: capture position synchronously, flush to CSS custom
    // properties inside a single requestAnimationFrame.
    // This means at most one DOM write per frame — no React state touched,
    // no component re-renders triggered.
    function handleMouseMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect()
      pendingX = e.clientX - rect.left
      pendingY = e.clientY - rect.top
      if (!rafPending) {
        rafPending = true
        rafRef.current = requestAnimationFrame(() => {
          el.style.setProperty("--mouse-x", `${pendingX}px`)
          el.style.setProperty("--mouse-y", `${pendingY}px`)
          rafPending = false
        })
      }
    }

    // mouseenter/leave: toggle the class that fades the spotlight in/out.
    // CSS transition on .gsc-glow handles the 0.2s opacity fade.
    function handleMouseEnter() {
      el.classList.add("gsc-wrap--hovering")
    }

    function handleMouseLeave() {
      el.classList.remove("gsc-wrap--hovering")
    }

    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseenter", handleMouseEnter)
    el.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseenter", handleMouseEnter)
      el.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={wrapRef} className="gsc-wrap">
      {/* Static colour blob bleeds through the frosted glass — never animates */}
      <div className="gsc-blob" aria-hidden="true" style={blobStyle} />

      {/* Cursor-tracked spotlight glow — sibling of .gsc-inner so it sits
          above the card in z-order without interfering with the card's own
          stacking context. pointer-events: none lets all clicks through.
          --mouse-x / --mouse-y written imperatively via style.setProperty
          inside the RAF handler above — zero React re-renders on mousemove.
          Opacity driven by .gsc-wrap--hovering toggled via classList. */}
      <div className="gsc-glow" aria-hidden="true" />

      <Link href={href} className={`gsc-inner gsc-inner--${variant}`}>
        {/* Icon */}
        <span className="gsc-icon" aria-hidden="true">
          <Icon size={22} strokeWidth={1.75} />
        </span>

        {/* Category label — rendered only when provided */}
        {label && <span className="gsc-label">{label}</span>}

        {/* Headline */}
        <h3 className="gsc-headline">{headline}</h3>

        {/* Outcome — grows to push CTA to the card bottom */}
        <p className="gsc-outcome">{outcome}</p>

        {/* CTA — text and arrow are separate elements so they can receive
            independent transition-delay values for the stagger effect */}
        <span className="gsc-cta" aria-hidden="true">
          <span className="gsc-cta-text">{cta}</span>
          <ArrowRight size={16} strokeWidth={1.75} className="gsc-cta-arrow" aria-hidden="true" />
        </span>
      </Link>
    </div>
  )
}
