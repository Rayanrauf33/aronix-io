import { Button } from "@/components/ui/Button"
import { Chip } from "@/components/ui/Chip"

const tools = [
  "HubSpot", "Salesforce", "Slack", "Notion", "Stripe",
  "Xero", "Airtable", "Make", "Zapier", "Pipedrive",
]

export function Hero() {
  return (
    <section
      className="text-center px-12 pt-[164px] pb-20"
      style={{ background: "var(--ax-gradient-hero-wash)" }}
      aria-labelledby="hero-heading"
    >
      <div className="max-w-[760px] mx-auto">

        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 bg-white rounded-full border border-[var(--ax-border)] text-[11px] font-medium uppercase text-[var(--ax-fg-2)]"
          style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.08em" }}
        >
          <span className="pulse-dot" aria-hidden="true" />
          Trusted by 40+ growing companies
        </div>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="text-[var(--ax-fg-1)] mb-6"
          style={{
            fontFamily: "var(--ax-font-display)",
            fontWeight: 800,
            fontSize: "clamp(44px, 5.5vw, 72px)",
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
          }}
        >
          Turn manual work into<br />
          <span className="gradient-underline">reliable</span> automated systems
        </h1>

        {/* Lead */}
        <p className="text-[19px] leading-[1.6] text-[var(--ax-fg-2)] max-w-[600px] mx-auto mb-10">
          Aronix maps the steps your team still does by hand, then builds the
          automation that removes them &mdash; quietly, in the background, every time.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button
            href="https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"
            variant="primary"
            size="lg"
            trailingArrow
          >
            Book an Automation Audit
          </Button>
          <Button href="/case-study" variant="outline" size="lg">
            See a case study
          </Button>
        </div>

        {/* Tools */}
        <div className="mt-14">
          <div
            className="text-[11px] uppercase text-[var(--ax-fg-3)] mb-3.5"
            style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.06em" }}
          >
            Connects with the tools you already use
          </div>
          <div className="flex flex-wrap justify-center gap-2" role="list" aria-label="Supported integrations">
            {tools.map((t) => (
              <Chip key={t} variant="outline" size="sm">
                {t}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
