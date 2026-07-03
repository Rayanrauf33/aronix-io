import { NextResponse, type NextRequest } from "next/server"
import { getPublishedPosts, createPost, slugExists } from "@/lib/supabase/blog"
import { createClient } from "@/lib/supabase/server"

function isValidCreateBody(body: unknown): body is {
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image: string | null
  category: string
  author: string
  author_role: string | null
  read_time: string
  featured: boolean
  published: boolean
} {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  return (
    typeof b.title === "string" && b.title.length > 0 &&
    typeof b.slug === "string" && b.slug.length > 0 &&
    typeof b.content === "string" &&
    typeof b.excerpt === "string" &&
    typeof b.category === "string" &&
    typeof b.author === "string" &&
    typeof b.read_time === "string" &&
    typeof b.published === "boolean" &&
    typeof b.featured === "boolean" &&
    (b.cover_image === null || typeof b.cover_image === "string") &&
    (b.author_role === null || typeof b.author_role === "string")
  )
}

export async function GET() {
  try {
    const posts = await getPublishedPosts()
    return NextResponse.json(posts, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
    }

    const body: unknown = await request.json()

    if (!isValidCreateBody(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const taken = await slugExists(body.slug)
    if (taken) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
    }

    const post = await createPost(body)
    return NextResponse.json(post, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
