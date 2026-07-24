import type { ReactNode } from "react"
import type { Metadata } from "next"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import "@/styles/dashboard.css"

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dash-root">
      <DashboardSidebar />
      <main className="dash-main">{children}</main>
    </div>
  )
}
