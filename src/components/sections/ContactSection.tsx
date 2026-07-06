import { Clock, Mail, Shield } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { ContactForm } from "@/components/sections/ContactForm"

type MetaItem = { icon: LucideIcon; title: string; description: string }

const meta: MetaItem[] = [
  {
    icon: Clock,
    title: "45-minute session",
    description: "A focused walkthrough of your top workflow bottleneck.",
  },
  {
    icon: Mail,
    title: "Reply within one business day",
    description: "We confirm every enquiry personally.",
  },
  {
    icon: Shield,
    title: "NDA available on request",
    description: "We keep your process details confidential by default.",
  },
]

export function ContactSection() {
  return (
    <section className="px-5 sm:px-12 py-16 bg-white" aria-label="Audit request">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          <div>
            <h2
              className="text-[var(--ax-fg-1)] mb-4"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 700,
                fontSize: "clamp(28px, 3vw, 40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              We&apos;ll identify what&apos;s worth automating first
            </h2>
            <p className="text-[17px] leading-[1.6] text-[var(--ax-fg-2)] mb-10">
              In 45 minutes, we&apos;ll map your highest-cost manual process,
              estimate the time saved, and outline a realistic automation plan.
              No obligation, no pitch. Just a clear view of what&apos;s possible.
            </p>

            <ul className="flex flex-col gap-4 list-none p-0">
              {meta.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex items-start gap-3">
                  <span
                    className="w-10 h-10 rounded-[12px] inline-flex items-center justify-center shrink-0"
                    style={{ background: "var(--ax-pink-50)", color: "var(--ax-pink-600)" }}
                    aria-hidden="true"
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <div>
                    <div className="text-[15px] font-semibold text-[var(--ax-fg-1)] mb-0.5">{title}</div>
                    <div className="text-[14px] text-[var(--ax-fg-2)]">{description}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
