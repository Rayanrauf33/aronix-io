import type { LucideIcon } from "lucide-react"

export type NodeType = "source" | "action" | "decision" | "output" | "human"

const styles: Record<NodeType, { bg: string; border: string; fg: string }> = {
  source:   { bg: "var(--ax-info-bg)", border: "var(--ax-sky-blue)",  fg: "var(--ax-info-text)" },
  action:   { bg: "var(--ax-pink-50)", border: "var(--ax-pink-200)",  fg: "var(--ax-pink-600)" },
  decision: { bg: "#FFFBEA",            border: "var(--ax-yellow)",    fg: "#7A6200" },
  output:   { bg: "#EEF0F9",            border: "#C7CEEF",             fg: "var(--ax-accent-dark)" },
  human:    { bg: "#FFF4EB",            border: "var(--ax-orange)",    fg: "#7A4A00" },
}

type Props = {
  type: NodeType
  label: string
  icon: LucideIcon
}

export function WorkflowNode({ type, label, icon: Icon }: Props) {
  const s = styles[type]
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center border-2"
        style={{ background: s.bg, borderColor: s.border, color: s.fg }}
      >
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--ax-fg-2)] whitespace-nowrap"
        style={{ fontFamily: "var(--ax-font-mono)" }}
      >
        {label}
      </span>
    </div>
  )
}
