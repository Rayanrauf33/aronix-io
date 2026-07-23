import type { Metadata } from "next"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Button } from "@/components/ui/Button"
import { Reveal } from "@/components/ui/Reveal"
import { FAQAccordion } from "@/components/services/FAQAccordion"
import { ServiceCTA } from "@/components/services/ServiceCTA"
import { LeadFeedHero } from "@/components/services/lead/LeadFeedHero"
import { ClockProblem } from "@/components/services/lead/ClockProblem"
import { SourceMap } from "@/components/services/lead/SourceMap"
import { RaceTrackFlow } from "@/components/services/lead/RaceTrackFlow"
import { CountdownSteps } from "@/components/services/lead/CountdownSteps"
import { ResponseTimeline } from "@/components/services/lead/ResponseTimeline"
import { ROICalculator } from "@/components/services/lead/ROICalculator"
import { ChatPricingCard } from "@/components/services/chat/ChatPricingCard"
import { breadcrumbSchema, faqSchema, serviceSchema, toJsonLd } from "@/lib/schema"

/* ------------------------------------------------------------------ */
/*  Metadata                                                            */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Instant Lead Response for Service Businesses",
  description:
    "Respond to every new lead in under 5 minutes, automatically, over SMS, email, or WhatsApp. No more leads going cold while you\u2019re with another customer.",
  openGraph: {
    title: "Instant Lead Response for Service Businesses | Aronix",
    description:
      "Respond to every new lead in under 5 minutes, automatically, over SMS, email, or WhatsApp. No more leads going cold while you\u2019re with another customer.",
    url: "/services/speed-to-lead",
    siteName: "Aronix",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Instant Lead Response | Aronix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instant Lead Response for Service Businesses | Aronix",
    description: "Respond to every new lead in under 5 minutes, automatically, over SMS, email, or WhatsApp.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/services/speed-to-lead" },
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const CALENDLY =
  "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"

const stats = [
  { val: "100x", lbl: "More likely to connect if you respond within 5 minutes vs. 30 minutes" },
  { val: "78%", lbl: "Of deals won by the first business to respond" },
  { val: "47 hrs", lbl: "Average time businesses take to follow up on a new lead" },
  { val: "21x", lbl: "Improvement in lead qualification when you respond in under 5 minutes" },
]

const faqItems = [
  {
    question: "What channels can it respond through?",
    answer:
      "SMS, email, and WhatsApp are the main three. If your leads come through a specific platform like Facebook, Instagram, or a CRM, we connect to that too. We map everything in the audit before we build.",
  },
  {
    question: "Will it sound automated?",
    answer:
      "Not if we set it up properly. The messages are written in your voice, based on real enquiries your business gets. Short, direct, and personal. Most people assume it\u2019s you or your team replying.",
  },
  {
    question: "What if a lead asks something complicated?",
    answer:
      "The system handles common questions automatically. Anything outside that, it flags to you with the full conversation thread so you can reply with context. You never walk into a conversation blind.",
  },
  {
    question: "Can I connect it to my existing CRM?",
    answer:
      "Usually yes. We\u2019ve worked with HubSpot, GoHighLevel, and several others. We check compatibility during the audit. If your CRM can\u2019t connect, we\u2019ll tell you upfront.",
  },
  {
    question: "What happens after the first follow-up sequence?",
    answer:
      "If a lead hasn\u2019t responded after the follow-up sequence, we can either stop or move them into a longer nurture sequence. Monthly touchpoints to stay in front of them until they\u2019re ready. We set that up based on what makes sense for your sales cycle.",
  },
  {
    question: "How do I know it\u2019s working?",
    answer:
      "The dashboard shows you every lead, every message sent, and every reply received. We also review the conversion data monthly and show you what\u2019s booking versus what\u2019s dropping off.",
  },
]

