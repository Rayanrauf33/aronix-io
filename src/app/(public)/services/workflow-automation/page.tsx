import type { Metadata } from "next"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Button } from "@/components/ui/Button"
import { Reveal } from "@/components/ui/Reveal"
import { FAQAccordion } from "@/components/services/FAQAccordion"
import { ServiceCTA } from "@/components/services/ServiceCTA"
import { HeroCanvas } from "@/components/services/automation/HeroCanvas"
import { CostCards } from "@/components/services/automation/CostCards"
import { ProcessConstructor } from "@/components/services/automation/ProcessConstructor"
import { PipelineSteps } from "@/components/services/automation/PipelineSteps"
import { ToolGrid } from "@/components/services/automation/ToolGrid"
import { ZigzagSteps } from "@/components/services/automation/ZigzagSteps"
import { RunLog } from "@/components/services/automation/RunLog"
import { SignalChecklist } from "@/components/services/automation/SignalChecklist"
import { ExampleCards } from "@/components/services/automation/ExampleCards"
import { breadcrumbSchema, faqSchema, serviceSchema, toJsonLd } from "@/lib/schema"

/* ------------------------------------------------------------------ */
/*  Metadata (verbatim from copy doc)                                  */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Workflow & Process Automation for Growing Businesses",
  description:
    "We map your manual processes and build automated systems that run them without human input. Less admin, fewer errors, more time on actual work.",
  openGraph: {
    title: "Workflow & Process Automation for Growing Businesses | Aronix",
    description:
      "We map the manual processes slowing your team down and build automated systems that run them without human input. Less admin, fewer errors, more time on actual work.",
    url: "/services/workflow-automation",
    siteName: "Aronix",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Workflow & Process Automation | Aronix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Workflow & Process Automation for Growing Businesses | Aronix",
    description: "We map the manual processes slowing your team down and build automated systems that run them without human input.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/services/workflow-automation" },
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CALENDLY =
  "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"

const stats = [
  { val: "60%", lbl: "Of workers spend at least 3 hours a day on tasks that could be automated" },
  { val: "50%", lbl: "Reduction in process errors typical after automation" },
  { val: "4.9h", lbl: "Average time per week lost to manual data entry per employee" },
  { val: "3-6mo", lbl: "Typical payback period for a well-scoped automation build" },
]

const faqItems = [
  {
    question: "Do I need to change the tools my team uses?",
    answer:
      "Not usually. We build around your existing stack wherever possible. If a tool is genuinely blocking the automation, because it has no API or integration options, we\u2019ll tell you that during the audit before any money changes hands.",
  },
  {
    question: "What happens if the automation breaks?",
    answer:
      "Every automation we build includes error handling and alerts. If something fails, you get a notification immediately with enough information to understand what happened. It doesn\u2019t fail silently. We also include post-launch support so we can fix issues that come up in the first weeks of live running.",
  },
  {
    question: "Can you automate a process that involves someone making a decision partway through?",
    answer:
      "Yes. We build decision gates into workflows: points where the automation pauses, notifies the right person with the relevant context, and waits for their input before continuing. The automated parts still run automatically. The human steps are just cleaner and better-informed than they were before.",
  },
  {
    question: "How long does a typical build take?",
    answer:
      "A simple automation connecting two tools with a straightforward trigger and action typically takes a few weeks depending on scope \u2014 we\u2019ll confirm an exact timeline after the audit. A multi-step process involving several systems and conditional logic takes longer. We give you a timeline during scoping, and it\u2019s included in the fixed-price quote.",
  },
  {
    question: "What if our process changes after the automation is built?",
    answer:
      "Processes change. We document everything clearly so you understand what was built and why. Small changes, an extra notification, a new field, are usually quick to make. If the process changes significantly, we scope it as a new build or an extension.",
  },
  {
    question: "How do we know it\u2019s actually running correctly?",
    answer:
      "Every automation produces a run log. You can see every time it triggered, what data it processed, and what the output was. We review this with you in the first weeks and set up a monitoring alert for any failures.",
  },
]

