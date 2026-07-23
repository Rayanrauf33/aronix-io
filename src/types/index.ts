export interface BlogPost {
  id: string
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
  created_at: string
  updated_at: string
}

export type CreateBlogPostInput = Omit<BlogPost, "id" | "created_at" | "updated_at">

export type UpdateBlogPostInput = Partial<CreateBlogPostInput>

export interface CaseStudyResult {
  value: string
  label: string
}

export interface CaseStudyTool {
  name: string
  icon: string
}

export interface CaseStudyQuote {
  text: string
  author: string
  role: string
}

export interface CaseStudy {
  id: string
  title: string
  slug: string
  client: string
  industry: string
  summary: string
  challenge: string
  solution: string
  results: CaseStudyResult[]
  tools: CaseStudyTool[]
  quote: CaseStudyQuote | null
  published: boolean
  created_at: string
  updated_at: string
}

export type CreateCaseStudyInput = Omit<CaseStudy, "id" | "created_at" | "updated_at">

export type UpdateCaseStudyInput = Partial<CreateCaseStudyInput>
