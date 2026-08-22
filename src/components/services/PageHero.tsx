import type { ReactNode } from "react"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Button } from "@/components/ui/Button"
import { Reveal } from "@/components/ui/Reveal"

type Cta = {
  label: string
  href: string
}

type Props = {
  headingId: string
  eyebrow: string
  headline: string
  subhead: string
  statPill?: string
  primaryCta: Cta
  secondaryCta?: Cta
  visual?: ReactNode
  visualId?: string
}

export function PageHero({
  headingId,
  eyebrow,
  headline,
  subhead,
  statPill,
  primaryCta,
  secondaryCta,
  visual,
  visualId,
}: Props) {
  return (
    <Reveal>
      <section
        className="px-5 sm:px-12 pt-[144px] pb-16 lg:min-h-[100vh] flex items-center"
        style={{ background: "var(--ax-surface-dark)" }}
        aria-labelledby={headingId}
      >
        <div className="max-w-[var(--ax-container)] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Eyebrow className="mb-4 tracking-[0.06em]" tone="muted">
              {eyebrow}
            </Eyebrow>
            <h1
              id={headingId}
              className="text-[var(--ax-fg-on-dark)] mb-10"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 800,
                fontSize: "var(--hero-heading)",
                lineHeight: "var(--ax-lh-tight)",
                letterSpacing: "var(--ax-tracking-tight)",
              }}
            >
              {headline}
            </h1>
            <p
              className="text-[var(--ax-fg-on-dark-2)] mb-16"
              style={{
                fontSize: "var(--hero-subhead)",
                lineHeight: "var(--ax-lh-relaxed)",
              }}
            >
              {subhead}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href={primaryCta.href} variant="primary" size="lg">
                {primaryCta.label}
              </Button>
              {secondaryCta && (
                <Button
                  href={secondaryCta.href}
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
            {statPill && (
              <p className="mt-4 text-[13px] text-[var(--ax-fg-on-dark-2)]">
                {statPill}
              </p>
            )}
          </div>

          {visual && (
            <div id={visualId} className="hidden lg:block scroll-mt-24">
              {visual}
            </div>
          )}
        </div>
      </section>
    </Reveal>
  )
}
