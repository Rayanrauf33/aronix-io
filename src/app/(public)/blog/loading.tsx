function Bone({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-[12px] bg-[var(--ax-slate-200)] ${className ?? ""}`}
    />
  )
}

function CardSkeleton() {
  return (
    <div className="rounded-[16px] border border-[var(--ax-border)] bg-white overflow-hidden">
      <Bone className="!rounded-none h-[200px]" />
      <div className="p-6">
        <Bone className="h-3 w-20 mb-4" />
        <Bone className="h-5 w-full mb-2" />
        <Bone className="h-5 w-3/4 mb-4" />
        <Bone className="h-3.5 w-full mb-1.5" />
        <Bone className="h-3.5 w-5/6" />
      </div>
    </div>
  )
}

export default function BlogLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section
        className="px-5 sm:px-12 pt-[144px] pb-14"
        style={{ background: "var(--ax-soft-blush)" }}
      >
        <div className="max-w-[1280px] mx-auto">
          <Bone className="h-3 w-24 mb-4" />
          <Bone className="h-10 w-[320px] max-w-full mb-3" />
          <Bone className="h-5 w-[480px] max-w-full" />
        </div>
      </section>

      {/* Filter + grid skeleton */}
      <section className="px-5 sm:px-12 pt-14 pb-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex gap-2 mb-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <Bone key={i} className="h-8 w-20 rounded-full" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
