import { ArrowRight, Zap, DollarSign, Settings } from "lucide-react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

type Accent = "pink" | "blue" | "indigo"

const iconMap: Record<string, LucideIcon> = {
  pink: Zap,
  blue: DollarSign,
  indigo: Settings,
}

const accentStyles: Record<Accent, { bg: string; fg: string }> = {
  pink:   { bg: "var(--ax-pink-50)", fg: "var(--ax-pink-500)" },
  blue:   { bg: "var(--ax-info-bg)", fg: "var(--ax-info-text)" },
  indigo: { bg: "#EEF0F9",            fg: "var(--ax-accent-deep)" },
}

type Props = {
  eyebrow: string
  title: string
  description: string
  accent?: Accent
  chips?: string[]
  href?: string
}

export function ServiceCard({ eyebrow, title, description, accent = "pink", chips = [], href = "#" }: Props) {
  const Icon = iconMap[accent] ?? Zap
  const a = accentStyles[accent]

  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 p-8 min-h-[260px] bg-white border border-[var(--ax-border)] rounded-[24px] no-underline transition-all duration-200 ease-out hover:border-[var(--ax-border-strong)] hover:shadow-[var(--ax-shadow-md)] hover:-translate-y-0.5"
    >
      <span
        className="text-[11px] font-medium uppercase text-[var(--ax-fg-3)]"
        style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.1em" }}
      >
        {eyebrow}
      </span>

      <span
        className="w-10 h-10 rounded-[12px] inline-flex items-center justify-center"
        style={{ background: a.bg, color: a.fg }}
        aria-hidden="true"
      >
        <Icon size={20} strokeWidth={1.75} />
      </span>

      <h3
        className="m-0 text-[var(--ax-fg-1)]"
        style={{
          fontFamily: "var(--ax-font-display)",
          fontWeight: 600,
          fontSize: "22px",
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>

      <p className="m-0 text-[15px] leading-[1.6] text-[var(--ax-fg-2)]">{description}</p>

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {chips.slice(0, 2).map((c) => (
            <span
              key={c}
              className="px-2.5 py-1 rounded-full text-[12px] font-medium bg-[var(--ax-slate-200)] text-[var(--ax-fg-2)]"
            >
              {c}
            </span>
          ))}
        </div>
      )}

      <span className="mt-auto inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--ax-pink-700)]">
        Explore this service
        <ArrowRight
          size={16}
          strokeWidth={1.75}
          className="transition-transform duration-150 ease-out group-hover:translate-x-[3px]"
          aria-hidden="true"
        />
      </span>
    </Link>
  )
}
