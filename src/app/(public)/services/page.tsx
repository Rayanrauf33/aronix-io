import type { Metadata } from "next"
import type { ServiceItem } from "@/components/services/hub/PillarServiceCards"
import { Button } from "@/components/ui/Button"
import { Faq } from "@/components/sections/Faq"
import { CtaBand } from "@/components/sections/CtaBand"
import { PillarServiceCards } from "@/components/services/hub/PillarServiceCards"
import { HeroPreview } from "@/components/services/hub/HeroPreview"
import { breadcrumbSchema, faqSchema, serviceSchema, toJsonLd } from "@/lib/schema"
import type { AccordionItem } from "@/components/ui/Accordion"

export const metadata: Metadata = {
  title: "AI Automation Services for Service Businesses | Aronix",
  description:
    "Aronix builds the systems that capture leads, automate your operations, and get your business found locally. See what we build and how it works.",
  openGraph: {
    title: "AI Automation Services for Service Businesses | Aronix",
    description:
      "Aronix builds the systems that capture leads, automate your operations, and get your business found locally. See what we build and how it works.",
    url: "/services",
    siteName: "Aronix",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aronix Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Services for Service Businesses | Aronix",
    description: "Aronix builds the systems that capture leads, automate your operations, and get your business found locally.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/services" },
}

/* ------------------------------------------------------------------ */
/*  Service data, seven cards, exact order                             */
/* ------------------------------------------------------------------ */

const services: ServiceItem[] = [
  {
    name: "AI Voice Agents",
    outcome:
      "Your phone answered in two rings, every call, including after hours.",
    href: "/services/ai-voice-agents",
    iconName: "Phone",
    ctaText: "Hear it take a call",
  },
  {
    name: "AI Chat & Booking",
    outcome:
      "A website chat agent that answers questions and books appointments without human input.",
    href: "/services/ai-chat-booking",
    iconName: "MessageCircle",
    ctaText: "See it book a visitor",
  },
  {
    name: "Instant Lead Response",
    outcome:
      "Automated response to every new lead within 60 seconds, from any source.",
    href: "/services/speed-to-lead",
    iconName: "Zap",
    ctaText: "See the response flow",
  },
  {
    name: "Workflow Automation",
    outcome:
      "The recurring tasks your team does by hand, running automatically.",
    href: "/services/workflow-automation",
    iconName: "Network",
    ctaText: "See what we automate",
  },
  {
    name: "CRM Integrations",
    outcome:
      "Your tools connected so data flows between them without copy-pasting.",
    href: "/services/crm-integrations",
    iconName: "ArrowRightLeft",
    ctaText: "See how systems connect",
  },
  {
    name: "Conversion-Focused Websites",
    outcome:
      "Built to turn visitors into enquiries, not just to look professional.",
    href: "/services/websites",
    iconName: "Globe",
    ctaText: "See how we build",
  },
  {
    name: "Local SEO",
    outcome:
      "Ranking in the top three of Google local search for the terms your customers use.",
    href: "/services/local-seo",
    iconName: "MapPin",
    ctaText: "See the ranking work",
  },
]

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */

