import type { Metadata } from "next"
import { Reveal } from "@/components/ui/Reveal"
import { FAQAccordion } from "@/components/services/FAQAccordion"
import { ServiceCTA } from "@/components/services/ServiceCTA"
import { LocalPackHero } from "@/components/services/seo/LocalPackHero"
import { VisibilityGap } from "@/components/services/seo/VisibilityGap"
import { WorkStack } from "@/components/services/seo/WorkStack"
import { RankingProgression } from "@/components/services/seo/RankingProgression"
import { IncludedColumns } from "@/components/services/seo/IncludedColumns"
import { IndustrySearchCards } from "@/components/services/seo/IndustrySearchCards"
import { breadcrumbSchema, faqSchema, serviceSchema, toJsonLd } from "@/lib/schema"

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Local SEO for Service Businesses",
  description:
    "Get found by customers searching for your services in your area. We handle Google Business Profile, local citations, and on-page SEO so you rank where it matters.",
  openGraph: {
    title: "Local SEO for Service Businesses | Aronix",
    description:
      "Get found by customers searching for your services in your area. We handle Google Business Profile, local citations, and on-page SEO so you rank where it matters.",
    url: "/services/local-seo",
    siteName: "Aronix",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Local SEO for Service Businesses | Aronix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Local SEO for Service Businesses | Aronix",
    description: "Get found by customers searching for your services in your area. We handle Google Business Profile, local citations, and on-page SEO so you rank where it matters.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/services/local-seo" },
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { val: "46%", lbl: "Of all Google searches have local intent" },
  { val: "76%", lbl: "Of people who search locally on their phone visit a business within 24 hours" },
  { val: "28%", lbl: "Of local searches result in a purchase" },
  { val: "3", lbl: "Spots in the local pack that capture the majority of clicks" },
]

const faqItems = [
  {
    question: "How long until I see results?",
    answer:
      "The foundation fixes, including Google Business Profile, citations, and technical issues, typically show ranking improvement within a few weeks. Moving into the top three of the local pack takes longer in competitive markets, typically a few months of consistent work. We\u2019ll give you a realistic expectation for your specific market during the audit.",
  },
  {
    question: "We\u2019ve tried SEO before and it didn\u2019t work. Why would this be different?",
    answer:
      "The most common reason local SEO doesn\u2019t work is that the work stops too early or the wrong things are prioritised. A one-off set of changes doesn\u2019t maintain rankings, because Google\u2019s algorithm updates regularly, competitors keep working, and reviews keep accumulating. We do this as an ongoing engagement for exactly that reason.",
  },
  {
    question: "Do we need to be on social media for this to work?",
    answer:
      "No. Local SEO is specifically about Google Search and Google Maps. Social media presence can support it but isn\u2019t required. We focus on what drives calls from local search intent.",
  },
  {
    question: "Can you help with Google Ads as well?",
    answer:
      "Local SEO and Google Ads serve different purposes. Local SEO builds organic visibility over time. Ads get you to the top immediately but stop the moment you stop paying. Many businesses use both. If you\u2019re asking whether we manage Google Ads campaigns, ask us on the call and we\u2019ll point you in the right direction.",
  },
  {
    question: "What if we have multiple locations?",
    answer:
      "Multi-location local SEO is more complex but follows the same principles. Each location needs its own Google Business Profile, its own location page on the website, and its own citation consistency. We scope multi-location work separately.",
  },
  {
    question: "How do we get more Google reviews?",
    answer:
      "We set up a review generation system, usually a simple automated sequence that goes out to customers after a job is complete, with a direct link to leave a review. Most businesses that implement this see their review count double within a couple of months. We manage this as part of the monthly service.",
  },
]

