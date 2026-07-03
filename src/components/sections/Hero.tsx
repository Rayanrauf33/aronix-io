import { Button } from "@/components/ui/Button"
import { ToolMarquee } from "@/components/sections/ToolMarquee"
import { HeroGradient } from "@/components/sections/HeroGradient"

const heroTools = [
  { name: "HubSpot",    icon: "/Assets/icons/icons/hubspot.png" },
  { name: "Salesforce",  icon: "/Assets/icons/icons/salesforce.png" },
  { name: "Slack",       icon: "/Assets/icons/icons/slack.png" },
  { name: "Notion",      icon: "/Assets/icons/icons/notion.png" },
  { name: "Stripe",      icon: "/Assets/icons/icons/stripe.svg" },
  { name: "n8n",         icon: "/Assets/icons/icons/n8n.png" },
  { name: "Airtable",    icon: "/Assets/icons/icons/airtable.svg" },
  { name: "Make",        icon: "/Assets/icons/icons/make.png" },
  { name: "Zapier",      icon: "/Assets/icons/icons/zapier.png" },
  { name: "Shopify",     icon: "/Assets/icons/icons/shopify-icon-3.svg" },
]

export function Hero() {
  return (
    <section
      className="relative overflow-hidden text-center px-12 pt-[164px] pb-20"
      style={{ background: "var(--ax-gradient-hero-wash)" }}
      aria-labelledby="hero-heading"
    >
      <HeroGradient />
      <div className="relative z-10 max-w-[760px] mx-auto">

        {/* Eyebrow */}
        <div
          className="glass-pill inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full text-[11px] font-medium uppercase text-[var(--ax-fg-2)]"
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
          <Button href="/case-studies" variant="outline" size="lg">
            See a case study
          </Button>
        </div>

      </div>

      <div className="relative z-10">
        <ToolMarquee tools={heroTools} label="Connects with the tools you already use" pauseOnHover={false} />
      </div>
    </section>
  )
}
