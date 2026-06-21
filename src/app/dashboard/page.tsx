import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  return (
    <div className="dash-root">
      <div className="dash-main">
        <h1 className="s-h1 mb-6">Dashboard</h1>
        <p className="s-body">Welcome back.</p>
      </div>
    </div>
  )
}
