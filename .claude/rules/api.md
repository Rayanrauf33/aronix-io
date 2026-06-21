# Rules: src/app/api/**

## Validate the request body
Never use request.json() directly. Parse as unknown and narrow.
```ts
const body: unknown = await request.json()
if (!isValidBody(body)) {
  return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
}
```

## Return typed responses
Every return must be NextResponse.json(...) with an explicit status.
Never return raw Response or untyped objects.

## Wrap in try/catch
Every route handler has a top-level try/catch returning 500 on error.

## Status codes
| Situation | Status |
|---|---|
| Validation failed | 400 |
| Not authenticated | 401 |
| Not authorised | 403 |
| Not found | 404 |
| DB or unexpected error | 500 |

## Supabase client
Always import from @/lib/supabase/server in route handlers.

## Named exports
Export each method by name: GET, POST, PATCH, DELETE. No default export.
