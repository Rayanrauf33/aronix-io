import type { Metadata } from "next"
import { ContactHero } from "@/components/sections/ContactHero"
import { ContactSection } from "@/components/sections/ContactSection"
import { Faq } from "@/components/sections/Faq"

export const metadata: Metadata = {
  title: "Contact | Aronix",
  description:
    "Book your free 45-minute automation audit. We'll map your highest-cost manual process and outline a realistic automation plan.",
  openGraph: {
    title: "Contact | Aronix",
    description:
      "Book your free 45-minute automation audit with Aronix.",
    url: "https://aronix.io/contact",
    siteName: "Aronix",
    type: "website",
  },
  alternates: { canonical: "https://aronix.io/contact" },
}

const faqItems = [
  {
    label: "How long does an automation project take?",
    content:
      "Most projects run 4–6 weeks from kick-off to go-live. Simpler automations (single workflow, one integration) can be live in two weeks.",
  },
  {
    label: "Do you work with companies that have no existing automation?",
    content:
      "Yes. Most of our clients are starting from spreadsheets and manual processes. We'll audit first and recommend the right starting point.",
  },
  {
    label: "How do you handle errors or downtime?",
    content:
      "Every automation includes a monitoring layer that retries on failure, alerts your team, and logs every run. We set up alerting thresholds during onboarding.",
  },
  {
    label: "What tools do you support?",
    content:
      "200+ tools via native integrations and REST APIs. If your tool has an API, we can automate it. We'll confirm compatibility in the free audit.",
  },
  {
    label: "Do you offer ongoing support?",
    content:
      "Yes. Retainer plans include monitoring, updates, and new automations as your workflows evolve. We're also available ad-hoc.",
  },
]

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <Faq items={faqItems} title="Everything you need to know" />
    </>
  )
}
