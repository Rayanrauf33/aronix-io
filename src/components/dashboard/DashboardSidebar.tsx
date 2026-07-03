"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, FileText, Plus, Briefcase, ArrowLeft, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/blog", label: "All Posts", icon: FileText, exact: false },
  { href: "/dashboard/blog/new", label: "New Post", icon: Plus, exact: true },
  { href: "/dashboard/case-studies", label: "Case Studies", icon: Briefcase, exact: false },
  { href: "/dashboard/case-studies/new", label: "New Case Study", icon: Plus, exact: true },
] as const

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside className="dash-sidebar">
      <Link href="/" className="dash-brand">Aronix</Link>

      <p className="dash-section-label">Content</p>

      <nav className="dash-nav">
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            data-active={isActive(href, exact)}
            className="dash-nav-item"
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="dash-sidebar-footer">
        <Link href="/" className="dash-nav-item">
          <ArrowLeft size={18} />
          Back to site
        </Link>
        <button
          type="button"
          onClick={async () => {
            const supabase = createClient()
            await supabase.auth.signOut()
            router.push("/login")
          }}
          className="dash-nav-item"
          style={{ width: "100%", border: "none", background: "none", cursor: "pointer" }}
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
