import { createClient } from "@/lib/supabase/server"
import type { BlogPost, CreateBlogPostInput, UpdateBlogPostInput } from "@/types"

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image, published, created_at, updated_at")
    .eq("published", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as BlogPost[]
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error) {
    if (error.code === "PGRST116") return null
    throw error
  }
  return data as BlogPost
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as BlogPost[]
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    if (error.code === "PGRST116") return null
    throw error
  }
  return data as BlogPost
}

export async function createPost(input: CreateBlogPostInput): Promise<BlogPost> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .insert(input)
    .select()
    .single()

  if (error) throw error
  return data as BlogPost
}

export async function updatePost(id: string, input: UpdateBlogPostInput): Promise<BlogPost> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as BlogPost
}

export async function deletePost(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id)

  if (error) throw error
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = await createClient()
  let query = supabase.from("blog_posts").select("id").eq("slug", slug)
  if (excludeId) query = query.neq("id", excludeId)
  const { data } = await query
  return (data?.length ?? 0) > 0
}
