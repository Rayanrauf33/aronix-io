import { Skeleton } from "@/components/ui/Skeleton"

function CardSkeleton() {
  return (
    <div className="rounded-[16px] border border-[var(--ax-border)] bg-white p-8">
      <Skeleton className="rounded-[8px] h-3 w-20 mb-5" />
      <Skeleton className="rounded-[8px] h-6 w-full mb-2" />
      <Skeleton className="rounded-[8px] h-6 w-3/4 mb-5" />
      <Skeleton className="rounded-[8px] h-4 w-full mb-1.5" />
      <Skeleton className="rounded-[8px] h-4 w-5/6 mb-6" />
      <div className="flex gap-4">
        <Skeleton className="rounded-[8px] h-12 w-24" />
        <Skeleton className="rounded-[8px] h-12 w-24" />
        <Skeleton className="rounded-[8px] h-12 w-24" />
      </div>
    </div>
  )
}

export default function CaseStudiesLoading() {
  return (
    <div role="status" aria-label="Loading case studies">
      <span className="sr-only">Loading case studies</span>

      {/* Hero skeleton */}
      <section
        className="px-5 sm:px-12 pt-[144px] pb-14"
        style={{ background: "var(--ax-soft-blush)" }}
      >
        <div className="max-w-[1280px] mx-auto">
          <Skeleton className="rounded-[8px] h-3 w-28 mb-4" />
          <Skeleton className="rounded-[12px] h-10 w-[400px] max-w-full mb-3" />
          <Skeleton className="rounded-[8px] h-5 w-[520px] max-w-full" />
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="px-5 sm:px-12 py-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
