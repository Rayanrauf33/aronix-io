"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Pencil, Trash2, ExternalLink, FileText } from "lucide-react"
import type { BlogPost } from "@/types"

export function BlogPostsTable({ posts }: { posts: BlogPost[] }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(id: string, title: string) {
    const confirmed = window.confirm(`Delete "${title}"? This cannot be undone.`)
    if (!confirmed) return

    setDeleting(id)
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" })
      if (res.ok) {
        router.refresh()
      }
    } finally {
      setDeleting(null)
    }
  }

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <FileText size={48} style={{ margin: "0 auto", marginBottom: 16 }} />
        <p className="s-h4" style={{ marginBottom: 8 }}>No posts yet</p>
        <p className="s-body-sm" style={{ marginBottom: 24 }}>
          Create your first blog post to get started.
        </p>
        <Link href="/dashboard/blog/new" className="btn-primary">
          Create Post
        </Link>
      </div>
    )
  }

  return (
    <div className="surface" style={{ overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table className="tbl">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ width: 120 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>
                  <span style={{ fontWeight: 600 }}>{post.title}</span>
                  {post.featured && (
                    <span className="bdg bdg-wa" style={{ marginLeft: 8 }}>Featured</span>
                  )}
                </td>
                <td>{post.category}</td>
                <td>
                  <span className={`bdg ${post.published ? "bdg-ok" : "bdg-n"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td>
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {post.published && (
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                        style={{ padding: "4px 8px" }}
                        title="View live"
                        aria-label="View published post"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <Link
                      href={`/dashboard/blog/${post.id}/edit`}
                      className="btn-ghost"
                      style={{ padding: "4px 8px" }}
                      title="Edit"
                      aria-label="Edit post"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      disabled={deleting === post.id}
                      className="btn-danger"
                      title="Delete"
                      aria-label="Delete post"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
