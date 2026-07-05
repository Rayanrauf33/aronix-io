import { Skeleton } from "@/components/ui/Skeleton"

export default function CaseStudyLoading() {
  return (
    <div role="status" aria-label="Loading case study">
      <span className="sr-only">Loading case study</span>

      {/* Hero skeleton */}
      <section
        className="px-5 sm:px-12 pt-[144px] pb-14"
        style={{ background: "var(--ax-soft-blush)" }}
      >
        <div className="max-w-[880px] mx-auto">
          <Skeleton className="rounded-[8px] h-3.5 w-28 mb-8" />
          <Skeleton className="rounded-[8px] h-3 w-20 mb-3.5" />
          <Skeleton className="rounded-[12px] h-10 w-full max-w-[600px] mb-2" />
          <Skeleton className="rounded-[12px] h-10 w-3/4 max-w-[450px] mb-4" />
          <Skeleton className="rounded-[8px] h-3.5 w-36" />
        </div>
      </section>

      {/* Results skeleton */}
      <section className="px-5 sm:px-12 py-12">
        <div className="max-w-[880px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="text-center rounded-[16px] border border-[var(--ax-border)] bg-white px-6 py-8"
            >
              <Skeleton className="rounded-[8px] h-9 w-24 mx-auto mb-2" />
              <Skeleton className="rounded-[8px] h-3 w-32 mx-auto" />
            </div>
          ))}
        </div>
      </section>

      {/* Body skeleton */}
      <section className="px-5 sm:px-12 py-10">
        <div className="max-w-[720px] mx-auto">
          <Skeleton className="rounded-[8px] h-6 w-40 mb-4" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="rounded-[8px] h-3.5 w-full mb-2.5" />
          ))}
          <Skeleton className="rounded-[8px] h-3.5 w-2/3 mb-12" />
          <Skeleton className="rounded-[8px] h-6 w-36 mb-4" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="rounded-[8px] h-3.5 w-full mb-2.5" />
          ))}
        </div>
      </section>
    </div>
  )
}
