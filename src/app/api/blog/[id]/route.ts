import { NextResponse, type NextRequest } from "next/server"
import { getPostById, updatePost, deletePost, slugExists } from "@/lib/supabase/blog"
import { createClient } from "@/lib/supabase/server"
import type { UpdateBlogPostInput } from "@/types"

interface RouteContext {
  params: Promise<{ id: string }>
}

const VALID_FIELDS = new Set([
  "title", "slug", "content", "excerpt", "cover_image",
  "category", "author", "author_role", "read_time",
  "published", "featured",
])

function isValidUpdateBody(body: unknown): body is UpdateBlogPostInput {
  if (typeof body !== "object" || body === null) return false
  const keys = Object.keys(body as Record<string, unknown>)
  return keys.length > 0 && keys.every(k => VALID_FIELDS.has(k))
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const post = await getPostById(id)
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    return NextResponse.json(post, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
    }

    const { id } = await params
    const body: unknown = await request.json()

    if (!isValidUpdateBody(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const existing = await getPostById(id)
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const input = body as UpdateBlogPostInput
    if (input.slug) {
      const taken = await slugExists(input.slug, id)
      if (taken) {
        return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
      }
    }

    const updated = await updatePost(id, input)
    return NextResponse.json(updated, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
    }

    const { id } = await params
    const existing = await getPostById(id)
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    await deletePost(id)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
