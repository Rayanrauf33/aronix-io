interface CategoryData {
  name: string
  count: number
}

export function CategoryChart({ data }: { data: CategoryData[] }) {
  const max = Math.max(...data.map(d => d.count), 1)

  return (
    <div className="chart-card">
      <p className="chart-title">Posts by Category</p>
      {data.length === 0 ? (
        <p className="s-body-sm" style={{ color: "var(--ax-fg-3)" }}>
          No posts yet.
        </p>
      ) : (
        <div className="bar-chart">
          {data.map(({ name, count }) => (
            <div key={name} className="bar-row">
              <span className="bar-label">{name}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
              <span className="bar-count">{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
