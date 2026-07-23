import { FileText, Eye, FilePen, Star } from "lucide-react"

interface BlogStats {
  total: number
  published: number
  drafts: number
  featured: number
}

const CARDS = [
  { key: "total" as const, label: "Total Posts", icon: FileText, bg: "var(--ax-info-bg)", colour: "var(--ax-info-text)" },
  { key: "published" as const, label: "Published", icon: Eye, bg: "#F0FDF4", colour: "var(--ax-success-text)" },
  { key: "drafts" as const, label: "Drafts", icon: FilePen, bg: "var(--ax-slate-200)", colour: "var(--ax-fg-2)" },
  { key: "featured" as const, label: "Featured", icon: Star, bg: "var(--ax-pink-50)", colour: "var(--ax-pink-700)" },
] as const

export function BlogStatsCards({ stats }: { stats: BlogStats }) {
  return (
    <div className="stats-grid">
      {CARDS.map(({ key, label, icon: Icon, bg, colour }) => (
        <div key={key} className="stat-card">
          <div className="stat-icon" style={{ background: bg, color: colour }}>
            <Icon size={20} />
          </div>
          <p className="stat-label">{label}</p>
          <p className="stat-value">{stats[key]}</p>
        </div>
      ))}
    </div>
  )
}
