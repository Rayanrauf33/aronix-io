import type { Metadata } from "next"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Button } from "@/components/ui/Button"
import { Reveal } from "@/components/ui/Reveal"
import { FAQAccordion } from "@/components/services/FAQAccordion"
import { ServiceCTA } from "@/components/services/ServiceCTA"
import { SplitHero } from "@/components/services/web/SplitHero"
import { AnnotatedMockup } from "@/components/services/web/AnnotatedMockup"
import { WebFeatureReveal } from "@/components/services/web/WebFeatureReveal"
import { ContrastColumns } from "@/components/services/web/ContrastColumns"
import { MagazineSteps } from "@/components/services/web/MagazineSteps"
import { IncludedGrid } from "@/components/services/web/IncludedGrid"
import { WebIndustryCards } from "@/components/services/web/WebIndustryCards"
import { ScopeCalculator } from "@/components/services/web/ScopeCalculator"
import { breadcrumbSchema, faqSchema, serviceSchema, toJsonLd } from "@/lib/schema"

/* ------------------------------------------------------------------ */
/*  Metadata (verbatim from copy doc)                                  */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Conversion-Focused Websites for Service Businesses",
  description:
    "We build websites that turn visitors into enquiries. Fast, clear, and built around how your customers actually decide to make contact.",
  openGraph: {
    title: "Conversion-Focused Websites for Service Businesses | Aronix",
    description:
      "We build websites that turn visitors into enquiries. Fast, clear, and built around how your customers actually decide to make contact.",
    url: "/services/websites",
    siteName: "Aronix",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Conversion-Focused Websites | Aronix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conversion-Focused Websites for Service Businesses | Aronix",
    description: "We build websites that turn visitors into enquiries. Fast, clear, and built around how your customers actually decide to make contact.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/services/websites" },
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CALENDLY =
  "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"

const stats = [
  { val: "1-3%", lbl: "Average conversion rate for a service business website" },
  { val: "2.5s", lbl: "Time most visitors decide whether to stay or leave" },
  { val: "88%", lbl: "Of visitors who have a bad experience won\u2019t return to the website" },
  { val: "5x", lbl: "Higher conversion rate for landing pages with a single clear call to action" },
]

const faqItems = [
  {
    question: "Do you work with businesses that already have a website?",
    answer:
      "Yes. If your current website has a solid structure but conversion problems, we can audit and improve it rather than rebuild from scratch. We\u2019ll tell you which approach makes more sense after looking at your current site and traffic data.",
  },
  {
    question: "We\u2019ve had websites built before and they didn\u2019t perform. Why would this be different?",
    answer:
      "The most common reason websites don\u2019t perform is that they\u2019re built around what the business wants to say rather than what the customer needs to hear to make contact. We start with your customer\u2019s perspective and build backwards from there. That\u2019s a different process from most web builds.",
  },
  {
    question: "Do you write the copy or do we?",
    answer:
      "We write or edit the copy as part of the build. You provide the information about your services, your customers, and what makes you different. We turn it into page copy that converts. You review and approve everything before it goes live.",
  },
  {
    question: "What platform do you build on?",
    answer:
      "Next.js. It\u2019s fast, it ranks well, and it gives you a solid technical foundation for everything that gets added later: SEO, automation integrations, dynamic content. We don\u2019t build on Wix, Squarespace, or WordPress page builders.",
  },
  {
    question: "Will we be able to update it ourselves after launch?",
    answer:
      "We build with a content management setup that lets you update text and images without touching code. For structural changes or new pages, most clients come back to us, but you\u2019re not locked in.",
  },
  {
    question: "How long does a build take?",
    answer:
      "From discovery to launch, typically a few weeks depending on scope and how quickly content reviews happen on your end \u2014 we\u2019ll confirm an exact timeline after the audit. We\u2019ll give you a timeline at the start and flag early if anything is likely to shift it.",
  },
]

