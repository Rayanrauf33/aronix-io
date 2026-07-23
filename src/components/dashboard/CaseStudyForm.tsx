"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2 } from "lucide-react"
import type { CaseStudy, CaseStudyResult, CaseStudyTool } from "@/types"

// Known tools with icons already shipped in /public/Assets/icons/icons
const TOOL_OPTIONS: CaseStudyTool[] = [
  { name: "HubSpot",       icon: "/Assets/icons/icons/hubspot.png" },
  { name: "Salesforce",    icon: "/Assets/icons/icons/salesforce.png" },
  { name: "Slack",         icon: "/Assets/icons/icons/slack.png" },
  { name: "Notion",        icon: "/Assets/icons/icons/notion.png" },
  { name: "Stripe",        icon: "/Assets/icons/icons/stripe.svg" },
  { name: "PayPal",        icon: "/Assets/icons/icons/paypal.svg" },
  { name: "n8n",           icon: "/Assets/icons/icons/n8n.png" },
  { name: "Airtable",      icon: "/Assets/icons/icons/airtable.svg" },
  { name: "Make",          icon: "/Assets/icons/icons/make.png" },
  { name: "Zapier",        icon: "/Assets/icons/icons/zapier.png" },
  { name: "Shopify",       icon: "/Assets/icons/icons/shopify-icon-3.svg" },
  { name: "Gmail",         icon: "/Assets/icons/icons/gmail-icon-3.svg" },
  { name: "Monday",        icon: "/Assets/icons/icons/monday.svg" },
  { name: "Google Sheets", icon: "/Assets/icons/icons/sheets.png" },
  { name: "Meta",          icon: "/Assets/icons/icons/meta.svg" },
  { name: "Supabase",      icon: "/Assets/icons/icons/supabase.svg" },
  { name: "Google Drive",  icon: "/Assets/icons/icons/drive.png" },
  { name: "Twilio",        icon: "/Assets/icons/icons/twilio.png" },
  { name: "Mailchimp",     icon: "/Assets/icons/icons/mailchimp-icon-3.svg" },
  { name: "Telegram",      icon: "/Assets/icons/icons/telegram.svg" },
]

interface CaseStudyFormProps {
  caseStudy?: CaseStudy
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function CaseStudyForm({ caseStudy }: CaseStudyFormProps) {
  const router = useRouter()
  const isEditing = Boolean(caseStudy)

  const [title, setTitle] = useState(caseStudy?.title ?? "")
  const [slug, setSlug] = useState(caseStudy?.slug ?? "")
  const [slugEdited, setSlugEdited] = useState(isEditing)
  const [client, setClient] = useState(caseStudy?.client ?? "")
  const [industry, setIndustry] = useState(caseStudy?.industry ?? "")
  const [summary, setSummary] = useState(caseStudy?.summary ?? "")
  const [challenge, setChallenge] = useState(caseStudy?.challenge ?? "")
  const [solution, setSolution] = useState(caseStudy?.solution ?? "")
  const [results, setResults] = useState<CaseStudyResult[]>(
    caseStudy?.results?.length
      ? caseStudy.results
      : [{ value: "", label: "" }, { value: "", label: "" }, { value: "", label: "" }],
  )
  const [tools, setTools] = useState<CaseStudyTool[]>(caseStudy?.tools ?? [])
  const [quoteText, setQuoteText] = useState(caseStudy?.quote?.text ?? "")
  const [quoteAuthor, setQuoteAuthor] = useState(caseStudy?.quote?.author ?? "")
  const [quoteRole, setQuoteRole] = useState(caseStudy?.quote?.role ?? "")
  const [published, setPublished] = useState(caseStudy?.published ?? false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugEdited) {
      setSlug(generateSlug(value))
    }
  }

  function handleSlugChange(value: string) {
    setSlugEdited(true)
    setSlug(generateSlug(value))
  }