const faqSchemaItems = faqItems.map((f) => ({
  label: f.question,
  content: f.answer,
}))

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LocalSEOPage() {
  return (
    <>
      {/* ── Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Local SEO" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema(faqSchemaItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(serviceSchema({
          name: "Local SEO",
          description: "Get found by customers searching for your services in your area. We handle Google Business Profile, local citations, and on-page SEO so you rank where it matters.",
          url: "/services/local-seo",
        })) }}
      />

      {/* ── Hero ── */}
      <LocalPackHero />

      {/* ── Stats band ── */}
      <section
        aria-label="Local SEO statistics"
        className="px-5 sm:px-12 py-16"
        style={{ background: "var(--ax-surface-dark)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[var(--ax-container)] mx-auto">
          <dl className="flex items-stretch gap-0 flex-col sm:flex-row">
            {stats.map(({ val, lbl }, i) => (
              <div key={lbl} className="flex flex-1 items-stretch">
                <div className="flex-1 text-center py-8 px-6">
                  <dt
                    className="text-white"
                    style={{
                      fontFamily: "var(--ax-font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(40px, 4vw, 56px)",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {val}
                  </dt>
                  <dd className="text-[14px] text-[var(--ax-fg-on-dark-2)] mt-2">
                    {lbl}
                  </dd>
                </div>
                {i < stats.length - 1 && (
                  <div
                    className="hidden sm:block w-px self-stretch"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Problem visualisation + copy ── */}
      <VisibilityGap />

      {/* ── What we work on ── */}
      <WorkStack />

      {/* ── What this isn't ── */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="seo-not-heading">
          <div className="max-w-[620px] mx-auto">
            <span
              className="block text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--ax-primary-dark)] mb-4"
              style={{ fontFamily: "var(--ax-font-mono)" }}
            >
              What this isn&apos;t
            </span>
            <h2 id="seo-not-heading" className="sr-only">
              What this isn&apos;t
            </h2>
            <div
              className="text-[var(--ax-fg-2)] flex flex-col gap-5"
              style={{ fontSize: "var(--ax-fs-body-lg)", lineHeight: "1.7" }}
            >
              <p className="m-0">
                We don&apos;t promise specific ranking positions or timelines,
                because nobody can guarantee those accurately. Google&apos;s
                algorithm has hundreds of inputs and changes regularly. What we
                can tell you is what the work is, why it matters, and what
                improvement in visibility typically looks like when it&apos;s
                done properly.
              </p>
              <p className="m-0">
                We also don&apos;t do content farms: publishing low-quality
                blog posts or location pages stuffed with keywords. That approach
                worked in 2015. It gets penalised now. The content we produce is
                written to be useful to an actual person searching for your
                service.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── How it works: ranking progression ── */}
      <RankingProgression />

      {/* ── What's included ── */}
      <IncludedColumns />

      {/* ── Who it's for: industry search cards ── */}
      <IndustrySearchCards />

      {/* ── Pricing signal ── */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="seo-pricing-heading">
          <div className="max-w-[620px] mx-auto">
            <span
              className="block text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--ax-primary-dark)] mb-4"
              style={{ fontFamily: "var(--ax-font-mono)" }}
            >
              What it costs
            </span>
            <h2 id="seo-pricing-heading" className="sr-only">
              What it costs
            </h2>
            <div
              className="text-[var(--ax-fg-2)] flex flex-col gap-5"
              style={{ fontSize: "var(--ax-fs-body-lg)", lineHeight: "1.7" }}
            >
              <p className="m-0">
                Local SEO is a monthly service because rankings are maintained,
                not achieved once. Pricing depends on scope. You&apos;ll get a
                fixed quote on the audit call, before any work starts.
              </p>
              <p className="m-0">
                The audit call is where we check whether you have realistic
                ranking opportunities in your market. Some local markets are more
                competitive than others, and we&apos;ll tell you honestly what to
                expect before you commit.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── FAQ ── */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="seo-faq-heading">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-14">
              <span
                className="block text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--ax-primary-dark)] mb-3"
                style={{ fontFamily: "var(--ax-font-mono)" }}
              >
                Common questions
              </span>
              <h2
                id="seo-faq-heading"
                className="text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Frequently asked questions
              </h2>
            </div>
            <FAQAccordion items={faqItems} defaultOpen={0} />
          </div>
        </section>
      </Reveal>

      {/* ── Final CTA ── */}
      <Reveal>
        <ServiceCTA
          headline="Find out where you're ranking and what it would take to rank higher."
          sub="Book a 15-minute call. We\u2019ll look at your current local search visibility and give you an honest picture of what\u2019s fixable and how long it would take."
          buttonLabel="Book an Audit"
        />
      </Reveal>
    </>
  )
}
