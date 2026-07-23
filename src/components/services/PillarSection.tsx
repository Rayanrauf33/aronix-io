import { Eyebrow } from "@/components/ui/Eyebrow"
import { Button } from "@/components/ui/Button"
import { ServiceCard } from "@/components/services/ServiceCard"
import type { LucideIcon } from "lucide-react"

type CardData = {
  icon: LucideIcon
  name: string
  outcome: string
  href: string
}

type Props = {
  eyebrow?: string
  heading: string
  intro: string
  cards: CardData[]
  proof: string
  ctaLabel: string
  ctaHref: string
}

export function PillarSection({
  eyebrow,
  heading,
  intro,
  cards,
  proof,
  ctaLabel,
  ctaHref,
}: Props) {
  const headingId = heading.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

  return (
    <section className="px-5 sm:px-12 py-20" aria-labelledby={headingId}>
      <div className="max-w-[var(--ax-container)] mx-auto">
        <div className="max-w-[620px] mb-12">
          {eyebrow && <Eyebrow className="mb-3.5">{eyebrow}</Eyebrow>}
          <h2
            id={headingId}
            className="mb-4 text-[var(--ax-fg-1)]"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 700,
              fontSize: "var(--ax-fs-h2)",
              lineHeight: "var(--ax-lh-snug)",
              letterSpacing: "var(--ax-tracking-tight)",
            }}
          >
            {heading}
          </h2>
          <p className="m-0 text-[var(--ax-fs-body-lg)] leading-[1.6] text-[var(--ax-fg-2)]">
            {intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <ServiceCard key={card.href} {...card} />
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <p
            className="m-0 text-[14px] text-[var(--ax-fg-3)]"
            style={{ fontFamily: "var(--ax-font-mono)" }}
          >
            {proof}
          </p>
          <Button href={ctaHref} variant="outline" size="md" trailingArrow>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
