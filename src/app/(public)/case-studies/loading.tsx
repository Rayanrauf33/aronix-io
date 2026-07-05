function Bone({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-[12px] bg-[var(--ax-slate-200)] ${className ?? ""}`}
    />
  )
}

function CardSkeleton() {
  return (
    <div className="rounded-[16px] border border-[var(--ax-border)] bg-white p-8">
      <Bone className="h-3 w-20 mb-5" />
      <Bone className="h-6 w-full mb-2" />
      <Bone className="h-6 w-3/4 mb-5" />
      <Bone className="h-4 w-full mb-1.5" />
      <Bone className="h-4 w-5/6 mb-6" />
      <div className="flex gap-4">
        <Bone className="h-12 w-24 !rounded-[8px]" />
        <Bone className="h-12 w-24 !rounded-[8px]" />
        <Bone className="h-12 w-24 !rounded-[8px]" />
      </div>
    </div>
  )
}

export default function CaseStudiesLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section
        className="px-5 sm:px-12 pt-[144px] pb-14"
        style={{ background: "var(--ax-soft-blush)" }}
      >
        <div className="max-w-[1280px] mx-auto">
          <Bone className="h-3 w-28 mb-4" />
          <Bone className="h-10 w-[400px] max-w-full mb-3" />
          <Bone className="h-5 w-[520px] max-w-full" />
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
    </>
  )
}
