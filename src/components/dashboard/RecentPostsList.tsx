import Link from "next/link"
import { Pencil } from "lucide-react"
import type { BlogPost } from "@/types"

export function RecentPostsList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <div className="chart-card recent-list">
      <p className="chart-title">Recent Posts</p>
      {posts.map(post => (
        <div key={post.id} className="recent-item">
          <div>
            <p
              className="s-body-sm"
              style={{ fontWeight: 600, color: "var(--ax-fg-1)", marginBottom: 2 }}
            >
              {post.title}
            </p>
            <p className="s-body-sm" style={{ color: "var(--ax-fg-3)", fontSize: 12 }}>
              {post.category}
              {" \u00B7 "}
              {new Date(post.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--ax-space-3)" }}>
            <span className={`bdg ${post.published ? "bdg-ok" : "bdg-n"}`}>
              {post.published ? "Published" : "Draft"}
            </span>
            <Link
              href={`/dashboard/blog/${post.id}/edit`}
              className="btn-ghost"
              style={{ padding: "4px 8px" }}
            >
              <Pencil size={14} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
