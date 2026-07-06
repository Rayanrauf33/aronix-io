import { NextResponse, type NextRequest } from "next/server"
import { searchPosts } from "@/lib/supabase/blog"
import { searchCaseStudies } from "@/lib/supabase/case-studies"

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q")?.trim() ?? ""

    if (q.length < 2) {
      return NextResponse.json({ posts: [], caseStudies: [] }, { status: 200 })
    }

    const [posts, caseStudies] = await Promise.all([
      searchPosts(q, 6),
      searchCaseStudies(q, 4),
    ])

    return NextResponse.json({ posts, caseStudies }, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: "Search failed. Please try again." },
      { status: 500 }
    )
  }
}
