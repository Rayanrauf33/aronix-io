"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { Send, AlertCircle, Sparkles, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Eyebrow } from "@/components/ui/Eyebrow"
import "./AutomationScout.css"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

const SUGGESTIONS = [
  "We manually enter leads into our CRM",
  "Invoice processing takes hours",
  "Our team juggles too many tools",
  "Customer onboarding is slow",
]

const MAX_USER_MESSAGES = 5
const CALENDLY_URL =
  "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"

let nextId = 0
function uid(): string {
  nextId += 1
  return `msg-${nextId}`
}

export function AutomationScout() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const hasStarted = messages.length > 0
  const userMessageCount = messages.filter((m) => m.role === "user").length
  const isLimitReached = userMessageCount >= MAX_USER_MESSAGES

  // Scroll to bottom on new messages
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    el.scrollTo({
      top: el.scrollHeight,
      behavior: prefersReduced ? "auto" : "smooth",
    })
  }, [messages, isLoading])

  // Clean up abort controller on unmount
  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isLoading) return

      setErrorMessage(null)
      setInput("")

      const userMsg: Message = { id: uid(), role: "user", content: trimmed }
      const allMessages = [...messages, userMsg]
      setMessages(allMessages)
      setIsLoading(true)

      const assistantId = uid()
      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: allMessages
              .filter((m) => m.content.length > 0)
              .map(({ role, content }) => ({ role, content })),
          }),
          signal: controller.signal,
        })

        if (!res.ok) {
          const err = (await res.json().catch(() => null)) as {
            error?: string
          } | null
          throw new Error(err?.error ?? `Request failed (${res.status})`)
        }

        const reader = res.body?.getReader()
        if (!reader) throw new Error("No response stream")

        const decoder = new TextDecoder()
        let accumulated = ""

        // Add the empty assistant message
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: "" },
        ])

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          accumulated += decoder.decode(value, { stream: true })
          const current = accumulated
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: current } : m,
            ),
          )
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        setErrorMessage(message)
      } finally {
        setIsLoading(false)
        abortRef.current = null
      }
    },
    [messages, isLoading],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      sendMessage(input)
    },
    [input, sendMessage],
  )

  const handleChipClick = useCallback(
    (text: string) => {
      sendMessage(text)
    },
    [sendMessage],
  )

  return (
    <section
      className="scout-section px-5 sm:px-12 py-24"
      aria-labelledby="scout-heading"
    >
      {/* Ambient gradient blobs */}
      <div className="scout-blob scout-blob-pink" aria-hidden="true" />
      <div className="scout-blob scout-blob-indigo" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10 mx-auto max-w-[640px]">
          <Eyebrow className="mb-3.5">
            <Sparkles
              size={14}
              strokeWidth={1.75}
              className="scout-sparkle"
              aria-hidden="true"
            />
            Automation scout
          </Eyebrow>

          <h2
            id="scout-heading"
            className="text-[var(--ax-fg-on-dark)] mb-4"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 700,
              fontSize: hasStarted
                ? "clamp(24px, 3vw, 36px)"
                : "clamp(32px, 3.5vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              transition: "font-size 0.38s cubic-bezier(0.2, 0, 0, 1)",
            }}
          >
            See what you could automate
          </h2>

          {!hasStarted && (
            <p className="text-[18px] leading-[1.6] text-[var(--ax-fg-on-dark-2)]">
              Tell us a bit about your business and we will show you where
              automation fits.
            </p>
          )}
        </div>

        {/* Glass panel */}
        <div className="scout-panel max-w-[640px] mx-auto flex flex-col gap-5">
          {/* Messages */}
          {hasStarted && (
            <div ref={scrollRef} className="scout-messages">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "scout-msg",
                    m.role === "user" ? "scout-msg-user" : "scout-msg-ai",
                  )}
                >
                  {m.content}
                </div>
              ))}

              {isLoading &&
                messages[messages.length - 1]?.role === "user" && (
                  <div className="scout-thinking" aria-label="Thinking">
                    <span className="scout-thinking-dot" />
                    <span className="scout-thinking-dot" />
                    <span className="scout-thinking-dot" />
                  </div>
                )}
            </div>
          )}

          {/* Input or limit CTA */}
          {isLimitReached ? (
            <div className="scout-limit-cta">
              <p
                className="text-[var(--ax-fg-on-dark)] mb-4 text-[18px]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 600,
                }}
              >
                Want the full picture? Book a free workflow audit.
              </p>
              <a
                href={CALENDLY_URL}
                className="scout-cta-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book an Automation Audit
                <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="scout-input-wrap">
                <input
                  className="scout-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe a manual process..."
                  maxLength={500}
                  disabled={isLoading}
                  aria-label="Describe your business process"
                />
                <button
                  type="submit"
                  className="scout-send-btn"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                >
                  <Send size={18} strokeWidth={1.75} />
                </button>
              </div>
            </form>
          )}

          {/* Suggestion chips with staggered entrance */}
          {!hasStarted && (
            <div className="scout-chips">
              {SUGGESTIONS.map((text, i) => (
                <button
                  key={text}
                  type="button"
                  className="scout-chip"
                  style={{ animationDelay: `${i * 80}ms` }}
                  onClick={() => handleChipClick(text)}
                >
                  {text}
                </button>
              ))}
            </div>
          )}

          {/* Error */}
          {errorMessage && (
            <div className="scout-error" role="alert">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
