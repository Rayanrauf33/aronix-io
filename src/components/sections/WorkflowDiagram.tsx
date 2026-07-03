import { Button } from "@/components/ui/Button"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { WorkflowNode, type NodeType } from "@/components/ui/WorkflowNode"
import { Connector } from "@/components/ui/Connector"
import { FileText, Zap, HelpCircle, Send, UserCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const flow: { type: NodeType; label: string; icon: LucideIcon }[] = [
  { type: "source",   label: "Form",     icon: FileText },
  { type: "action",   label: "Enrich",   icon: Zap },
  { type: "decision", label: "Qualify?", icon: HelpCircle },
  { type: "output",   label: "Route",    icon: Send },
  { type: "human",    label: "Approve",  icon: UserCheck },
]

const activeConnectors = new Set([2, 3])

export function WorkflowDiagram() {
  return (
    <section className="px-5 sm:px-12 py-24" aria-labelledby="workflow-heading">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

        <div>
          <Eyebrow className="mb-3.5">How automations look</Eyebrow>
          <h2
            id="workflow-heading"
            className="mb-4 text-[var(--ax-fg-1)]"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3vw, 40px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Every workflow is mapped before it&apos;s built
          </h2>
          <p className="text-[18px] leading-[1.6] text-[var(--ax-fg-2)] mb-6 max-w-[480px]">
            We diagram each automation step so your team can see exactly what runs,
            when it runs, and who&apos;s responsible when something needs review.
          </p>
          <Button href="/case-study" variant="outline" size="md" trailingArrow>
            Read a case study
          </Button>
        </div>

        <div
          className="rounded-[24px] p-6 px-4 sm:p-10 sm:px-8 border border-[var(--ax-border)]"
          style={{ background: "var(--ax-slate-100)" }}
          role="img"
          aria-label="CRM Lead Qualification workflow: Form, Enrich, Qualify, Route, Approve"
        >
          <div
            className="text-[10px] uppercase text-[var(--ax-fg-3)] mb-6"
            style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.08em" }}
          >
            CRM Lead qualification &mdash; Aronix diagram
          </div>

          <div className="flex items-start flex-nowrap overflow-x-auto" aria-hidden="true">
            {flow.map(({ type, label, icon }, i) => (
              <div key={label} className="flex items-start flex-shrink-0">
                <WorkflowNode type={type} label={label} icon={icon} />
                {i < flow.length - 1 && <Connector active={activeConnectors.has(i)} />}
              </div>
            ))}
          </div>

          <p className="mt-6 text-[13px] leading-[1.5] text-[var(--ax-fg-3)]">
            Pink connectors = automated path. Yellow node = human review gate before CRM update.
          </p>
        </div>
      </div>
    </section>
  )
}
