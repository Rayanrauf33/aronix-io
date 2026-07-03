interface MonthData {
  label: string
  count: number
}

export function MonthlyChart({ data }: { data: MonthData[] }) {
  const max = Math.max(...data.map(d => d.count), 1)

  return (
    <div className="chart-card">
      <p className="chart-title">Publishing Trend</p>
      {data.every(d => d.count === 0) ? (
        <p className="s-body-sm" style={{ color: "var(--ax-fg-3)" }}>
          No posts in the last 6 months.
        </p>
      ) : (
        <div className="vbar-chart">
          {data.map(({ label, count }) => (
            <div key={label} className="vbar-col">
              <span className="vbar-value">{count}</span>
              <div
                className="vbar-fill"
                style={{ height: `${(count / max) * 100}%` }}
              />
              <span className="vbar-label">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
