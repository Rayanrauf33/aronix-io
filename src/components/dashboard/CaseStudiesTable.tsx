"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Pencil, Trash2, ExternalLink, Briefcase } from "lucide-react"
import type { CaseStudy } from "@/types"

export function CaseStudiesTable({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(id: string, title: string) {
    const confirmed = window.confirm(`Delete "${title}"? This cannot be undone.`)
    if (!confirmed) return

    setDeleting(id)
    try {
      const res = await fetch(`/api/case-studies/${id}`, { method: "DELETE" })
      if (res.ok) {
        router.refresh()
      }
    } finally {
      setDeleting(null)
    }
  }

  if (caseStudies.length === 0) {
    return (
      <div className="empty-state">
        <Briefcase size={48} style={{ margin: "0 auto", marginBottom: 16 }} />
        <p className="s-h4" style={{ marginBottom: 8 }}>No case studies yet</p>
        <p className="s-body-sm" style={{ marginBottom: 24 }}>
          Create your first case study to get started.
        </p>
        <Link href="/dashboard/case-studies/new" className="btn-primary">
          Create Case Study
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
              <th>Industry</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ width: 120 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {caseStudies.map(cs => (
              <tr key={cs.id}>
                <td>
                  <span style={{ fontWeight: 600 }}>{cs.title}</span>
                </td>
                <td>{cs.industry}</td>
                <td>
                  <span className={`bdg ${cs.published ? "bdg-ok" : "bdg-n"}`}>
                    {cs.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td>
                  {new Date(cs.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {cs.published && (
                      <a
                        href={`/case-studies/${cs.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                        style={{ padding: "4px 8px" }}
                        title="View live"
                        aria-label="View published case study"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <Link
                      href={`/dashboard/case-studies/${cs.id}/edit`}
                      className="btn-ghost"
                      style={{ padding: "4px 8px" }}
                      title="Edit"
                      aria-label="Edit case study"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(cs.id, cs.title)}
                      disabled={deleting === cs.id}
                      className="btn-danger"
                      title="Delete"
                      aria-label="Delete case study"
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
