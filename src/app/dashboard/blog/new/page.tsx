import type { Metadata } from "next"
import { BlogForm } from "@/components/dashboard/BlogForm"

export const metadata: Metadata = { title: "New Post" }

export default function NewPostPage() {
  return (
    <>
      <h1 className="s-h2" style={{ marginBottom: "var(--ax-space-6)" }}>New Post</h1>
      <div className="surface" style={{ padding: "var(--ax-space-6)" }}>
        <BlogForm />
      </div>
    </>
  )
}
