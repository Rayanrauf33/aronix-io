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

export async function searchCaseStudies(query: string, limit = 10): Promise<CaseStudy[]> {
  const supabase = await createClient()
  const pattern = `%${query}%`
  const { data, error } = await supabase
    .from("case_studies")
    .select(COLS)
    .eq("published", true)
    .or(`title.ilike.${pattern},summary.ilike.${pattern},client.ilike.${pattern},industry.ilike.${pattern}`)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []) as CaseStudy[]
}

export async function getRelatedCaseStudies(excludeId: string, industry: string, limit = 2): Promise<CaseStudy[]> {
  const supabase = await createClient()

  // Prefer same-industry studies
  const { data: sameIndustry, error: e1 } = await supabase
    .from("case_studies")
    .select(COLS)
    .eq("published", true)
    .eq("industry", industry)
    .neq("id", excludeId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (e1) throw e1
  const results = (sameIndustry ?? []) as CaseStudy[]

  if (results.length >= limit) return results

  // Fill remaining from other industries
  const excludeIds = [excludeId, ...results.map((r) => r.id)]
  const { data: others, error: e2 } = await supabase
    .from("case_studies")
    .select(COLS)
    .eq("published", true)
    .not("id", "in", `(${excludeIds.join(",")})`)
    .order("created_at", { ascending: false })
    .limit(limit - results.length)

  if (e2) throw e2
  return [...results, ...((others ?? []) as CaseStudy[])]
}

export async function caseStudySlugExists(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = await createClient()
  let query = supabase.from("case_studies").select("id").eq("slug", slug)
  if (excludeId) query = query.neq("id", excludeId)
  const { data, error } = await query

  if (error) throw error
  return (data ?? []).length > 0
}
