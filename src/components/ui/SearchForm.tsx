"use client"

import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"
import { Search } from "lucide-react"
import { analytics } from "@/lib/analytics"

type Props = {
  defaultValue?: string
}

export function SearchForm({ defaultValue = "" }: Props) {
  const router = useRouter()
  const [query, setQuery] = useState(defaultValue)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed.length < 2) return
    analytics.searchQuery(trimmed, 0)
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="flex gap-3 max-w-[480px]">
      <div className="relative flex-1">
        <Search
          size={18}
          strokeWidth={1.75}
          aria-hidden="true"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ax-fg-3)]"
        />
        <input
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles and case studies..."
          aria-label="Search"
          className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border border-[var(--ax-border)] bg-white text-[15px] text-[var(--ax-fg-1)] placeholder:text-[var(--ax-fg-3)] focus-visible:border-[var(--ax-primary)] focus-visible:outline-2 focus-visible:outline-[var(--ax-primary)] focus-visible:outline-offset-2"
          style={{ fontFamily: "var(--ax-font-body)" }}
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 rounded-[10px] bg-[var(--ax-primary)] text-white text-[14px] font-semibold hover:bg-[var(--ax-primary-dark)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ax-primary)] focus-visible:outline-offset-2"
        style={{ fontFamily: "var(--ax-font-body)" }}
      >
        Search
      </button>
    </form>
  )
}
