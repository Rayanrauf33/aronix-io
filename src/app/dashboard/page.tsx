import { getAllPosts } from "@/lib/supabase/blog"
import { BlogStatsCards } from "@/components/dashboard/BlogStatsCards"
import { CategoryChart } from "@/components/dashboard/CategoryChart"
import { MonthlyChart } from "@/components/dashboard/MonthlyChart"
import { RecentPostsList } from "@/components/dashboard/RecentPostsList"

export default async function DashboardPage() {
  const posts = await getAllPosts()

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.published).length,
    drafts: posts.filter(p => !p.published).length,
    featured: posts.filter(p => p.featured).length,
  }

  /* Category distribution */
  const categoryMap = new Map<string, number>()
  for (const post of posts) {
    categoryMap.set(post.category, (categoryMap.get(post.category) ?? 0) + 1)
  }
  const categories = Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  /* Monthly trend (last 6 months) */
  const now = new Date()
  const months: { label: string; count: number }[] = []
  for (let i = 5; i >= 0; i--) {
    const start = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
    const label = start.toLocaleDateString("en-GB", { month: "short" })
    const count = posts.filter(p => {
      const d = new Date(p.created_at)
      return d >= start && d < end
    }).length
    months.push({ label, count })
  }

  const recentPosts = posts.slice(0, 5)

  return (
    <>
      <h1 className="s-h2" style={{ marginBottom: "var(--ax-space-6)" }}>Overview</h1>

      <BlogStatsCards stats={stats} />

      <div className="charts-grid">
        <CategoryChart data={categories} />
        <MonthlyChart data={months} />
      </div>

      <RecentPostsList posts={recentPosts} />
    </>
  )
}
