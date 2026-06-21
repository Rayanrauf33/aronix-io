import type { Metadata } from "next"
import { Hero }            from "@/components/sections/Hero"
import { MetricsStrip }    from "@/components/sections/MetricsStrip"
import { ServicesGrid }    from "@/components/sections/ServicesGrid"
import { HowItWorks }      from "@/components/sections/HowItWorks"
import { WorkflowDiagram } from "@/components/sections/WorkflowDiagram"
import { Integrations }    from "@/components/sections/Integrations"
import { Testimonials }    from "@/components/sections/Testimonials"
import { CtaBand }         from "@/components/sections/CtaBand"

export const metadata: Metadata = {
  title: "Aronix | Business Automation for Growing Companies",
  description:
    "Aronix builds custom automation that connects your CRM, finance tools, and internal ops — so your team stops firefighting and starts scaling. Trusted by 40+ growing companies.",
  openGraph: {
    title: "Aronix | Business Automation for Growing Companies",
    description:
      "Custom automation for CRM, finance ops, and internal workflows. Book a free workflow audit.",
    url: "https://aronix.io",
    siteName: "Aronix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aronix | Business Automation",
    description: "Custom automation for growing teams. Free workflow audit.",
  },
  alternates: { canonical: "https://aronix.io" },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <ServicesGrid />
      <HowItWorks />
      <WorkflowDiagram />
      <Integrations />
      <Testimonials />
      <CtaBand />
    </>
  )
}
