import Link from "next/link"
import { ChevronRight } from "lucide-react"

export type Crumb = {
  label: string
  href?: string
}

type Props = {
  items: Crumb[]
}

export function Breadcrumbs({ items }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-[13px] text-[var(--ax-fg-3)] mb-6 flex-wrap"
    >
      {items.map((crumb, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={crumb.label} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight
                size={12}
                strokeWidth={1.75}
                aria-hidden="true"
                className="text-[var(--ax-border-strong)]"
              />
            )}
            {crumb.href && !isLast ? (
              <Link
                href={crumb.href}
                className="hover:text-[var(--ax-fg-1)] transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span aria-current={isLast ? "page" : undefined}>
                {crumb.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
