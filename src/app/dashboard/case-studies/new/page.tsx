import type { Metadata } from "next"
import { CaseStudyForm } from "@/components/dashboard/CaseStudyForm"

export const metadata: Metadata = { title: "New Case Study" }

export default function NewCaseStudyPage() {
  return (
    <>
      <h1 className="s-h2" style={{ marginBottom: "var(--ax-space-6)" }}>New Case Study</h1>
      <div className="surface" style={{ padding: "var(--ax-space-6)" }}>
        <CaseStudyForm />
      </div>
    </>
  )
}
