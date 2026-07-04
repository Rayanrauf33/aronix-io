type WindowEntry = {
  count: number
  windowStart: number
}

export type RateLimitResult = {
  allowed: boolean
  retryAfter?: number
}

const WINDOW_MS = 3_600_000 // 1 hour
const MAX_CONVERSATIONS = 3

const windows = new Map<string, WindowEntry>()

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now()
  const entry = windows.get(ip)

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    windows.set(ip, { count: 1, windowStart: now })
    return { allowed: true }
  }

  if (entry.count >= MAX_CONVERSATIONS) {
    const retryAfter = WINDOW_MS - (now - entry.windowStart)
    return { allowed: false, retryAfter }
  }

  entry.count += 1
  return { allowed: true }
}
