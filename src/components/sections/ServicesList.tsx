import Image from "next/image"
import { Check, FileText, Zap, HelpCircle, Send, UserCheck, CreditCard, GitCompare, BarChart3, Bell, ClipboardList } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { WorkflowNode, type NodeType } from "@/components/ui/WorkflowNode"
import { Connector } from "@/components/ui/Connector"

type FlowStep = { type: NodeType; label: string; icon: LucideIcon }
type Tool = { name: string; icon: string }

type Service = {
  id: string
  eyebrow: string
  title: string
  body: string
  outcomes: string[]
  tools: Tool[]
  flow: FlowStep[]
}

const services: Service[] = [
  {
    id: "crm",
    eyebrow: "CRM Integration",
    title: "Automate Lead Qualification From Any Source",
    body: "We build end-to-end lead pipelines that capture, enrich, score and route every inbound lead the moment it arrives, whether from your website forms, ad platforms, or inbound email.",
    outcomes: [
      "Score and route leads in under 60 seconds",
      "Eliminate duplicate records across CRM tools",
      "Trigger personalised follow-up without manual input",
    ],
    tools: [
      { name: "HubSpot", icon: "/Assets/icons/icons/hubspot.png" },
      { name: "Salesforce", icon: "/Assets/icons/icons/salesforce.png" },
      { name: "Slack", icon: "/Assets/icons/icons/slack.png" },
    ],
    flow: [
      { type: "source",   label: "Form",   icon: FileText },
      { type: "action",   label: "Enrich", icon: Zap },
      { type: "decision", label: "Score",  icon: HelpCircle },
      { type: "output",   label: "Route",  icon: Send },
    ],
  },
  {
    id: "finance",
    eyebrow: "Finance Ops",
    title: "Close Your Books in Days, Not Weeks",
    body: "We connect your payment processor, invoicing tool and accounting platform so reconciliation happens automatically. Exceptions are flagged; approvals stay with your team.",
    outcomes: [
      "Reduce month-end close from 5 days to 6 hours",
      "Reconcile every transaction without manual matching",
      "Generate P&L drafts with a single trigger",
    ],
    tools: [
      { name: "Stripe", icon: "/Assets/icons/icons/stripe.svg" },
      { name: "PayPal", icon: "/Assets/icons/icons/paypal.svg" },
      { name: "Google Sheets", icon: "/Assets/icons/icons/sheets.png" },
    ],
    flow: [
      { type: "source",   label: "Stripe", icon: CreditCard },
      { type: "action",   label: "Match",  icon: GitCompare },
      { type: "decision", label: "Delta?", icon: HelpCircle },
      { type: "output",   label: "Report", icon: BarChart3 },
    ],
  },
  {
    id: "ops",
    eyebrow: "Internal Ops",
    title: "Eliminate Your Most Repetitive Admin Tasks",
    body: "From new-hire onboarding to internal reporting, we automate the behind-the-scenes admin that quietly eats 2–3 hours of your team's day.",
    outcomes: [
      "Onboard new hires without a single manual checklist",
      "Deliver weekly ops reports automatically",
      "Route approvals without chasing by Slack",
    ],
    tools: [
      { name: "Notion", icon: "/Assets/icons/icons/notion.png" },
      { name: "Airtable", icon: "/Assets/icons/icons/airtable.svg" },
      { name: "Slack", icon: "/Assets/icons/icons/slack.png" },
    ],
    flow: [
      { type: "source",  label: "Trigger", icon: Zap },
      { type: "action",  label: "Notify",  icon: Bell },
      { type: "human",   label: "Approve", icon: UserCheck },
      { type: "output",  label: "Log",     icon: ClipboardList },
    ],
  },
]

export function ServicesList() {
  return (
    <section className="px-5 sm:px-12 py-16" aria-label="Service detail">
      <div className="max-w-[1280px] mx-auto">
        {services.map((s, i) => {
          const reversed = i % 2 === 1
          const activeFrom = Math.floor(s.flow.length / 2)
          return (
            <article
              key={s.id}
              id={s.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 ${
                i < services.length - 1 ? "border-b border-[var(--ax-border)]" : ""
              } ${i === 0 ? "pt-0" : ""}`}
            >
              <div className={reversed ? "lg:order-2" : ""}>
                <div
                  className="text-[11px] font-medium uppercase text-[var(--ax-primary-dark)] mb-3"
                  style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.1em" }}
                >
                  {s.eyebrow}
                </div>
                <h2
                  className="text-[var(--ax-fg-1)] mb-4"
                  style={{
                    fontFamily: "var(--ax-font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(26px, 2.6vw, 32px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {s.title}
                </h2>
                <p className="text-[16px] leading-[1.65] text-[var(--ax-fg-2)] mb-6">
                  {s.body}
                </p>

                <ul className="flex flex-col gap-2.5 mb-7 list-none p-0">
                  {s.outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex items-start gap-2.5 text-[15px] text-[var(--ax-fg-2)]"
                    >
                      <span
                        className="shrink-0 mt-0.5 text-[var(--ax-pink-600)]"
                        aria-hidden="true"
                      >
                        <Check size={18} strokeWidth={2} />
                      </span>
                      {o}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-7">
                  {s.tools.map(({ name, icon }) => (
                    <span key={name} className="glass-chip">
                      <Image src={icon} alt={name} width={18} height={18} style={{ width: 18, height: 18, objectFit: "contain" }} />
                      {name}
                    </span>
                  ))}
                </div>

                <Button href="/contact" variant="primary" size="md" trailingArrow>
                  Get started with {s.eyebrow}
                </Button>
              </div>

              <div
                className={`rounded-[24px] p-5 sm:p-8 bg-white border border-[var(--ax-border)] ${
                  reversed ? "lg:order-1" : ""
                }`}
                role="img"
                aria-label={`${s.eyebrow} automation diagram: ${s.flow.map((f) => f.label).join(", ")}`}
              >
                <div
                  className="text-[10px] uppercase text-[var(--ax-fg-3)] mb-6 text-center"
                  style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.08em" }}
                >
                  Automation diagram
                </div>
                <div className="flex items-start justify-center flex-nowrap overflow-x-auto" aria-hidden="true">
                  {s.flow.map((step, fi) => (
                    <div key={step.label} className="flex items-start flex-shrink-0">
                      <WorkflowNode type={step.type} label={step.label} icon={step.icon} />
                      {fi < s.flow.length - 1 && <Connector active={fi >= activeFrom - 1} />}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
