import type { Metadata } from "next"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Button } from "@/components/ui/Button"
import { Reveal } from "@/components/ui/Reveal"
import { FAQAccordion } from "@/components/services/FAQAccordion"
import { ServiceCTA } from "@/components/services/ServiceCTA"
import { SyncStatusCard } from "@/components/services/crm/SyncStatusCard"
import { DisconnectedTools } from "@/components/services/crm/DisconnectedTools"
import { FeatureBlocks } from "@/components/services/crm/FeatureBlocks"
import { IntegrationMap } from "@/components/services/crm/IntegrationMap"
import { TimelineSteps } from "@/components/services/crm/TimelineSteps"
import { HealthDashboard } from "@/components/services/crm/HealthDashboard"
import { AudienceCards } from "@/components/services/crm/AudienceCards"
import { PricingConfigurator } from "@/components/services/crm/PricingConfigurator"
import { breadcrumbSchema, faqSchema, serviceSchema, toJsonLd } from "@/lib/schema"

/* ------------------------------------------------------------------ */
/*  Metadata (verbatim from copy doc)                                  */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "CRM & System Integrations | Aronix",
  description:
    "We connect the tools your business runs on, so data flows between them automatically. No more copy-pasting or deals falling through cracks.",
  openGraph: {
    title: "CRM & System Integrations | Aronix",
    description:
      "We connect the tools your business runs on so data moves between them automatically. No more copy-pasting between systems or deals falling through the cracks.",
    url: "/services/crm-integrations",
    siteName: "Aronix",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CRM & System Integrations | Aronix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CRM & System Integrations | Aronix",
    description: "We connect the tools your business runs on so data moves between them automatically. No more copy-pasting between systems or deals falling through the cracks.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/services/crm-integrations" },
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CALENDLY =
  "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"

const stats = [
  { val: "67%", lbl: "Of CRM data goes stale within a year without automated maintenance" },
  { val: "30%", lbl: "Of a sales rep\u2019s time spent on manual data entry on average" },
  { val: "5\u20137", lbl: "Disconnected systems the average SMB runs on" },
  { val: "23%", lbl: "Of deals lost due to poor CRM hygiene and follow-up gaps" },
]

const faqItems = [
  {
    question: "We already have some Zapier automations. Is this different?",
    answer:
      "It depends on what they\u2019re doing. Simple Zapier automations are fine for basic triggers and actions. Where they fall short is complex conditional logic, error handling, bulk data operations, and anything that needs to be reliable at scale. We often extend or replace Zapier automations as part of a broader integration build. Sometimes the existing ones are fine and we leave them alone.",
  },
  {
    question: "Our CRM data is a mess. Does that need to be fixed first?",
    answer:
      "We include a data cleanup as part of the integration build. There\u2019s no point building clean automations on top of inaccurate data, so we handle both together. The state of your data doesn\u2019t stop us starting. It just becomes part of the scope.",
  },
  {
    question: "Can you work with our specific CRM?",
    answer:
      "Probably yes. We\u2019ve worked with HubSpot, GoHighLevel, Pipedrive, Salesforce, and several others. The clearest way to check is on the audit call. You tell us your stack and we tell you what\u2019s connectable and what isn\u2019t.",
  },
  {
    question: "What if we change tools in future?",
    answer:
      "We document everything we build so another developer, or us, can update the integrations when your stack changes. Integration builds aren\u2019t meant to lock you into working with us forever.",
  },
  {
    question: "How do we know the data is flowing correctly after launch?",
    answer:
      "Every integration produces a run log. You can see what triggered, what data moved, and what the output was. We also set up monitoring alerts so any failure notifies you immediately rather than going unnoticed.",
  },
  {
    question: "Do you train our team on the new setup?",
    answer:
      "Yes. We include a handover session where we walk your team through what\u2019s been built, what they can expect the system to do, and what to do if something looks wrong. The documentation we provide is written for your team, not for developers.",
  },
]

