const metrics = [
  { val: "40+", lbl: "Companies automated" },
  { val: "14h", lbl: "Avg hours saved per week" },
  { val: "98%", lbl: "Automation uptime" },
  { val: "3×",  lbl: "Avg team throughput gain" },
]

export function MetricsStrip() {
  return (
    <section
      aria-label="Key metrics"
      className="px-12 py-16"
      style={{ background: "var(--ax-surface-dark)" }}
    >
      <div className="max-w-[1280px] mx-auto">
        <dl className="flex items-stretch gap-6 flex-col sm:flex-row">
          {metrics.map(({ val, lbl }, i) => (
            <div key={lbl} className="flex flex-1 items-stretch">
              <div className="flex-1 text-center py-8 px-6">
                <dt
                  className="text-white"
                  style={{
                    fontFamily: "var(--ax-font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(40px, 4vw, 56px)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {val}
                </dt>
                <dd className="text-[14px] text-[var(--ax-fg-on-dark-2)] mt-2">{lbl}</dd>
              </div>
              {i < metrics.length - 1 && (
                <div className="hidden sm:block w-px self-stretch bg-white/10" aria-hidden="true" />
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