const faqItems: AccordionItem[] = [
  {
    label: "Do you work with businesses of all sizes?",
    content:
      "We work primarily with growing service businesses \u2014 typically between 2 and 50 people. Businesses large enough to have real operational problems, small enough that the owner is still close to the work and can see the impact directly. If you\u2019re a solo operator or a large enterprise, we may not be the right fit and we\u2019ll say so on the audit call.",
  },
  {
    label: "How long does it take to get something live?",
    content:
      "Most projects are live within a few weeks depending on scope \u2014 we\u2019ll confirm an exact timeline after the audit. The voice agent and speed-to-lead systems are typically our fastest builds. Workflow automation and websites take longer depending on complexity. We give you a fixed timeline during scoping.",
  },
  {
    label: "Do you work with specific industries?",
    content:
      "Our strongest results have been in home services, dental and medical, legal, hospitality, and professional services. The common factor isn\u2019t the industry \u2014 it\u2019s that new business starts with an enquiry, whether by phone, form, or search.",
  },
  {
    label: "We\u2019ve tried agencies before and been disappointed. Why would this be different?",
    content:
      "The honest answer is that we don\u2019t know until we\u2019ve done the audit. What we can say is that we don\u2019t start a build without a clear scope and a realistic outcome, we don\u2019t charge hourly so we have no incentive to drag work out, and if the audit tells us the build isn\u2019t worth it for your business, we\u2019ll say that instead of taking the money.",
  },
  {
    label: "Can you handle multiple projects at once?",
    content:
      "We take on a limited number of active builds at any time to make sure the work gets done properly. If there\u2019s a queue, we\u2019ll tell you during the audit call so you can make a timing decision with accurate information.",
  },
]

const schemaFaqItems = faqItems.map((item) => ({
  label: item.label,
  content: item.content as string,
}))

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(
            breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services" }])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema(schemaFaqItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(serviceSchema({
            name: "Business Automation Services",
            description: "Aronix builds the systems that capture leads, automate your operations, and get your business found locally.",
            url: "/services",
          })),
        }}
      />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="px-5 sm:px-12 min-h-[100dvh] flex items-center"
        style={{ background: "var(--ax-surface-dark)" }}
        aria-labelledby="services-hero-heading"
      >
        <div className="max-w-[var(--ax-container)] mx-auto w-full py-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

            {/* Left: headline, subline, CTA */}
            <div className="text-center lg:text-left">
              <h1
                id="services-hero-heading"
                className="sh-hero-h1 text-white m-0 max-w-[640px] mx-auto lg:mx-0"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 800,
                  fontSize: "var(--ax-fs-hero)",
                  lineHeight: "var(--ax-lh-tight)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Systems that grow your business while you run it.
              </h1>
              <p
                className="sh-hero-sub mt-6 m-0 max-w-[480px] mx-auto lg:mx-0"
                style={{
                  fontSize: "var(--ax-fs-body-lg)",
                  lineHeight: "1.65",
                  color: "var(--ax-fg-on-dark-2)",
                }}
              >
                We build AI and automation systems for service businesses.
              </p>
              <div className="sh-hero-cta mt-8 flex justify-center lg:justify-start">
                <Button
                  href="https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"
                  variant="dark"
                  size="lg"
                  trailingArrow
                >
                  Book an Audit
                </Button>
              </div>
            </div>

            {/* Right: live systems preview, desktop only */}
            <div className="hidden lg:block shrink-0">
              <HeroPreview />
            </div>

          </div>
        </div>
      </section>

      {/* ── Seven service cards ───────────────────────────── */}
      <section
        className="px-5 sm:px-12 py-20"
        style={{ background: "var(--ax-slate-100)" }}
        aria-label="Our services"
      >
        <div className="max-w-[var(--ax-container)] mx-auto">
          <p
            className="text-[18px] font-medium text-[var(--ax-fg-2)] mb-10 m-0"
            style={{ fontFamily: "var(--ax-font-display)" }}
          >
            Pick the problem you&apos;re working on.
          </p>
          <PillarServiceCards services={services} variant="on-light" />
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <Faq
        eyebrow="Common questions"
        title="Everything you need to know about working with us"
        items={faqItems}
        defaultOpen={0}
      />

      {/* ── Final CTA ─────────────────────────────────────── */}
      <CtaBand
        title="Not sure where to start? Start with the audit."
        lead="A 15-minute call is enough to tell you whether we can help and which system would have the biggest impact on your business first."
        primaryCta={{
          label: "Book an Audit",
          href: "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session",
          variant: "dark",
          trailingArrow: true,
        }}
        secondaryCta={null}
      />
    </>
  )
}
