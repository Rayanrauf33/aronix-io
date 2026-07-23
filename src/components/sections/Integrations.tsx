import { Eyebrow } from "@/components/ui/Eyebrow"
import { ToolMarquee } from "@/components/sections/ToolMarquee"

const tools = [
  { name: "HubSpot",     icon: "/Assets/icons/icons/hubspot.png" },
  { name: "Salesforce",   icon: "/Assets/icons/icons/salesforce.png" },
  { name: "Slack",        icon: "/Assets/icons/icons/slack.png" },
  { name: "Notion",       icon: "/Assets/icons/icons/notion.png" },
  { name: "Stripe",       icon: "/Assets/icons/icons/stripe.svg" },
  { name: "Gmail",        icon: "/Assets/icons/icons/gmail-icon-3.svg" },
  { name: "Airtable",     icon: "/Assets/icons/icons/airtable.svg" },
  { name: "Make",         icon: "/Assets/icons/icons/make.png" },
  { name: "Zapier",       icon: "/Assets/icons/icons/zapier.png" },
  { name: "Monday",       icon: "/Assets/icons/icons/monday.svg" },
  { name: "Google Sheets", icon: "/Assets/icons/icons/sheets.png" },
  { name: "Mailchimp",    icon: "/Assets/icons/icons/mailchimp-icon-3.svg" },
]

export function Integrations() {
  return (
    <section
      className="px-5 sm:px-12 py-16"
      aria-labelledby="integrations-heading"
      style={{ background: "var(--ax-soft-blush)" }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-8">
          <Eyebrow className="mb-3.5">200+ integrations</Eyebrow>
          <h2
            id="integrations-heading"
            className="text-[var(--ax-fg-1)]"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 700,
              fontSize: "clamp(26px, 2.8vw, 36px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Works with the tools you already have
          </h2>
        </div>
      </div>

      <ToolMarquee tools={tools} pauseOnHover={false} />
    </section>
  )
}
