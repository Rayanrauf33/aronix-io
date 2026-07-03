import { createClient } from "@/lib/supabase/server"
import type { CaseStudy, CreateCaseStudyInput, UpdateCaseStudyInput } from "@/types"

const COLS =
  "id, title, slug, client, industry, summary, challenge, solution, results, tools, quote, published, created_at, updated_at"

export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("case_studies")
    .select(COLS)
    .eq("published", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return (data ?? []) as CaseStudy[]
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("case_studies")
    .select(COLS)
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error) {
    if (error.code === "PGRST116") return null
    throw error
  }
  return data as CaseStudy
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("case_studies")
    .select(COLS)
    .order("created_at", { ascending: false })

  if (error) throw error
  return (data ?? []) as CaseStudy[]
}

export async function getCaseStudyById(id: string): Promise<CaseStudy | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("case_studies")
    .select(COLS)
    .eq("id", id)
    .single()

  if (error) {
    if (error.code === "PGRST116") return null
    throw error
  }
  return data as CaseStudy
}

export async function createCaseStudy(input: CreateCaseStudyInput): Promise<CaseStudy> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("case_studies")
    .insert(input)
    .select(COLS)
    .single()

  if (error) throw error
  return data as CaseStudy
}

export async function updateCaseStudy(id: string, input: UpdateCaseStudyInput): Promise<CaseStudy> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("case_studies")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select(COLS)
    .single()

  if (error) throw error
  return data as CaseStudy
}

export async function deleteCaseStudy(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from("case_studies").delete().eq("id", id)
  if (error) throw error
}

export async function caseStudySlugExists(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = await createClient()
  let query = supabase.from("case_studies").select("id").eq("slug", slug)
  if (excludeId) query = query.neq("id", excludeId)
  const { data, error } = await query

  if (error) throw error
  return (data ?? []).length > 0
}
