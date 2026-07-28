"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
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
}

// Distance beyond the card's own edge (in px) at which the glow starts
// to ramp in. Cursor inside the card is always full strength.
const PROXIMITY_PX = 140

// Per-frame easing factors (0-1). Lower = slower/smoother "catch up".
// Angle and opacity are eased independently since they settle at
// different rates feels more natural than locking them together.
const ANGLE_EASE = 0.06
const OPACITY_EASE = 0.07

function distanceToRect(px: number, py: number, rect: DOMRect): number {
  const dx = Math.max(rect.left - px, 0, px - rect.right)
  const dy = Math.max(rect.top - py, 0, py - rect.bottom)
  return Math.sqrt(dx * dx + dy * dy)
}

export function GlassServiceCard({
  label,
  icon: Icon,
  headline,
  outcome,
  cta,
  href,
  variant = "on-light",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const maybeWrap = wrapRef.current
    if (!maybeWrap) return

    // Reduced motion: the CSS is already gated on
    // (prefers-reduced-motion: no-preference), so the glow can't show
    // even if this handler ran. Skip attaching it entirely regardless.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // TypeScript does not preserve narrowing across closure boundaries.
    const el: HTMLDivElement = maybeWrap

    let targetAngle = 0
    let targetOpacity = 0
    let currentAngle = 0
    let currentOpacity = 0
    let looping = false

    // Listening on window (not the card element) is what lets the glow
    // react to the cursor while it's still outside the card, and lets
    // every card on the page track the same global cursor independently
    // -- there's no ":hover can only match one element" limitation, so
    // several nearby cards can glow at once.
    function handleMouseMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect()
      const dist = distanceToRect(e.clientX, e.clientY, rect)
      targetOpacity = Math.max(0, 1 - dist / PROXIMITY_PX)

      // Compass bearing (0deg = up, clockwise) from the card's centre
      // to the cursor -- matches conic-gradient's own `from <angle>`
      // axis. Only update the target angle while actually relevant;
      // once fully faded out there's nothing to point towards.
      if (targetOpacity > 0) {
        const dx = e.clientX - rect.left - rect.width / 2
        const dy = e.clientY - rect.top - rect.height / 2
        let angle = (Math.atan2(dx, -dy) * 180) / Math.PI
        if (angle < 0) angle += 360
        targetAngle = angle
      }

      if (!looping) {
        looping = true
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    // Eases both values toward their targets every frame instead of
    // snapping straight to them -- this is what gives the glow its
    // smooth, slightly-lagging "catching up" feel. Angle easing takes
    // the shortest way around the circle so it never spins the long
    // way past the 0/360 wrap point.
    function tick() {
      const delta = ((targetAngle - currentAngle + 540) % 360) - 180
      currentAngle += delta * ANGLE_EASE
      currentAngle = ((currentAngle % 360) + 360) % 360

      currentOpacity += (targetOpacity - currentOpacity) * OPACITY_EASE

      el.style.setProperty("--gsc-angle", `${currentAngle}deg`)
      el.style.setProperty("--gsc-glow-opacity", `${currentOpacity}`)

      const settled = currentOpacity < 0.002 && targetOpacity < 0.002
      if (settled) {
        looping = false
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={wrapRef} className="gsc-wrap">
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
