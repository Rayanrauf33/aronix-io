import type { Metadata } from "next"
import { CaseStudiesHero } from "@/components/sections/CaseStudiesHero"
import { CaseStudyCard } from "@/components/cards/CaseStudyCard"
import { Button } from "@/components/ui/Button"
import { Reveal } from "@/components/ui/Reveal"
import { caseStudies } from "@/lib/case-studies"

export const metadata: Metadata = {
  title: "Case Studies | Aronix",
  description:
    "Real automation results: lead response in 60 seconds, month-end close in 6 hours, onboarding with zero manual steps. See how growing teams automate with Aronix.",
  openGraph: {
    title: "Case Studies | Aronix",
    description:
      "Real workflows, measured results. See how growing teams automate with Aronix.",
    url: "https://aronix.io/case-studies",
    siteName: "Aronix",
    type: "website",
  },
  alternates: { canonical: "https://aronix.io/case-studies" },
}

export default function CaseStudiesPage() {
  return (
    <>
      <Reveal>
        <CaseStudiesHero />
      </Reveal>

      <section className="px-5 sm:px-12 py-16" aria-label="Case studies">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((cs) => (
              <Reveal key={cs.slug}>
                <CaseStudyCard caseStudy={cs} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reveal>
        <section
          className="px-5 sm:px-12 py-20 text-center"
          aria-label="Book an audit"
        >
          <div className="max-w-[560px] mx-auto">
            <h2
              className="text-[var(--ax-fg-1)] mb-4"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 700,
                fontSize: "clamp(26px, 2.6vw, 34px)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              Your process could be the next case study
            </h2>
            <p className="text-[16px] leading-[1.65] text-[var(--ax-fg-2)] mb-8">
              Book a free 45-minute audit. We&apos;ll map your highest-cost
              manual process and outline a realistic automation plan.
            </p>
            <Button href="/contact" variant="primary" size="lg" trailingArrow>
              Book your free audit
            </Button>
          </div>
        </section>
      </Reveal>
    </>
  )
}
