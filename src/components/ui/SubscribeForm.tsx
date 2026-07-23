"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { analytics } from "@/lib/analytics"

type Variant = "dark-band" | "sidebar"

type Props = {
  variant?: Variant
  buttonLabel?: string
}

export function SubscribeForm({ variant = "dark-band", buttonLabel = "Subscribe" }: Props) {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email.trim().length > 0) {
      analytics.newsletterSubscribe(variant === "sidebar" ? "blog-sidebar" : "newsletter-band")
      setDone(true)
    }
  }

  if (done) {
    return (
      <div
        className={cn(
          "text-center px-2 py-3 text-[14px]",
          variant === "dark-band" ? "text-white/85" : "text-white/75",
        )}
      >
        You&apos;re subscribed
      </div>
    )
  }

  const inputClass =
    variant === "dark-band"
      ? "flex-1 min-w-[220px] h-[52px] px-4.5 text-[15px] text-white bg-white/10 border border-white/20 rounded-[12px] focus:border-white/50 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 placeholder:text-white/40"
      : "w-full h-[38px] px-3 text-[13px] text-white bg-white/10 border border-white/20 rounded-[8px] focus:border-white/50 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 placeholder:text-white/40 mb-2"

  return (
    <form
      onSubmit={onSubmit}
      className={
        variant === "dark-band"
          ? "flex gap-3 justify-center items-center flex-wrap max-w-[520px] mx-auto"
          : "block"
      }
    >
      <input
        type="email"
        required
        placeholder="your@company.com"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        className={inputClass}
        style={{ fontFamily: "var(--ax-font-body)" }}
        aria-label="Email address"
      />
      <Button
        type="submit"
        variant="dark"
        size={variant === "dark-band" ? "lg" : "sm"}
        className={variant === "sidebar" ? "w-full" : undefined}
      >
        {buttonLabel}
      </Button>
    </form>
  )
}
