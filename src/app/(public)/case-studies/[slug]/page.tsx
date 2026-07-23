import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Button } from "@/components/ui/Button"
import { Reveal } from "@/components/ui/Reveal"
import { CaseStudyCard } from "@/components/cards/CaseStudyCard"
import { getCaseStudyBySlug, getRelatedCaseStudies } from "@/lib/supabase/case-studies"
import { breadcrumbSchema, toJsonLd } from "@/lib/schema"

type Params = { slug: string }

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug)
  if (!cs) return { title: "Case Study" }
  return {
    title: cs.title,
    description: cs.summary,
    openGraph: {
      title: `${cs.title} | Aronix`,
      description: cs.summary,
      url: `/case-studies/${cs.slug}`,
      siteName: "Aronix",
      locale: "en_GB",
      type: "article",
      images: [{ url: `/case-studies/${cs.slug}/opengraph-image`, width: 1200, height: 630, alt: cs.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.title} | Aronix`,
      description: cs.summary,
      images: [`/case-studies/${cs.slug}/opengraph-image`],
    },
    alternates: { canonical: `/case-studies/${cs.slug}` },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug)
  if (!cs) notFound()

  const related = await getRelatedCaseStudies(cs.id, cs.industry, 2)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: cs.title },
        ])) }}
      />
      <section
        className="px-5 sm:px-12 pt-[144px] pb-14"
        style={{ background: "var(--ax-soft-blush)" }}
        aria-labelledby="case-study-heading"
      >
        <div className="max-w-[880px] mx-auto">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Case Studies", href: "/case-studies" },
            { label: cs.title },
          ]} />
          <Eyebrow className="mb-3.5">{cs.industry}</Eyebrow>
          <h1
            id="case-study-heading"
            className="text-[var(--ax-fg-1)] mb-4"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {cs.title}
          </h1>
          <p className="text-[15px] text-[var(--ax-fg-3)]">{cs.client}</p>
        </div>
      </section>

      <Reveal>
        <section className="px-5 sm:px-12 py-12" aria-label="Results">
          <dl className="max-w-[880px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 m-0">
            {cs.results.map(({ value, label }) => (
              <div
                key={label}
                className="text-center rounded-[16px] border border-[var(--ax-border)] bg-white px-6 py-8"
              >
                <dt
                  className="text-[var(--ax-fg-1)] mb-1"
                  style={{
                    fontFamily: "var(--ax-font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(32px, 3vw, 44px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {value}
                </dt>
                <dd className="m-0 text-[13px] text-[var(--ax-fg-3)]">{label}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      <Reveal>
        <section className="px-5 sm:px-12 py-10" aria-labelledby="challenge-heading">
          <div className="max-w-[720px] mx-auto">
            <h2
              id="challenge-heading"
              className="text-[var(--ax-fg-1)] mb-4"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 700,
                fontSize: "clamp(22px, 2.2vw, 28px)",
                letterSpacing: "-0.015em",
              }}
            >
              The challenge
            </h2>
            <p className="text-[16px] leading-[1.7] text-[var(--ax-fg-2)] whitespace-pre-line">
              {cs.challenge}
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="px-5 sm:px-12 py-10" aria-labelledby="solution-heading">
          <div className="max-w-[720px] mx-auto">
            <h2
              id="solution-heading"
              className="text-[var(--ax-fg-1)] mb-4"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 700,
                fontSize: "clamp(22px, 2.2vw, 28px)",
                letterSpacing: "-0.015em",
              }}
            >
              What we built
            </h2>
            <p className="text-[16px] leading-[1.7] text-[var(--ax-fg-2)] mb-8 whitespace-pre-line">
              {cs.solution}
            </p>
            <div className="flex flex-wrap gap-2">
              {cs.tools.map(({ name, icon }) => (
                <span key={name} className="glass-chip">
                  <Image
                    src={icon}
                    alt={name}
                    width={18}
                    height={18}
                    style={{ width: 18, height: 18, objectFit: "contain" }}
                  />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {cs.quote && (
        <Reveal>
          <section className="px-5 sm:px-12 py-12" aria-label="Client quote">
            <figure className="max-w-[720px] mx-auto m-0 rounded-[16px] border-l-4 border-[var(--ax-primary)] bg-[var(--ax-slate-100)] px-8 py-7">
              <blockquote
                className="m-0 text-[18px] leading-[1.6] text-[var(--ax-fg-1)]"
                style={{ fontFamily: "var(--ax-font-display)", fontWeight: 600 }}
              >
                &ldquo;{cs.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[13px] text-[var(--ax-fg-3)]">
                {cs.quote.author} &middot; {cs.quote.role}
              </figcaption>
            </figure>
          </section>
        </Reveal>
      )}

      {related.length > 0 && (
        <Reveal>
          <section
            className="px-5 sm:px-12 py-16"
            style={{ background: "var(--ax-soft-blush)" }}
            aria-labelledby="related-studies-heading"
          >
            <div className="max-w-[1280px] mx-auto">
              <div className="mb-10">
                <Eyebrow className="mb-3.5">More case studies</Eyebrow>
                <h2
                  id="related-studies-heading"
                  className="text-[var(--ax-fg-1)]"
                  style={{
                    fontFamily: "var(--ax-font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(24px, 2.5vw, 32px)",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.2,
                  }}
                >
                  See how other teams automated
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {related.map((r) => (
                  <CaseStudyCard key={r.id} caseStudy={r} />
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}

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
              Want results like these?
            </h2>
            <p className="text-[16px] leading-[1.65] text-[var(--ax-fg-2)] mb-8">
              Book a free 15-minute audit. We&apos;ll map your highest-cost
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
