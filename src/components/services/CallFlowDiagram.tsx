import { WorkflowNode, type NodeType } from "@/components/ui/WorkflowNode"
import { Connector } from "@/components/ui/Connector"
import type { LucideIcon } from "lucide-react"

export type FlowStep = {
  type: NodeType
  label: string
  icon: LucideIcon
}

type Props = {
  /** Mono-cased diagram title shown above the flow */
  title: string
  /** Ordered list of nodes in the call flow */
  steps: FlowStep[]
  /** Connector indices (0-based, between step i and step i+1) that render pink/automated. All others render muted. */
  automatedConnectors?: number[]
  /** Accessible description of the full flow */
  ariaLabel: string
  /** Caption below the diagram */
  caption?: string
}

export function CallFlowDiagram({
  title,
  steps,
  automatedConnectors = [],
  ariaLabel,
  caption = "Pink connectors = automated path. Yellow node = human review gate.",
}: Props) {
  const activeSet = new Set(automatedConnectors)

  return (
    <div
      className="rounded-[var(--ax-radius-xl)] p-6 px-4 sm:p-10 sm:px-8 border border-[var(--ax-border)]"
      style={{ background: "var(--ax-slate-100)" }}
      role="img"
      aria-label={ariaLabel}
    >
      <div
        className="text-[10px] uppercase text-[var(--ax-fg-3)] mb-6"
        style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.08em" }}
      >
        {title}
      </div>

      <div className="flex items-start flex-nowrap overflow-x-auto" aria-hidden="true">
        {steps.map(({ type, label, icon }, i) => (
          <div key={label} className="flex items-start shrink-0">
            <WorkflowNode type={type} label={label} icon={icon} />
            {i < steps.length - 1 && <Connector active={activeSet.has(i)} />}
          </div>
        ))}
      </div>

      {caption && (
        <p className="mt-6 text-[13px] leading-[1.5] text-[var(--ax-fg-3)]">
          {caption}
        </p>
      )}
    </div>
  )
}
