export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export type CreateBlogPostInput = Omit<BlogPost, "id" | "created_at" | "updated_at">

export type UpdateBlogPostInput = Partial<CreateBlogPostInput>
