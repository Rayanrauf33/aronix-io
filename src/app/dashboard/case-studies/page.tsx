import Link from "next/link"
import type { Metadata } from "next"
import { Plus } from "lucide-react"
import { getAllCaseStudies } from "@/lib/supabase/case-studies"
import { CaseStudiesTable } from "@/components/dashboard/CaseStudiesTable"

export const metadata: Metadata = { title: "Case Studies" }

export default async function CaseStudiesListPage() {
  const caseStudies = await getAllCaseStudies()

  return (
    <>
      <div className="dash-header">
        <h1 className="s-h2">Case Studies</h1>
        <Link href="/dashboard/case-studies/new" className="btn-primary">
          <Plus size={18} />
          New Case Study
        </Link>
      </div>

      <CaseStudiesTable caseStudies={caseStudies} />
    </>
  )
}
