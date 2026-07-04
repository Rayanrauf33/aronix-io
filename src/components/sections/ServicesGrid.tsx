import { ServiceCard } from "@/components/cards/ServiceCard"
import { Button } from "@/components/ui/Button"
import { Eyebrow } from "@/components/ui/Eyebrow"

const services = [
  {
    eyebrow: "CRM Integration",
    title: "Automate Lead Qualification From Any Source",
    description: "Score and route every inbound lead the moment it arrives. No spreadsheets, no manual data entry.",
    accent: "pink" as const,
    tools: [
      { name: "HubSpot", icon: "/Assets/icons/icons/hubspot.png" },
      { name: "Salesforce", icon: "/Assets/icons/icons/salesforce.png" },
    ],
    href: "/services#crm",
  },
  {
    eyebrow: "Finance Ops",
    title: "Close Your Books in Days, Not Weeks",
    description: "Reconcile transactions, match invoices and generate reports without manual intervention.",
    accent: "blue" as const,
    tools: [
      { name: "Stripe", icon: "/Assets/icons/icons/stripe.svg" },
      { name: "PayPal", icon: "/Assets/icons/icons/paypal.svg" },
    ],
    href: "/services#finance",
  },
  {
    eyebrow: "Internal Ops",
    title: "Eliminate Your Most Repetitive Admin Tasks",
    description: "From onboarding to reporting, we automate the work that quietly slows your team down.",
    accent: "indigo" as const,
    tools: [
      { name: "Notion", icon: "/Assets/icons/icons/notion.png" },
      { name: "Airtable", icon: "/Assets/icons/icons/airtable.svg" },
    ],
    href: "/services#ops",
  },
]

export function ServicesGrid() {
  return (
    <section
      className="px-12 py-24"
      aria-labelledby="services-heading"
      style={{ background: "linear-gradient(180deg, var(--ax-slate-100) 0%, var(--ax-soft-blush) 100%)" }}
    >
      <div className="max-w-[1280px] mx-auto">

        <div className="mb-14 max-w-[560px]">
          <Eyebrow className="mb-3.5">What we build</Eyebrow>
          <h2
            id="services-heading"
            className="text-[var(--ax-fg-1)] mb-4"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px, 3.5vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            The right automation for every part of your business
          </h2>
          <p className="text-[18px] leading-[1.6] text-[var(--ax-fg-2)]">
            From CRM and sales workflows to finance, marketing and internal ops, we build
            reliable systems that free your team from repetitive work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => <ServiceCard key={s.eyebrow} {...s} />)}
        </div>

        <div className="text-center mt-10">
          <Button href="/services" variant="outline" size="md" trailingArrow>
            View all services
          </Button>
        </div>
      </div>
    </section>
  )
}
