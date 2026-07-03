import { NextResponse, type NextRequest } from "next/server"
import {
  getPublishedCaseStudies,
  createCaseStudy,
  caseStudySlugExists,
} from "@/lib/supabase/case-studies"
import { createClient } from "@/lib/supabase/server"
import type { CreateCaseStudyInput } from "@/types"

function isResultArray(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.every(
      (r) =>
        typeof r === "object" && r !== null &&
        typeof (r as Record<string, unknown>).value === "string" &&
        typeof (r as Record<string, unknown>).label === "string",
    )
  )
}

function isToolArray(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.every(
      (t) =>
        typeof t === "object" && t !== null &&
        typeof (t as Record<string, unknown>).name === "string" &&
        typeof (t as Record<string, unknown>).icon === "string",
    )
  )
}

function isQuote(value: unknown): boolean {
  if (value === null) return true
  return (
    typeof value === "object" && value !== null &&
    typeof (value as Record<string, unknown>).text === "string" &&
    typeof (value as Record<string, unknown>).author === "string" &&
    typeof (value as Record<string, unknown>).role === "string"
  )
}

function isValidCreateBody(body: unknown): body is CreateCaseStudyInput {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  return (
    typeof b.title === "string" && b.title.length > 0 &&
    typeof b.slug === "string" && b.slug.length > 0 &&
    typeof b.client === "string" &&
    typeof b.industry === "string" &&
    typeof b.summary === "string" &&
    typeof b.challenge === "string" &&
    typeof b.solution === "string" &&
    isResultArray(b.results) &&
    isToolArray(b.tools) &&
    isQuote(b.quote) &&
    typeof b.published === "boolean"
  )
}

export async function GET() {
  try {
    const caseStudies = await getPublishedCaseStudies()
    return NextResponse.json(caseStudies, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Failed to fetch case studies" }, { status: 500 })
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

    const taken = await caseStudySlugExists(body.slug)
    if (taken) {
      return NextResponse.json(
        { error: "A case study with this slug already exists" },
        { status: 400 },
      )
    }

    const caseStudy = await createCaseStudy(body)
    return NextResponse.json(caseStudy, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create case study" }, { status: 500 })
  }
}
