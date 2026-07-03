import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getPostById } from "@/lib/supabase/blog"
import { BlogForm } from "@/components/dashboard/BlogForm"

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = { title: "Edit Post" }

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  const post = await getPostById(id)

  if (!post) notFound()

  return (
    <>
      <h1 className="s-h2" style={{ marginBottom: "var(--ax-space-6)" }}>Edit Post</h1>
      <div className="surface" style={{ padding: "var(--ax-space-6)" }}>
        <BlogForm post={post} />
      </div>
    </>
  )
}