const faqSchemaItems = faqItems.map((f) => ({
  label: f.question,
  content: f.answer,
}))

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CRMIntegrationsPage() {
  return (
    <>
      {/* -- Schema ------------------------------------------------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "CRM Integrations" },
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
          name: "CRM & System Integrations",
          description: "We connect the tools your business runs on so data moves between them automatically. No more copy-pasting between systems or deals falling through the cracks.",
          url: "/services/crm-integrations",
        })) }}
      />

      {/* -- Hero --------------------------------------------------- */}
      <section
        className="px-5 sm:px-12 pt-[144px] pb-20 min-h-[100vh] flex items-center"
        style={{ background: "var(--ax-surface-dark)" }}
        aria-labelledby="crm-hero-heading"
      >
        <div className="max-w-[var(--ax-container)] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div>
            <Eyebrow tone="muted" className="mb-4">CRM &amp; System Integrations</Eyebrow>
            <h1
              id="crm-hero-heading"
              className="text-white mb-6"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 800,
                fontSize: "var(--ax-fs-display)",
                lineHeight: "var(--ax-lh-tight)",
                letterSpacing: "var(--ax-tracking-tight)",
              }}
            >
              Your tools, actually talking to each other.
            </h1>
            <p
              className="text-[var(--ax-fs-body-lg)] leading-[1.6] mb-10"
              style={{ color: "var(--ax-fg-on-dark-2)" }}
            >
              Most businesses run on five or more tools that don&apos;t connect
              to each other. Leads live in one place, jobs in another, invoices
              somewhere else. We wire them together so data flows automatically
              and nothing gets lost between systems.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="#diagram" variant="primary" size="lg">
                See how we connect systems
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

          {/* Right: sync status card (hidden on mobile) */}
          <div className="hidden lg:block">
            <SyncStatusCard />
          </div>
        </div>
      </section>

      {/* -- Stat strip (unchanged) --------------------------------- */}
      <section
        aria-label="CRM integration statistics"
        className="px-5 sm:px-12 py-16"
        style={{ background: "var(--ax-surface-dark)" }}
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

      {/* -- Problem section ---------------------------------------- */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-bg)" }}
          aria-labelledby="crm-problem-heading"
        >
          <div className="max-w-[1080px] mx-auto">
            <Eyebrow className="mb-3.5">What disconnected tools actually cost you</Eyebrow>
            <h2 id="crm-problem-heading" className="sr-only">
              What disconnected tools actually cost you
            </h2>

            {/* Two-column diagram */}
            <div className="mb-12">
              <DisconnectedTools />
            </div>

            {/* Paragraphs from copy */}
            <div
              className="max-w-[640px] mx-auto text-[var(--ax-fs-body-lg)] leading-[1.7] text-[var(--ax-fg-2)] flex flex-col gap-5"
            >
              <p className="m-0">
                When your systems don&apos;t talk to each other, a human
                becomes the connection. Someone copies the new lead from the
                form into the CRM. Someone updates the job status in the
                project tool. Someone pulls the data from three places to build
                the weekly report. That&apos;s not a people problem. It&apos;s
                a systems problem.
              </p>
              <p className="m-0">
                The real cost isn&apos;t just the time. It&apos;s the errors.
                Every manual transfer is a chance for data to be entered wrong,
                fields to be left blank, or a step to be skipped entirely. And
                when deals fall through the cracks, you rarely know which part
                of the process dropped them.
              </p>
              <p className="m-0">
                Bad CRM data compounds over time. Duplicate records, outdated
                contacts, missing information. It quietly degrades the quality
                of every decision that relies on it.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* -- What we build ------------------------------------------ */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="crm-build-heading"
        >
          <div className="max-w-[1080px] mx-auto">
            <Eyebrow tone="muted" className="mb-8">What we build</Eyebrow>
            <h2 id="crm-build-heading" className="sr-only">What we build</h2>
            <FeatureBlocks />

            {/* Additional copy below feature blocks */}
            <div
              className="max-w-[640px] mx-auto mt-12 text-[var(--ax-fs-body-lg)] leading-[1.7] flex flex-col gap-5"
              style={{ color: "var(--ax-fg-on-dark-2)" }}
            >
              <p className="m-0">
                We work with the tools you already have. HubSpot, GoHighLevel,
                Pipedrive, Salesforce, Notion, Airtable, Xero, QuickBooks,
                Google Workspace, and most others that have an API or native
                integration. If a tool doesn&apos;t connect cleanly, we&apos;ll
                tell you that before we start.
              </p>
              <p className="m-0">
                We also clean and structure your existing CRM data as part of
                the setup. There&apos;s no point building clean integrations on
                top of dirty data.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* -- Integration map diagram -------------------------------- */}
      <Reveal>
        <section
          id="diagram"
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-label="Integration map diagram"
        >
          <div className="max-w-[1080px] mx-auto">
            <IntegrationMap />
          </div>
        </section>
      </Reveal>

      {/* -- How it works ------------------------------------------- */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="crm-process-heading"
        >
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-14 max-w-[640px] mx-auto">
              <Eyebrow tone="muted" className="mb-3.5">
                From fragmented tools to a connected system
              </Eyebrow>
              <h2
                id="crm-process-heading"
                className="text-white"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                From fragmented tools to a connected system
              </h2>
            </div>
            <TimelineSteps />
          </div>
        </section>
      </Reveal>

      {/* -- What's included ---------------------------------------- */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-slate-200)" }}
          aria-labelledby="crm-included-heading"
        >
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-10">
              <Eyebrow className="mb-3.5">What&apos;s included</Eyebrow>
              <h2
                id="crm-included-heading"
                className="text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                What&apos;s included
              </h2>
            </div>
            <HealthDashboard />
          </div>
        </section>
      </Reveal>

      {/* -- Who it's for ------------------------------------------- */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-tint)" }}
          aria-labelledby="crm-audience-heading"
        >
          <div className="max-w-[1080px] mx-auto">
            <Eyebrow className="mb-3.5">
              Built for businesses that have outgrown copy-paste
            </Eyebrow>
            <h2 id="crm-audience-heading" className="sr-only">
              Built for businesses that have outgrown copy-paste
            </h2>
            <div className="text-[var(--ax-fs-body-lg)] leading-[1.7] text-[var(--ax-fg-2)] flex flex-col gap-5 mb-10">
              <p className="m-0">
                If your team spends time moving data between tools by hand, if
                you&apos;ve had deals fall through the cracks because something
                wasn&apos;t updated, or if your CRM reports don&apos;t reflect
                reality, this is the fix.
              </p>
              <p className="m-0">
                It&apos;s particularly impactful for businesses with a defined
                sales process, a project or job delivery workflow, and some form
                of accounting or invoicing system that currently sits separate
                from everything else.
              </p>
            </div>
            <AudienceCards />
          </div>
        </section>
      </Reveal>

      {/* -- Pricing ------------------------------------------------ */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-bg)" }}
          aria-labelledby="crm-pricing-heading"
        >
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-10">
              <Eyebrow className="mb-3.5">What it costs</Eyebrow>
              <h2
                id="crm-pricing-heading"
                className="text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                What it costs
              </h2>
            </div>
            <div
              className="max-w-[640px] mx-auto text-[var(--ax-fs-body-lg)] leading-[1.7] text-[var(--ax-fg-2)] flex flex-col gap-5 mb-10"
            >
              <p className="m-0">
                Integration projects are scoped based on the number of systems,
                the complexity of the data flows, and the state of your existing
                CRM data. Simple two-system integrations start from $250. Full
                multi-system builds with complex logic are from $1,250.
              </p>
              <p className="m-0">
                Fixed price, scoped before we start. No hourly billing.
              </p>
            </div>
            <PricingConfigurator />
          </div>
        </section>
      </Reveal>

      {/* -- FAQ ---------------------------------------------------- */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="crm-faq-heading">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-14">
              <Eyebrow className="mb-3.5">Common questions</Eyebrow>
              <h2
                id="crm-faq-heading"
                className="text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Common questions about CRM integrations
              </h2>
            </div>
            <FAQAccordion items={faqItems} defaultOpen={0} />
          </div>
        </section>
      </Reveal>

      {/* -- Final CTA ---------------------------------------------- */}
      <Reveal>
        <ServiceCTA
          headline="Find out where your systems are dropping the ball."
          sub={"Book a 15-minute call. Tell us what tools you use and where data gets lost. We\u2019ll tell you what\u2019s worth connecting and what a clean setup would actually look like."}
          buttonLabel="Book an Audit"
        />
      </Reveal>
    </>
  )
}
