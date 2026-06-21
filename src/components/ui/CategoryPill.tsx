type Style = { bg: string; text: string; border: string }

const styles: Record<string, Style> = {
  "CRM Integration": { bg: "var(--ax-pink-50)",   text: "var(--ax-pink-700)",     border: "var(--ax-pink-200)" },
  "Finance Ops":     { bg: "var(--ax-info-bg)",   text: "var(--ax-info-text)",    border: "var(--ax-sky-blue)" },
  "Internal Ops":    { bg: "#EEF0F9",             text: "var(--ax-accent-deep)",  border: "#C7CEEF" },
  "Strategy":        { bg: "var(--ax-slate-200)", text: "var(--ax-fg-2)",         border: "var(--ax-border)" },
}

const fallback: Style = styles["Strategy"]

type Props = {
  category: string
  className?: string
}

export function CategoryPill({ category, className }: Props) {
  const s = styles[category] ?? fallback
  return (
    <span
      className={`inline-flex items-center text-[10px] font-medium uppercase px-2.5 py-1 rounded-[4px] ${className ?? ""}`}
      style={{
        background: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
        fontFamily: "var(--ax-font-mono)",
        letterSpacing: "0.08em",
      }}
    >
      {category}
    </span>
  )
}

export function categoryGradient(category: string): string {
  switch (category) {
    case "CRM Integration": return "linear-gradient(135deg,#FFDFF0 0%,#EA4B71 100%)"
    case "Finance Ops":     return "linear-gradient(135deg,#D3EDF8 0%,#1A5F80 100%)"
    case "Internal Ops":    return "linear-gradient(135deg,#E8EBFB 0%,#2E3A73 100%)"
    case "Strategy":        return "linear-gradient(135deg,#F5F5F5 0%,#2A2A2A 100%)"
    default:                return "linear-gradient(135deg,#EBDCE0 0%,#A82949 100%)"
  }
}