const faqSchemaItems = faqItems.map((f) => ({
  label: f.question,
  content: f.answer,
}))

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function WebsitesPage() {
  return (
    <>
      {/* -- Schema ------------------------------------------------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Websites" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema(faqSchemaItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(serviceSchema({
          name: "Conversion-Focused Websites",
          description: "We build websites that turn visitors into enquiries. Fast, clear, and built around how your customers actually decide to make contact.",
          url: "/services/websites",
        })) }}
      />

      {/* -- Hero (split-screen before/after) ----------------------- */}
      <section
        className="px-5 sm:px-12 pt-[144px] pb-20 min-h-[100vh] flex items-center"
        style={{ background: "var(--ax-surface-dark)" }}
        aria-labelledby="web-hero-heading"
      >
        <div className="max-w-[var(--ax-container)] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Eyebrow className="mb-4" tone="muted">Websites</Eyebrow>
            <h1
              id="web-hero-heading"
              className="text-[var(--ax-fg-on-dark)] mb-6"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 800,
                fontSize: "var(--ax-fs-display)",
                lineHeight: "var(--ax-lh-tight)",
                letterSpacing: "var(--ax-tracking-tight)",
              }}
            >
              A website that actually brings in business.
            </h1>
            <p className="text-[var(--ax-fs-body-lg)] leading-[1.6] text-[var(--ax-fg-on-dark-2)] mb-10">
              Most service business websites look fine and do very little.
              Visitors arrive, scroll briefly, and leave without making contact.
              We build websites designed around a single outcome: getting a
              qualified visitor to take action.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="#work" variant="primary" size="lg">
                See our work
              </Button>
              <Button
                href={CALENDLY}
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:border-white/40 hover:bg-white/5"
              >
                Book an Audit
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <SplitHero />
          </div>
        </div>
      </section>

      {/* -- Stat strip --------------------------------------------- */}
      <section
        aria-label="Website conversion statistics"
        className="px-5 sm:px-12 py-16"
        style={{ background: "var(--ax-surface-dark-alt)" }}
      >
        <div className="max-w-[var(--ax-container)] mx-auto">
          <dl className="flex items-stretch gap-6 flex-col sm:flex-row">
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
                    className="hidden sm:block w-px self-stretch bg-white/10"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* -- The problem (annotated bad mockup) --------------------- */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="web-problem-heading">
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="max-w-[620px] mx-auto mb-14">
              <Eyebrow className="mb-3.5">Why most service websites don&apos;t convert</Eyebrow>
              <h2
                id="web-problem-heading"
                className="text-[var(--ax-fg-1)] mb-6"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Why most service websites don&apos;t convert
              </h2>
              <div className="text-[var(--ax-fs-body-lg)] leading-[1.7] text-[var(--ax-fg-2)] flex flex-col gap-5">
                <p className="m-0">
                  A website that looks professional is not the same as a website
                  that performs. The average service business website converts
                  between 1% and 3% of its visitors. That means if 500 people
                  find you through Google this month, between 485 and 495 of them
                  leave without getting in touch.
                </p>
                <p className="m-0">
                  The most common reasons aren&apos;t design failures. They&apos;re
                  structural ones. The offer isn&apos;t clear above the fold. The
                  social proof doesn&apos;t speak to the visitor&apos;s specific
                  problem. The call to action asks for too much commitment too
                  early. There are three different things the website is trying to
                  say, and none of them land.
                </p>
                <p className="m-0">
                  If you&apos;re spending money on Google Ads or investing in SEO,
                  a website that converts at 1% is wasting most of that spend.
                </p>
              </div>
            </div>
            <AnnotatedMockup />
          </div>
        </section>
      </Reveal>

      {/* -- What we build (sticky reveal + thumbnails) ------------- */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="web-build-heading"
        >
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div id="web-build-heading" className="sr-only">What we build</div>
            <WebFeatureReveal />
          </div>
        </section>
      </Reveal>

      {/* -- What makes it different (contrast columns) ------------- */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="web-different-heading">
          <div className="max-w-[800px] mx-auto">
            <Eyebrow className="mb-3.5">Why this isn&apos;t a typical agency website build</Eyebrow>
            <h2
              id="web-different-heading"
              className="text-[var(--ax-fg-1)] mb-10"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 700,
                fontSize: "var(--ax-fs-h2)",
                lineHeight: "var(--ax-lh-snug)",
                letterSpacing: "var(--ax-tracking-tight)",
              }}
            >
              Why this isn&apos;t a typical agency website build
            </h2>
            <ContrastColumns />
          </div>
        </section>
      </Reveal>

      {/* -- How it works (magazine horizontal steps) ---------------- */}
      <section
        className="px-5 sm:px-12 py-20"
        style={{ background: "var(--ax-surface-dark)" }}
        aria-labelledby="web-process-heading"
      >
        <div className="max-w-[var(--ax-container)] mx-auto">
          <div className="text-center mb-14 max-w-[640px] mx-auto">
            <Eyebrow className="mb-3.5" tone="muted">
              From brief to live
            </Eyebrow>
            <h2
              id="web-process-heading"
              className="text-[var(--ax-fg-on-dark)]"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 700,
                fontSize: "var(--ax-fs-h2)",
                lineHeight: "var(--ax-lh-snug)",
                letterSpacing: "var(--ax-tracking-tight)",
              }}
            >
              From brief to live
            </h2>
          </div>
          <MagazineSteps />
        </div>
      </section>

      {/* -- What's included (3x3 hover-preview grid) --------------- */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="web-included-heading">
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="text-center mb-12">
              <Eyebrow className="mb-3.5">What&apos;s included</Eyebrow>
              <h2
                id="web-included-heading"
                className="text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Everything in the build
              </h2>
            </div>
            <IncludedGrid />
          </div>
        </section>
      </Reveal>

      {/* -- Who it's for (industry cards) -------------------------- */}
      <Reveal>
        <section
          id="work"
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="web-audience-heading"
        >
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="max-w-[620px] mb-10">
              <Eyebrow className="mb-3.5" tone="muted">
                Built for service businesses that need their website to work
              </Eyebrow>
              <h2
                id="web-audience-heading"
                className="text-[var(--ax-fg-on-dark)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Who it works for
              </h2>
              <div className="text-[var(--ax-fs-body-lg)] leading-[1.7] text-[var(--ax-fg-on-dark-2)] mt-4 flex flex-col gap-5">
                <p className="m-0">
                  If you&apos;re spending money on ads or SEO and getting traffic
                  that doesn&apos;t convert, a better website is the fix. If
                  you&apos;re about to start spending on traffic and don&apos;t
                  want to waste it on a weak conversion rate, a properly built
                  website is the foundation.
                </p>
                <p className="m-0">
                  It works well for dental clinics, legal firms, home services,
                  hospitality, and professional services. Any business where the
                  website is the first impression a potential customer gets.
                </p>
              </div>
            </div>
            <WebIndustryCards />
          </div>
        </section>
      </Reveal>

      {/* -- Pricing (interactive scope calculator) ----------------- */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="web-pricing-heading"
        >
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="text-center mb-10">
              <Eyebrow className="mb-3.5" tone="muted">What it costs</Eyebrow>
              <h2
                id="web-pricing-heading"
                className="text-[var(--ax-fg-on-dark)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Scope your project
              </h2>
              <p className="text-[14px] leading-[1.6] text-[var(--ax-fg-on-dark-2)] mt-3 max-w-[480px] mx-auto">
                Website projects are scoped based on the number of pages, the
                complexity of the integrations, and whether copy needs to be
                written from scratch or edited from existing material.
              </p>
            </div>
            <ScopeCalculator />
            <p className="mt-8 text-center text-[14px] leading-[1.6] text-[var(--ax-fg-on-dark-2)] max-w-[480px] mx-auto">
              We quote a fixed price after the discovery session. No hourly
              billing, no surprises mid-build.
            </p>
          </div>
        </section>
      </Reveal>

      {/* -- FAQ ---------------------------------------------------- */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="web-faq-heading">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-14">
              <Eyebrow className="mb-3.5">Common questions</Eyebrow>
              <h2
                id="web-faq-heading"
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

      {/* -- Final CTA ---------------------------------------------- */}
      <Reveal>
        <ServiceCTA
          headline="Find out what your website is actually costing you."
          sub={"Book a 15-minute call. We\u2019ll look at your current site or brief and tell you what a properly built website would realistically change. If you don\u2019t need a new build, we\u2019ll say so."}
          buttonLabel="Book an Audit"
        />
      </Reveal>
    </>
  )
}
