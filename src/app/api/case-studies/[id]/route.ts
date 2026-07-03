import { NextResponse, type NextRequest } from "next/server"
import {
  getCaseStudyById,
  updateCaseStudy,
  deleteCaseStudy,
  caseStudySlugExists,
} from "@/lib/supabase/case-studies"
import { createClient } from "@/lib/supabase/server"
import type { UpdateCaseStudyInput } from "@/types"

interface RouteContext {
  params: Promise<{ id: string }>
}

const VALID_FIELDS = new Set([
  "title", "slug", "client", "industry", "summary",
  "challenge", "solution", "results", "tools", "quote",
  "published",
])

function isValidUpdateBody(body: unknown): body is UpdateCaseStudyInput {
  if (typeof body !== "object" || body === null) return false
  const keys = Object.keys(body as Record<string, unknown>)
  return keys.length > 0 && keys.every((k) => VALID_FIELDS.has(k))
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const caseStudy = await getCaseStudyById(id)
    if (!caseStudy) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 })
    }
    return NextResponse.json(caseStudy, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Failed to fetch case study" }, { status: 500 })
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

    const existing = await getCaseStudyById(id)
    if (!existing) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 })
    }

    const input = body as UpdateCaseStudyInput
    if (input.slug) {
      const taken = await caseStudySlugExists(input.slug, id)
      if (taken) {
        return NextResponse.json(
          { error: "A case study with this slug already exists" },
          { status: 400 },
        )
      }
    }

    const updated = await updateCaseStudy(id, input)
    return NextResponse.json(updated, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Failed to update case study" }, { status: 500 })
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
    const existing = await getCaseStudyById(id)
    if (!existing) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 })
    }
    await deleteCaseStudy(id)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Failed to delete case study" }, { status: 500 })
  }
}
