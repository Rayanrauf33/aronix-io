import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

type Props = {
  icon: LucideIcon
  name: string
  outcome: string
  href: string
}

export function ServiceCard({ icon: Icon, name, outcome, href }: Props) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 p-6 sm:p-8 rounded-[var(--ax-radius-xl)] no-underline glass-card"
    >
      <span
        className="w-10 h-10 rounded-[var(--ax-radius-md)] inline-flex items-center justify-center"
        style={{ background: "var(--ax-pink-50)", color: "var(--ax-pink-600)" }}
        aria-hidden="true"
      >
        <Icon size={20} strokeWidth={1.75} />
      </span>

      <h3
        className="m-0 text-[var(--ax-fg-1)]"
        style={{
          fontFamily: "var(--ax-font-display)",
          fontWeight: 600,
          fontSize: "var(--ax-fs-h4)",
          lineHeight: "var(--ax-lh-snug)",
          letterSpacing: "var(--ax-tracking-tight)",
        }}
      >
        {name}
      </h3>

      <p className="m-0 text-[15px] leading-[1.6] text-[var(--ax-fg-2)]">
        {outcome}
      </p>

      <span className="mt-auto inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--ax-pink-700)]">
        Learn more
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
