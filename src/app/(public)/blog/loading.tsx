import { Skeleton } from "@/components/ui/Skeleton"

function CardSkeleton() {
  return (
    <div className="rounded-[16px] border border-[var(--ax-border)] bg-white overflow-hidden">
      <Skeleton className="rounded-none h-[200px]" />
      <div className="p-6">
        <Skeleton className="rounded-[8px] h-3 w-20 mb-4" />
        <Skeleton className="rounded-[8px] h-5 w-full mb-2" />
        <Skeleton className="rounded-[8px] h-5 w-3/4 mb-4" />
        <Skeleton className="rounded-[8px] h-3.5 w-full mb-1.5" />
        <Skeleton className="rounded-[8px] h-3.5 w-5/6" />
      </div>
    </div>
  )
}

export default function BlogLoading() {
  return (
    <div role="status" aria-label="Loading blog">
      <span className="sr-only">Loading blog posts</span>

      {/* Hero skeleton */}
      <section
        className="px-5 sm:px-12 pt-[144px] pb-14"
        style={{ background: "var(--ax-soft-blush)" }}
      >
        <div className="max-w-[1280px] mx-auto">
          <Skeleton className="rounded-[8px] h-3 w-24 mb-4" />
          <Skeleton className="rounded-[12px] h-10 w-[320px] max-w-full mb-3" />
          <Skeleton className="rounded-[8px] h-5 w-[480px] max-w-full" />
        </div>
      </section>

      {/* Filter + grid skeleton */}
      <section className="px-5 sm:px-12 pt-14 pb-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex gap-2 mb-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="rounded-full h-8 w-20" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
