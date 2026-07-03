import Link from "next/link"
import type { Metadata } from "next"
import { Plus } from "lucide-react"
import { getAllPosts } from "@/lib/supabase/blog"
import { BlogPostsTable } from "@/components/dashboard/BlogPostsTable"

export const metadata: Metadata = { title: "Blog Posts" }

export default async function BlogListPage() {
  const posts = await getAllPosts()

  return (
    <>
      <div className="dash-header">
        <h1 className="s-h2">Blog Posts</h1>
        <Link href="/dashboard/blog/new" className="btn-primary">
          <Plus size={18} />
          New Post
        </Link>
      </div>

      <BlogPostsTable posts={posts} />
    </>
  )
}
