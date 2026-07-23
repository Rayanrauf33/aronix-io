import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getCaseStudyById } from "@/lib/supabase/case-studies"
import { CaseStudyForm } from "@/components/dashboard/CaseStudyForm"

interface EditCaseStudyPageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = { title: "Edit Case Study" }

export default async function EditCaseStudyPage({ params }: EditCaseStudyPageProps) {
  const { id } = await params
  const caseStudy = await getCaseStudyById(id)

  if (!caseStudy) notFound()

  return (
    <>
      <h1 className="s-h2" style={{ marginBottom: "var(--ax-space-6)" }}>Edit Case Study</h1>
      <div className="surface" style={{ padding: "var(--ax-space-6)" }}>
        <CaseStudyForm caseStudy={caseStudy} />
      </div>
    </>
  )
}
