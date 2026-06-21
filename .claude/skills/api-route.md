# Skill: Create a new API route

## File location
src/app/api/<resource>/route.ts -- handles GET, POST, etc. for /api/<resource>
src/app/api/<resource>/[id]/route.ts -- for resource-by-id operations

Never colocate a route.ts next to a page.tsx.

## Template
```ts
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

interface CreatePostBody {
  title: string
  content: string
  excerpt: string
  slug: string
  published: boolean
}

function isValidBody(body: unknown): body is CreatePostBody {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  return (
    typeof b.title === "string" &&
    typeof b.content === "string" &&
    typeof b.excerpt === "string" &&
    typeof b.slug === "string" &&
    typeof b.published === "boolean"
  )
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
    }

    const body: unknown = await request.json()
    if (!isValidBody(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { error } = await supabase.from("blog_posts").insert(body)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
```

## Checklist
- [ ] Body validated before use
- [ ] Auth checked before any mutation
- [ ] NextResponse.json with explicit status
- [ ] try/catch wraps all async logic
- [ ] Named export -- no default export
- [ ] No em dashes in comments