const faqSchemaItems = faqItems.map((f) => ({
  label: f.question,
  content: f.answer,
}))

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function SpeedToLeadPage() {
  return (
    <>
      {/* -- Schema ------------------------------------------------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Instant Lead Response" },
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
          name: "Instant Lead Response",
          description: "Respond to every new lead in under 5 minutes, automatically, over SMS, email, or WhatsApp. No more leads going cold while you're with another customer.",
          url: "/services/speed-to-lead",
        })) }}
      />

      {/* -- Hero --------------------------------------------------- */}
      <section
        className="px-5 sm:px-12 pt-[144px] pb-20 min-h-[100vh] flex items-center"
        style={{ background: "var(--ax-surface-dark)" }}
        aria-labelledby="stl-hero-heading"
      >
        <div className="max-w-[var(--ax-container)] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div>
            <Eyebrow className="mb-4" tone="muted">Instant Lead Response</Eyebrow>
            <h1
              id="stl-hero-heading"
              className="text-[var(--ax-fg-on-dark)] mb-6"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 800,
                fontSize: "var(--ax-fs-display)",
                lineHeight: "var(--ax-lh-tight)",
                letterSpacing: "var(--ax-tracking-tight)",
              }}
            >
              The first business to respond wins.
            </h1>
            <p className="text-[var(--ax-fs-body-lg)] leading-[1.6] text-[var(--ax-fg-on-dark-2)] mb-10">
              When someone fills out your form, clicks your ad, or sends a
              message, they&apos;re ready to buy right now. An instant lead
              response system responds in seconds, qualifies them, and books
              the call before they&apos;ve finished checking their phone.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="#diagram" variant="primary" size="lg">
                See how it works
              </Button>
              <Button href={CALENDLY} variant="outline" size="lg">
                Book an Audit
              </Button>
            </div>
          </div>

          {/* Right: lead feed */}
          <LeadFeedHero />
        </div>
      </section>

      {/* -- Stat strip --------------------------------------------- */}
      <section
        aria-label="Instant lead response statistics"
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

      {/* -- The problem (47-hour clock) ---------------------------- */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="stl-problem-heading"
        >
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="text-center mb-14 max-w-[640px] mx-auto">
              <Eyebrow className="mb-3.5" tone="muted">Why speed matters more than anything else</Eyebrow>
              <h2
                id="stl-problem-heading"
                className="text-[var(--ax-fg-on-dark)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                While you&apos;re on the job, they&apos;re booking your competitor
              </h2>
            </div>
            <ClockProblem />
          </div>
        </section>
      </Reveal>

      {/* -- What we build (source map) ----------------------------- */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="stl-build-heading">
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="max-w-[620px] mb-8">
              <Eyebrow className="mb-3.5">What we build</Eyebrow>
              <h2
                id="stl-build-heading"
                className="text-[var(--ax-fg-1)] mb-4"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Every lead source, one instant response
              </h2>
              <p className="text-[var(--ax-fs-body-lg)] leading-[1.7] text-[var(--ax-fg-2)]">
                We build an automated response system that triggers the moment a
                new lead comes in, from any source. Web form, Facebook lead ad,
                Google ad, WhatsApp message, Instagram DM, missed call. The
                system picks it up and responds within seconds.
              </p>
            </div>
            <SourceMap />
          </div>
        </section>
      </Reveal>

      {/* -- Lead flow diagram (race track) ------------------------- */}
      <Reveal>
        <section
          id="diagram"
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-label="Lead response flow diagram"
        >
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="text-center mb-14 max-w-[640px] mx-auto">
              <Eyebrow className="mb-3.5" tone="muted">Lead response flow</Eyebrow>
              <h2
                className="text-[var(--ax-fg-on-dark)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                From lead to booked in under a minute
              </h2>
            </div>
            <RaceTrackFlow />
            <p className="mt-10 text-center text-[13px] leading-[1.5] text-[var(--ax-fg-on-dark-2)] max-w-[480px] mx-auto">
              The pink path runs on its own the moment a lead comes in. The
              amber gate is where you stay in the loop.
            </p>
          </div>
        </section>
      </Reveal>

      {/* -- How it works (countdown) ------------------------------- */}
      <section
        className="px-5 sm:px-12 py-20"
        style={{ background: "var(--ax-surface-dark)" }}
        aria-labelledby="stl-process-heading"
      >
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-14 max-w-[640px] mx-auto">
            <Eyebrow className="mb-3.5" tone="muted">From lead in to booked call</Eyebrow>
            <h2
              id="stl-process-heading"
              className="text-[var(--ax-fg-on-dark)]"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 700,
                fontSize: "var(--ax-fs-h2)",
                lineHeight: "var(--ax-lh-snug)",
                letterSpacing: "var(--ax-tracking-tight)",
              }}
            >
              From lead in to booked call
            </h2>
          </div>
          <CountdownSteps />
        </div>
      </section>

      {/* -- What's included (response timeline) -------------------- */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="stl-included-heading"
        >
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="text-center mb-10">
              <Eyebrow className="mb-3.5" tone="muted">What&apos;s included</Eyebrow>
              <h2
                id="stl-included-heading"
                className="text-[var(--ax-fg-on-dark)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Everything in the package
              </h2>
            </div>
            <ResponseTimeline />
          </div>
        </section>
      </Reveal>

      {/* -- Who it's for (ROI calculator) -------------------------- */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="stl-audience-heading">
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="max-w-[620px] mx-auto text-center mb-10">
              <Eyebrow className="mb-3.5">
                Built for businesses that run paid ads or get web enquiries
              </Eyebrow>
              <h2
                id="stl-audience-heading"
                className="text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                See what slow follow-up is costing you
              </h2>
            </div>
            <ROICalculator />
          </div>
        </section>
      </Reveal>

      {/* -- Pricing ------------------------------------------------ */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="stl-pricing-heading">
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="text-center mb-10">
              <Eyebrow className="mb-3.5">What it costs</Eyebrow>
              <h2
                id="stl-pricing-heading"
                className="text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Simple, fixed pricing
              </h2>
            </div>
            <ChatPricingCard />
            <p className="mt-8 text-center text-[14px] leading-[1.6] text-[var(--ax-fg-3)] max-w-[480px] mx-auto">
              The audit call is where we check whether your current lead
              volume and job value make this worthwhile. If the numbers
              don&apos;t work, we&apos;ll tell you straight.
            </p>
          </div>
        </section>
      </Reveal>

      {/* -- FAQ ---------------------------------------------------- */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="stl-faq-heading">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-14">
              <Eyebrow className="mb-3.5">Common questions</Eyebrow>
              <h2
                id="stl-faq-heading"
                className="text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Common questions about Instant Lead Response
              </h2>
            </div>
            <FAQAccordion items={faqItems} defaultOpen={0} />
          </div>
        </section>
      </Reveal>

      {/* -- Final CTA ---------------------------------------------- */}
      <Reveal>
        <ServiceCTA
          headline="Find out how many leads you're losing to slow follow-up."
          sub={"Book a 15-minute call. We\u2019ll look at where your leads come from and what\u2019s happening to the ones that don\u2019t convert. If instant lead response isn\u2019t the fix, we\u2019ll say so."}
          buttonLabel="Book an Audit"
        />
      </Reveal>
    </>
  )
}
