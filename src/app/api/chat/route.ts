import { type NextRequest, NextResponse } from "next/server"
import { SCOUT_SYSTEM_PROMPT } from "@/lib/chat/system-prompt"
import { checkRateLimit } from "@/lib/chat/rate-limit"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

function isValidChatBody(body: unknown): body is { messages: ChatMessage[] } {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  if (!Array.isArray(b.messages) || b.messages.length === 0) return false

  return b.messages.every((m: unknown) => {
    if (typeof m !== "object" || m === null) return false
    const msg = m as Record<string, unknown>
    if (msg.role !== "user" && msg.role !== "assistant") return false
    if (typeof msg.content !== "string") return false
    if (msg.role === "user" && (msg.content.length === 0 || msg.content.length > 500)) return false
    return true
  })
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503 },
      )
    }

    const body: unknown = await request.json()

    if (!isValidChatBody(body)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      )
    }

    const userMessages = body.messages.filter((m) => m.role === "user")

    if (userMessages.length > 5) {
      return NextResponse.json(
        { error: "Conversation limit reached. Book a free audit for a deeper analysis." },
        { status: 429 },
      )
    }

    if (body.messages.length === 1) {
      const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        "unknown"
      const limit = checkRateLimit(ip)

      if (!limit.allowed) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 },
        )
      }
    }

    const baseURL = process.env.AI_BASE_URL ?? "https://api.openai.com/v1"
    const model = process.env.AI_MODEL ?? "gpt-4o-mini"

    const apiRes = await fetch(`${baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        stream: true,
        max_tokens: 250,
        messages: [
          { role: "system", content: SCOUT_SYSTEM_PROMPT },
          ...body.messages.filter((m) => m.content.length > 0),
        ],
      }),
    })

    if (!apiRes.ok) {
      const errText = await apiRes.text().catch(() => "Unknown error")
      return NextResponse.json(
        { error: `AI service error: ${apiRes.status}` },
        { status: 502, statusText: errText },
      )
    }

    if (!apiRes.body) {
      return NextResponse.json(
        { error: "No response from AI service" },
        { status: 502 },
      )
    }

    // Parse SSE stream and forward just the text content
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const stream = new ReadableStream({
      async start(controller) {
        const reader = apiRes.body!.getReader()
        let buffer = ""

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split("\n")
            buffer = lines.pop() ?? ""

            for (const line of lines) {
              const trimmed = line.trim()
              if (!trimmed.startsWith("data: ")) continue
              const data = trimmed.slice(6)
              if (data === "[DONE]") continue

              try {
                const parsed = JSON.parse(data) as {
                  choices?: Array<{ delta?: { content?: string } }>
                }
                const text = parsed.choices?.[0]?.delta?.content
                if (text) {
                  controller.enqueue(encoder.encode(text))
                }
              } catch {
                // Skip malformed chunks
              }
            }
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    )
  }
}