const faqSchemaItems = faqItems.map((f) => ({
  label: f.question,
  content: f.answer,
}))

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function WorkflowAutomationPage() {
  return (
    <>
      {/* -- Schema ------------------------------------------------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Workflow Automation" },
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
          name: "Workflow & Process Automation",
          description: "We map the manual processes slowing your team down and build automated systems that run them without human input. Less admin, fewer errors, more time on actual work.",
          url: "/services/workflow-automation",
        })) }}
      />

      {/* -- Hero --------------------------------------------------- */}
      <section
        className="px-5 sm:px-12 pt-[144px] pb-20 min-h-[100vh] flex items-center"
        style={{ background: "var(--ax-surface-dark)" }}
        aria-labelledby="wfa-hero-heading"
      >
        <div className="max-w-[var(--ax-container)] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Eyebrow className="mb-4" tone="muted">Workflow Automation</Eyebrow>
            <h1
              id="wfa-hero-heading"
              className="text-[var(--ax-fg-on-dark)] mb-6"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 800,
                fontSize: "var(--ax-fs-display)",
                lineHeight: "var(--ax-lh-tight)",
                letterSpacing: "var(--ax-tracking-tight)",
              }}
            >
              Stop doing manually what a system can do automatically.
            </h1>
            <p
              className="leading-[1.6] text-[var(--ax-fg-on-dark-2)] mb-10"
              style={{ fontSize: "var(--ax-fs-body-lg)" }}
            >
              Every business has tasks that happen the same way, every time,
              with a human in the middle for no good reason. We find those
              tasks, map the process, and build an automated system that runs
              them without anyone touching them.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="#examples" variant="primary" size="lg">
                See what we&apos;ve automated
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

          <HeroCanvas />
        </div>
      </section>

      {/* -- Stat strip --------------------------------------------- */}
      <section
        aria-label="Workflow automation statistics"
        className="px-5 sm:px-12 py-16"
        style={{ background: "var(--ax-surface-dark-alt)" }}
      >
        <div className="max-w-[1080px] mx-auto">
          <dl className="flex items-stretch gap-6 flex-col sm:flex-row">
            {stats.map(({ val, lbl }, i) => (
              <div key={lbl} className="flex flex-1 items-stretch">
                <div className="flex-1 text-center py-8 px-6">
                  <dt
                    className="text-white"
                    style={{
                      fontFamily: "var(--ax-font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(36px, 3.5vw, 52px)",
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

      {/* -- The problem (cost cards) -------------------------------- */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="wfa-problem-heading">
          <div className="max-w-[1080px] mx-auto">
            <div className="max-w-[620px] mb-14">
              <Eyebrow className="mb-3.5">What manual processes actually cost you</Eyebrow>
              <h2
                id="wfa-problem-heading"
                className="text-[var(--ax-fg-1)] mb-6"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                What manual processes actually cost you
              </h2>
              <div
                className="leading-[1.7] text-[var(--ax-fg-2)] flex flex-col gap-5"
                style={{ fontSize: "var(--ax-fs-body-lg)" }}
              >
                <p className="m-0">
                  The obvious cost is time. When your team spends hours each week
                  on data entry, status updates, report generation, approval
                  routing, or copying information between tools, that&apos;s real
                  capacity being spent on work that a system could do.
                </p>
                <p className="m-0">
                  The less obvious cost is errors. Manual processes fail in
                  proportion to how often they run. A step gets skipped, a field
                  gets left blank, a notification doesn&apos;t go out. These
                  mistakes compound quietly until they cause a problem that&apos;s
                  expensive to fix.
                </p>
                <p className="m-0">
                  The least obvious cost is scale. A business that runs on manual
                  processes hits a ceiling. You can only hire so many people to do
                  the same tasks faster. Automated processes don&apos;t have that
                  ceiling.
                </p>
              </div>
            </div>
            <CostCards />
          </div>
        </section>
      </Reveal>

      {/* -- Process flow diagram ------------------------------------ */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="wfa-process-flow-heading"
        >
          <div className="max-w-[1080px] mx-auto">
            <div className="max-w-[620px] mb-14">
              <Eyebrow className="mb-3.5" tone="muted">What we build</Eyebrow>
              <h2
                id="wfa-process-flow-heading"
                className="text-[var(--ax-fg-on-dark)] mb-6"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                What we build
              </h2>
              <div
                className="leading-[1.7] text-[var(--ax-fg-on-dark-2)] flex flex-col gap-5"
                style={{ fontSize: "var(--ax-fs-body-lg)" }}
              >
                <p className="m-0">
                  We map the processes that are draining your team&apos;s time
                  and rebuild them as automated workflows. The work is specific to
                  how your business actually operates, not a generic template
                  dropped into your tools.
                </p>
                <p className="m-0">
                  A typical workflow automation connects two or more of the tools
                  you already use and moves information between them automatically
                  when a trigger event happens. We also build internal approval
                  and notification systems so the right person gets notified with
                  the right context, without anyone having to chase the
                  information.
                </p>
              </div>
            </div>
            <ProcessConstructor />
          </div>
        </section>
      </Reveal>

      {/* -- How it works (pipeline steps) --------------------------- */}
      <section
        className="px-5 sm:px-12 py-20"
        style={{ background: "var(--ax-surface-dark-alt)" }}
        aria-labelledby="wfa-process-heading"
      >
        <div className="max-w-[1080px] mx-auto">
          <div className="text-center mb-14 max-w-[640px] mx-auto">
            <Eyebrow className="mb-3.5" tone="muted">From messy process to clean system</Eyebrow>
            <h2
              id="wfa-process-heading"
              className="text-[var(--ax-fg-on-dark)]"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 700,
                fontSize: "var(--ax-fs-h2)",
                lineHeight: "var(--ax-lh-snug)",
                letterSpacing: "var(--ax-tracking-tight)",
              }}
            >
              From messy process to clean system
            </h2>
          </div>
          <PipelineSteps />
        </div>
      </section>

      {/* -- What we build on (tool grid) ---------------------------- */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="wfa-tools-heading"
        >
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-14 max-w-[640px] mx-auto">
              <Eyebrow className="mb-3.5" tone="muted">Built on tools you already use</Eyebrow>
              <h2
                id="wfa-tools-heading"
                className="text-[var(--ax-fg-on-dark)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Built on tools you already use
              </h2>
              <p className="text-[14px] leading-[1.6] text-[var(--ax-fg-on-dark-2)] mt-3">
                We build on Make, n8n, Zapier, and direct API integrations
                depending on what fits your stack. We&apos;re not pushing you
                toward a new platform; we work with what you have where
                possible.
              </p>
            </div>
            <ToolGrid />
          </div>
        </section>
      </Reveal>

      {/* -- What's included (zigzag steps) -------------------------- */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="wfa-included-heading"
        >
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-14 max-w-[640px] mx-auto">
              <Eyebrow className="mb-3.5" tone="muted">What&apos;s included</Eyebrow>
              <h2
                id="wfa-included-heading"
                className="text-[var(--ax-fg-on-dark)]"
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
            <ZigzagSteps />
          </div>
        </section>
      </Reveal>

      {/* -- Run log (live audit trail) ------------------------------ */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="wfa-log-heading"
        >
          <div className="max-w-[1080px] mx-auto">
            <div className="max-w-[620px] mb-14">
              <Eyebrow className="mb-3.5" tone="muted">Full visibility, always</Eyebrow>
              <h2
                id="wfa-log-heading"
                className="text-[var(--ax-fg-on-dark)] mb-4"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                You always know what&apos;s running
              </h2>
              <p
                className="leading-[1.7] text-[var(--ax-fg-on-dark-2)]"
                style={{ fontSize: "var(--ax-fs-body-lg)" }}
              >
                Every automation produces a run log. You can see every time it
                triggered, what data it processed, and what the output was. If
                something fails, you get a notification immediately.
              </p>
            </div>
            <RunLog />
          </div>
        </section>
      </Reveal>

      {/* -- Who it's for (signal checklist) ------------------------- */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="wfa-audience-heading">
          <div className="max-w-[1080px] mx-auto">
            <div className="max-w-[620px] mb-14">
              <Eyebrow className="mb-3.5">Built for teams doing the same tasks on repeat</Eyebrow>
              <h2
                id="wfa-audience-heading"
                className="text-[var(--ax-fg-1)] mb-6"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Is your process a candidate for automation?
              </h2>
              <p
                className="leading-[1.7] text-[var(--ax-fg-2)]"
                style={{ fontSize: "var(--ax-fs-body-lg)" }}
              >
                If your team has a process that runs more than a few times a week
                and involves more than one tool, it&apos;s a candidate. The
                clearest signals are below.
              </p>
            </div>
            <SignalChecklist />
          </div>
        </section>
      </Reveal>

      {/* -- Examples ----------------------------------------------- */}
      <Reveal>
        <section
          id="examples"
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="wfa-examples-heading"
        >
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12 max-w-[640px] mx-auto">
              <Eyebrow className="mb-3.5" tone="muted">What we&apos;ve automated for other businesses</Eyebrow>
              <h2
                id="wfa-examples-heading"
                className="text-[var(--ax-fg-on-dark)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Real workflows, zero manual steps
              </h2>
            </div>
            <ExampleCards />
          </div>
        </section>
      </Reveal>

      {/* -- Pricing ------------------------------------------------ */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          aria-labelledby="wfa-pricing-heading"
        >
          <div className="max-w-[480px] mx-auto w-full">
            <div className="text-center mb-10">
              <Eyebrow className="mb-4">What it costs</Eyebrow>
              <h2
                id="wfa-pricing-heading"
                className="text-[var(--ax-fg-1)] mb-4"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 800,
                  fontSize: "var(--ax-fs-h1)",
                  lineHeight: "var(--ax-lh-tight)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Custom quote
              </h2>
              <p
                className="leading-[1.6] m-0"
                style={{ fontSize: "16px", color: "var(--ax-fg-2)" }}
              >
                Multiple systems, conditional logic, and decision gates.
                Quoted after the process audit with a clear scope.
              </p>
            </div>

            <div
              className="rounded-[var(--ax-radius-xl)] border p-8"
              style={{
                background: "var(--ax-surface)",
                borderColor: "var(--ax-border)",
              }}
            >
              <div
                className="text-[11px] uppercase font-bold mb-4"
                style={{
                  fontFamily: "var(--ax-font-mono)",
                  letterSpacing: "0.1em",
                  color: "var(--ax-primary)",
                }}
              >
                Multi-system build
              </div>
              <div
                className="text-[var(--ax-fg-1)] mb-4"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 800,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                }}
              >
                Custom quote
              </div>
              <p
                className="text-[14px] leading-[1.6] mb-8 text-[var(--ax-fg-2)]"
              >
                Multiple systems, conditional logic, and decision gates.
                Quoted after the process audit with a clear scope.
              </p>
              <div className="mb-8">
                <Button href={CALENDLY} variant="primary" size="lg" trailingArrow className="w-full justify-center">
                  Book an Audit
                </Button>
              </div>
              <p className="text-[12px] leading-[1.5] text-[var(--ax-fg-3)]">
                We don&apos;t bill hourly. You get a fixed price before we
                start, and a clear scope of what&apos;s included.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* -- FAQ ---------------------------------------------------- */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          aria-labelledby="wfa-faq-heading"
        >
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-14">
              <Eyebrow className="mb-3.5">Common questions</Eyebrow>
              <h2
                id="wfa-faq-heading"
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
          headline="Find out which of your processes should stop involving a human."
          sub="Book a 15-minute call. We\u2019ll ask you about the tasks your team does on repeat and tell you what\u2019s worth automating and what isn\u2019t. No pitch, just a practical look at where your time is going."
          buttonLabel="Book an Audit"
        />
      </Reveal>
    </>
  )
}
