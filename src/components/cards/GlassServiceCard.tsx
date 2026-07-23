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
  return (
    <div className="gsc-wrap">
      {/* Static colour blob bleeds through the frosted glass — never animates */}
      <div className="gsc-blob" aria-hidden="true" style={blobStyle} />

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

        {/* CTA */}
        <span className="gsc-cta" aria-hidden="true">
          {cta}
          <ArrowRight size={16} strokeWidth={1.75} className="gsc-cta-arrow" aria-hidden="true" />
        </span>
      </Link>
    </div>
  )
}
