import Link from "next/link"
import { cn } from "@/lib/utils"

type Props = {
  categories: string[]
  active?: string
}

export function CategoryFilter({ categories, active }: Props) {
  const items = ["All", ...categories]
  const current = active ?? "All"
  return (
    <nav aria-label="Filter posts by category" className="flex items-center gap-2 flex-wrap mb-12">
      {items.map((c) => {
        const isActive = c === current
        const href = c === "All" ? "/blog" : `/blog?category=${encodeURIComponent(c)}`
        return (
          <Link
            key={c}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "px-4 py-2 rounded-full border text-[14px] font-medium whitespace-nowrap transition-all duration-150 ease-out",
              isActive
                ? "bg-[var(--ax-slate-900)] text-white border-[var(--ax-slate-900)]"
                : "bg-white text-[var(--ax-fg-2)] border-[var(--ax-border)] hover:border-[var(--ax-border-strong)] hover:text-[var(--ax-fg-1)]",
            )}
          >
            {c}
          </Link>
        )
      })}
    </nav>
  )
}
