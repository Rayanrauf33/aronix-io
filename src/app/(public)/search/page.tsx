import type { Metadata } from "next"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { PostCard } from "@/components/cards/BlogPostCard"
import { CaseStudyCard } from "@/components/cards/CaseStudyCard"
import { SearchForm } from "@/components/ui/SearchForm"
import { searchPosts } from "@/lib/supabase/blog"
import { searchCaseStudies } from "@/lib/supabase/case-studies"

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: false },
}

type SearchParams = Promise<{ q?: string }>

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams
  const query = q?.trim() ?? ""
  const hasQuery = query.length >= 2

  const [posts, caseStudies] = hasQuery
    ? await Promise.all([searchPosts(query, 6), searchCaseStudies(query, 4)])
    : [[], []]

  const total = posts.length + caseStudies.length

  return (
    <>
      <section
        className="px-5 sm:px-12 pt-[144px] pb-14"
        style={{ background: "var(--ax-soft-blush)" }}
      >
        <div className="max-w-[880px] mx-auto">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
          <Eyebrow className="mb-3.5">Search</Eyebrow>
          <h1
            className="text-[var(--ax-fg-1)] mb-6"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 800,
              fontSize: "clamp(28px, 3vw, 40px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {hasQuery
              ? `${total} result${total === 1 ? "" : "s"} for \u201c${query}\u201d`
              : "Find articles and case studies"}
          </h1>
          <SearchForm defaultValue={query} />
        </div>
      </section>

      <section className="px-5 sm:px-12 py-16" aria-label="Search results">
        <div className="max-w-[1280px] mx-auto">
          {!hasQuery && (
            <p className="text-[16px] text-[var(--ax-fg-2)] text-center py-12">
              Enter at least 2 characters to search.
            </p>
          )}

          {hasQuery && total === 0 && (
            <p className="text-[16px] text-[var(--ax-fg-2)] text-center py-12">
              No results found. Try a different search term.
            </p>
          )}

          {posts.length > 0 && (
            <div className="mb-14">
              <h2
                className="text-[var(--ax-fg-1)] mb-6"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "20px",
                  letterSpacing: "-0.01em",
                }}
              >
                Blog posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          )}

          {caseStudies.length > 0 && (
            <div>
              <h2
                className="text-[var(--ax-fg-1)] mb-6"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "20px",
                  letterSpacing: "-0.01em",
                }}
              >
                Case studies
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {caseStudies.map((cs) => (
                  <CaseStudyCard key={cs.id} caseStudy={cs} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