  function updateResult(i: number, patch: Partial<CaseStudyResult>) {
    setResults(rs => rs.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))
  }

  function removeResult(i: number) {
    setResults(rs => (rs.length > 1 ? rs.filter((_, idx) => idx !== i) : rs))
  }

  function addTool(name: string) {
    const option = TOOL_OPTIONS.find(t => t.name === name)
    if (!option) return
    setTools(ts => (ts.some(t => t.name === option.name) ? ts : [...ts, option]))
  }

  function removeTool(name: string) {
    setTools(ts => ts.filter(t => t.name !== name))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !slug.trim()) {
      setError("Title and slug are required.")
      return
    }

    const cleanResults = results
      .map(r => ({ value: r.value.trim(), label: r.label.trim() }))
      .filter(r => r.value && r.label)
    if (cleanResults.length === 0) {
      setError("At least one result (value + label) is required.")
      return
    }

    setSaving(true)
    setError("")

    const body = {
      title: title.trim(),
      slug: slug.trim(),
      client: client.trim(),
      industry: industry.trim(),
      summary: summary.trim(),
      challenge: challenge.trim(),
      solution: solution.trim(),
      results: cleanResults,
      tools,
      quote: quoteText.trim()
        ? {
            text: quoteText.trim(),
            author: quoteAuthor.trim(),
            role: quoteRole.trim(),
          }
        : null,
      published,
    }

    try {
      const url = isEditing ? `/api/case-studies/${caseStudy!.id}` : "/api/case-studies"
      const method = isEditing ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data: { error?: string } = await res.json()
        throw new Error(data.error ?? "Failed to save case study")
      }

      router.push("/dashboard/case-studies")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}

      <div className="form-grid">
        {/* Title */}
        <div className="field form-full">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="Outcome-led title, e.g. Lead response time cut from 4 hours to 60 seconds"
            required
          />
        </div>

        {/* Slug */}
        <div className="field form-full">
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={e => handleSlugChange(e.target.value)}
            placeholder="url-friendly-slug"
            required
          />
        </div>

        {/* Client */}
        <div className="field">
          <label htmlFor="client">Client</label>
          <input
            id="client"
            type="text"
            value={client}
            onChange={e => setClient(e.target.value)}
            placeholder="e.g. B2B SaaS company, 45 employees"
          />
        </div>

        {/* Industry */}
        <div className="field">
          <label htmlFor="industry">Industry</label>
          <input
            id="industry"
            type="text"
            value={industry}
            onChange={e => setIndustry(e.target.value)}
            placeholder="e.g. SaaS"
          />
        </div>

        {/* Summary */}
        <div className="field form-full">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            rows={3}
            value={summary}
            onChange={e => setSummary(e.target.value)}
            placeholder="Short summary shown on the listing card"
          />
        </div>

        {/* Challenge */}
        <div className="field form-full">
          <label htmlFor="challenge">The challenge</label>
          <textarea
            id="challenge"
            rows={5}
            value={challenge}
            onChange={e => setChallenge(e.target.value)}
            placeholder="What was broken before. Blank lines create paragraphs."
          />
        </div>

        {/* Solution */}
        <div className="field form-full">
          <label htmlFor="solution">What we built</label>
          <textarea
            id="solution"
            rows={5}
            value={solution}
            onChange={e => setSolution(e.target.value)}
            placeholder="The automation we delivered. Blank lines create paragraphs."
          />
        </div>

        {/* Results */}
        <div className="field form-full">
          <label>Results</label>
          <div className="flex flex-col gap-2">
            {results.map((r, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={r.value}
                  onChange={e => updateResult(i, { value: e.target.value })}
                  placeholder="e.g. 60s"
                  className="max-w-[110px] min-w-0"
                  aria-label={`Result ${i + 1} value`}
                />
                <input
                  type="text"
                  value={r.label}
                  onChange={e => updateResult(i, { label: e.target.value })}
                  placeholder="Label, e.g. Avg lead response time"
                  className="min-w-0 flex-1"
                  aria-label={`Result ${i + 1} label`}
                />
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => removeResult(i)}
                  disabled={results.length <= 1}
                  aria-label={`Remove result ${i + 1}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn-ghost self-start"
              onClick={() => setResults(rs => [...rs, { value: "", label: "" }])}
            >
              <Plus size={16} />
              Add result
            </button>
          </div>
        </div>

        {/* Tools */}
        <div className="field form-full">
          <label htmlFor="toolSelect">Tools used</label>
          <div className="flex flex-wrap gap-2 items-center">
            {tools.map(t => (
              <span key={t.name} className="glass-chip">
                {t.name}
                <button
                  type="button"
                  onClick={() => removeTool(t.name)}
                  aria-label={`Remove ${t.name}`}
                  className="ml-1 inline-flex"
                >
                  <Trash2 size={13} />
                </button>
              </span>
            ))}
            <select
              id="toolSelect"
              value=""
              onChange={e => addTool(e.target.value)}
              className="max-w-[220px]"
            >
              <option value="" disabled>
                Add a tool...
              </option>
              {TOOL_OPTIONS.filter(o => !tools.some(t => t.name === o.name)).map(o => (
                <option key={o.name} value={o.name}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quote (optional) */}
        <div className="field form-full">
          <label htmlFor="quoteText">Client quote (optional)</label>
          <textarea
            id="quoteText"
            rows={2}
            value={quoteText}
            onChange={e => setQuoteText(e.target.value)}
            placeholder="Leave empty to omit the quote section"
          />
        </div>

        <div className="field">
          <label htmlFor="quoteAuthor">Quote author</label>
          <input
            id="quoteAuthor"
            type="text"
            value={quoteAuthor}
            onChange={e => setQuoteAuthor(e.target.value)}
            placeholder="e.g. Head of Sales"
          />
        </div>

        <div className="field">
          <label htmlFor="quoteRole">Quote author role</label>
          <input
            id="quoteRole"
            type="text"
            value={quoteRole}
            onChange={e => setQuoteRole(e.target.value)}
            placeholder="e.g. B2B SaaS client"
          />
        </div>

        {/* Toggles */}
        <div className="form-full form-toggles">
          <div className="toggle-field">
            <label className="toggle">
              <input
                type="checkbox"
                checked={published}
                onChange={e => setPublished(e.target.checked)}
              />
              <span className="toggle-track" />
            </label>
            <span>Published</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? "Saving..." : isEditing ? "Update Case Study" : "Create Case Study"}
        </button>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => router.push("/dashboard/case-studies")}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
