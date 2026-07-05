function Bone({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-[12px] bg-[var(--ax-slate-200)] ${className ?? ""}`}
    />
  )
}

export default function ArticleLoading() {
  return (
    <>
      {/* Header skeleton */}
      <section
        className="px-5 sm:px-12 pt-[120px] pb-12"
        style={{ background: "var(--ax-soft-blush)" }}
      >
        <div className="max-w-[1280px] mx-auto">
          <Bone className="h-3 w-32 mb-6" />
          <Bone className="h-10 w-full max-w-[700px] mb-3" />
          <Bone className="h-10 w-3/4 max-w-[540px] mb-7" />
          <div className="flex items-center gap-3.5">
            <Bone className="!rounded-full h-[42px] w-[42px] shrink-0" />
            <div>
              <Bone className="h-3.5 w-28 mb-1.5" />
              <Bone className="h-3 w-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Cover skeleton */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-12">
        <Bone className="h-[380px] !rounded-t-none !rounded-b-[24px]" />
      </div>

      {/* Body skeleton */}
      <section className="px-5 sm:px-12 pt-14 pb-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_292px] gap-12 lg:gap-[72px] items-start">
            <div>
              <Bone className="h-4 w-full mb-2" />
              <Bone className="h-4 w-5/6 mb-12" />
              {Array.from({ length: 8 }).map((_, i) => (
                <Bone key={i} className="h-3.5 w-full mb-2.5" />
              ))}
              <Bone className="h-3.5 w-2/3 mb-8" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Bone key={i} className="h-3.5 w-full mb-2.5" />
              ))}
            </div>
            <div className="flex flex-col gap-5">
              <Bone className="h-[88px] !rounded-[16px]" />
              <Bone className="h-[180px] !rounded-[16px]" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
