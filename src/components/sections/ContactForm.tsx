"use client"

import { useState, type ChangeEvent } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/Button"

type FormState = {
  first: string
  last: string
  email: string
  company: string
  service: string
  message: string
}

const initial: FormState = {
  first: "",
  last: "",
  email: "",
  company: "",
  service: "",
  message: "",
}

const services = [
  "CRM Integration",
  "Finance Ops",
  "Internal Ops",
  "Marketing Ops",
  "Custom Build",
  "Not sure yet",
]

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial)
  const [sent, setSent] = useState(false)

  const upd = (k: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const canSubmit = form.first.trim() !== "" && form.email.trim() !== "" && form.company.trim() !== ""

  if (sent) {
    return (
      <div className="glass-card rounded-[24px] p-10">
        <div className="text-center py-12 px-6">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "var(--ax-pink-50)", color: "var(--ax-pink-600)" }}
            aria-hidden="true"
          >
            <Check size={28} strokeWidth={2} />
          </div>
          <h3
            className="text-[var(--ax-fg-1)] mb-3"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 700,
              fontSize: "24px",
            }}
          >
            We&apos;ve got your request
          </h3>
          <p className="text-[16px] leading-[1.6] text-[var(--ax-fg-2)]">
            Expect a reply within one business day. We&apos;ll send a calendar
            invite for the audit once we confirm a time that works.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (canSubmit) setSent(true)
      }}
      className="glass-card rounded-[24px] p-10"
      aria-labelledby="contact-form-title"
    >
      <div className="mb-6">
        <div
          id="contact-form-title"
          className="text-[var(--ax-fg-1)] mb-1.5"
          style={{ fontFamily: "var(--ax-font-display)", fontWeight: 700, fontSize: "22px" }}
        >
          Automation Audit Request
        </div>
        <div className="text-[14px] text-[var(--ax-fg-3)]">
          Takes about 2 minutes to complete.
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First name" htmlFor="first">
            <Input id="first" placeholder="Alex" value={form.first} onChange={upd("first")} />
          </Field>
          <Field label="Last name" htmlFor="last">
            <Input id="last" placeholder="Johnson" value={form.last} onChange={upd("last")} />
          </Field>
        </div>

        <Field label="Work email" htmlFor="email" required>
          <Input id="email" type="email" placeholder="alex@company.com" value={form.email} onChange={upd("email")} required />
        </Field>

        <Field label="Company name" htmlFor="company" required>
          <Input id="company" placeholder="Acme Inc." value={form.company} onChange={upd("company")} required />
        </Field>

        <Field label="What do you need help with?" htmlFor="service">
          <select
            id="service"
            value={form.service}
            onChange={upd("service")}
            className="h-12 px-4 text-[16px] text-[var(--ax-fg-1)] bg-white border border-[var(--ax-border)] rounded-[12px] outline-none transition-colors duration-150 cursor-pointer focus:border-[var(--ax-primary)] focus:border-2"
            style={{ fontFamily: "var(--ax-font-body)" }}
          >
            <option value="">Select a service area...</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>

        <Field label="Describe the workflow" htmlFor="message">
          <textarea
            id="message"
            value={form.message}
            onChange={upd("message")}
            placeholder="Tell us what your team is still doing manually, and we'll handle the rest."
            className="px-4 py-3.5 h-[120px] resize-none text-[16px] text-[var(--ax-fg-1)] bg-white border border-[var(--ax-border)] rounded-[12px] outline-none transition-colors duration-150 w-full leading-[1.6] focus:border-[var(--ax-primary)] focus:border-2 placeholder:text-[var(--ax-fg-3)]"
            style={{ fontFamily: "var(--ax-font-body)" }}
          />
        </Field>

        <Button type="submit" variant="primary" size="lg" trailingArrow disabled={!canSubmit} className="w-full">
          Send Audit Request
        </Button>
        <p className="text-[13px] text-[var(--ax-fg-3)] text-center">
          We reply to every enquiry personally within one business day.
        </p>
      </div>
    </form>
  )
}

function Field({ label, htmlFor, required, children }: { label: string; htmlFor: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[14px] font-medium text-[var(--ax-fg-1)]">
        {label}
        {required && <span aria-hidden="true" className="text-[var(--ax-error)] ml-1">*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
    </div>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-12 px-4 text-[16px] text-[var(--ax-fg-1)] bg-white border border-[var(--ax-border)] rounded-[12px] outline-none transition-colors duration-150 focus:border-[var(--ax-primary)] focus:border-2 placeholder:text-[var(--ax-fg-3)]"
      style={{ fontFamily: "var(--ax-font-body)" }}
    />
  )
}
