"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { BlogPost } from "@/types"
import { BlogEditor } from "@/components/dashboard/BlogEditor"
import { CoverImageUpload } from "@/components/dashboard/CoverImageUpload"

const CATEGORIES = [
  "Strategy",
  "CRM Integration",
  "Finance Ops",
  "Internal Ops",
] as const

interface BlogFormProps {
  post?: BlogPost
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter()
  const isEditing = Boolean(post)

  const [title, setTitle] = useState(post?.title ?? "")
  const [slug, setSlug] = useState(post?.slug ?? "")
  const [slugEdited, setSlugEdited] = useState(isEditing)
  const [category, setCategory] = useState(post?.category ?? "Strategy")
  const [author, setAuthor] = useState(post?.author ?? "Aronix")
  const [authorRole, setAuthorRole] = useState(post?.author_role ?? "")
  const [readTime, setReadTime] = useState(post?.read_time ?? "5 min")
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "")
  const [coverImage, setCoverImage] = useState<string | null>(post?.cover_image ?? null)
  const [content, setContent] = useState(post?.content ?? "")
  const [published, setPublished] = useState(post?.published ?? false)
  const [featured, setFeatured] = useState(post?.featured ?? false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugEdited) {
      setSlug(generateSlug(value))
    }
  }

  function handleSlugChange(value: string) {
    setSlugEdited(true)
    setSlug(generateSlug(value))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !slug.trim()) {
      setError("Title and slug are required.")
      return
    }

    setSaving(true)
    setError("")

    const body = {
      title: title.trim(),
      slug: slug.trim(),
      content,
      excerpt: excerpt.trim(),
      cover_image: coverImage,
      category,
      author: author.trim() || "Aronix",
      author_role: authorRole.trim() || null,
      read_time: readTime.trim() || "5 min",
      featured,
      published,
    }

    try {
      const url = isEditing ? `/api/blog/${post!.id}` : "/api/blog"
      const method = isEditing ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data: { error?: string } = await res.json()
        throw new Error(data.error ?? "Failed to save post")
      }

      router.push("/dashboard/blog")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}

      <div className="form-grid">
        {/* Title */}
        <div className="field form-full">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="Post title"
            required
          />
        </div>

        {/* Slug */}
        <div className="field form-full">
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={e => handleSlugChange(e.target.value)}
            placeholder="url-friendly-slug"
            required
          />
        </div>

        {/* Category */}
        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Read Time */}
        <div className="field">
          <label htmlFor="readTime">Read Time</label>
          <input
            id="readTime"
            type="text"
            value={readTime}
            onChange={e => setReadTime(e.target.value)}
            placeholder="5 min"
          />
        </div>

        {/* Author */}
        <div className="field">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="Author name"
          />
        </div>

        {/* Author Role */}
        <div className="field">
          <label htmlFor="authorRole">Author Role</label>
          <input
            id="authorRole"
            type="text"
            value={authorRole}
            onChange={e => setAuthorRole(e.target.value)}
            placeholder="e.g. Head of Strategy"
          />
        </div>

        {/* Excerpt */}
        <div className="field form-full">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            rows={3}
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            placeholder="Short summary for listing pages"
          />
        </div>

        {/* Cover Image */}
        <div className="field form-full">
          <label id="cover-image-label">Cover Image</label>
          <div aria-labelledby="cover-image-label">
            <CoverImageUpload value={coverImage} onChange={setCoverImage} />
          </div>
        </div>

        {/* Content Editor */}
        <div className="field form-full">
          <label id="content-label">Content</label>
          <div aria-labelledby="content-label">
            <BlogEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Toggles */}
        <div className="form-full form-toggles">
          <div className="toggle-field">
            <label className="toggle">
              <input
                type="checkbox"
                checked={published}
                onChange={e => setPublished(e.target.checked)}
              />
              <span className="toggle-track" />
            </label>
            <span>Published</span>
          </div>

          <div className="toggle-field">
            <label className="toggle">
              <input
                type="checkbox"
                checked={featured}
                onChange={e => setFeatured(e.target.checked)}
              />
              <span className="toggle-track" />
            </label>
            <span>Featured</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
        </button>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => router.push("/dashboard/blog")}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
