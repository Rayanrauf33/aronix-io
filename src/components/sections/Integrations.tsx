import { Chip } from "@/components/ui/Chip"
import { Eyebrow } from "@/components/ui/Eyebrow"

const tools = [
  "HubSpot", "Salesforce", "Slack", "Notion", "Stripe", "Xero",
  "Airtable", "Make", "Zapier", "Pipedrive", "QuickBooks", "ActiveCampaign",
]

export function Integrations() {
  return (
    <section
      className="px-12 py-16"
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

        <div className="flex flex-wrap justify-center gap-2">
          {tools.map((t) => (
            <Chip key={t} variant="outline" size="md">
              {t}
            </Chip>
          ))}
        </div>
      </div>
    </section>
  )
}
