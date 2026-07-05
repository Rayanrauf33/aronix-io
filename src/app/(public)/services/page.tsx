import type { Metadata } from "next"
import { ServicesHero } from "@/components/sections/ServicesHero"
import { ServicesList } from "@/components/sections/ServicesList"
import { Faq } from "@/components/sections/Faq"
import { CtaBand } from "@/components/sections/CtaBand"
import { Reveal } from "@/components/ui/Reveal"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom automation for CRM, finance ops, and internal workflows. We design, build and monitor the systems that remove manual work from your team's day.",
  openGraph: {
    title: "Services | Aronix",
    description:
      "Automation services for CRM, finance and internal ops. Free audit included.",
    url: "/services",
    siteName: "Aronix",
    locale: "en_GB",
    type: "website",
  },
  alternates: { canonical: "/services" },
}

const faqItems = [
  {
    label: "Which services should we start with?",
    content:
      "We recommend starting with the workflow that costs your team the most time per week. For most companies that's CRM lead handling or month-end finance close. Both have fast, measurable payoff, and the free audit identifies the best starting point for your specific situation.",
  },
  {
    label: "Do you work with companies that have no existing automation?",
    content:
      "Yes. The majority of our clients start from spreadsheets, email chains and manual CRM updates. We audit first, then recommend the right tools and build the automation alongside you. No prior automation experience required.",
  },
  {
    label: "How long does a typical project take?",
    content:
      "Most projects run 4–6 weeks from kick-off to go-live. A single-workflow automation (e.g. one CRM pipeline or one finance reconciliation) can be live in two weeks. Complex multi-system builds with several decision branches take 6–8 weeks.",
  },
  {
    label: "Do you build the automations or do we?",
    content:
      "We build everything. You give us access to your tools, walk us through the workflow once, and we handle design, build, testing and handover. Your team reviews before anything touches live data.",
  },
  {
    label: "What happens when something breaks?",
    content:
      "Every automation we build includes a monitoring layer that catches failures, retries automatically, and alerts your team if manual intervention is needed. We also offer retainer plans that cover ongoing monitoring, updates and fixes as your workflows evolve.",
  },
  {
    label: "Can you connect tools not on your integration list?",
    content:
      "If it has a REST API or webhook support, we can integrate it. We'll confirm compatibility in the free audit. For tools without a public API, we can often use browser automation or middleware as a bridge.",
  },
]

export default function ServicesPage() {
  return (
    <>
      <Reveal><ServicesHero /></Reveal>
      <Reveal><ServicesList /></Reveal>
      <Reveal><Faq items={faqItems} /></Reveal>
      <Reveal>
        <CtaBand
          title="Not sure which service fits your workflow?"
          lead="Book a free audit. We'll identify the best starting point for your team."
          primaryCta={{
            label: "Book a Free Audit",
            href: "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session",
            variant: "dark",
            trailingArrow: true,
          }}
          secondaryCta={null}
        />
      </Reveal>
    </>
  )
}
