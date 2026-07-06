import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LoginForm } from "@/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-brand">
        <div className="login-brand-inner">
          <Image
            src="/aronix-logo-white.png"
            alt="Aronix"
            width={160}
            height={45}
            className="login-logo"
            priority
          />
          <p className="login-tagline">Dashboard</p>
        </div>
      </div>

      <div className="login-form-side">
        <Link href="/" className="login-back">
          <ArrowLeft size={16} />
          Back to site
        </Link>
        <div className="login-form-wrap">
          <h1 className="s-h3" style={{ marginBottom: "var(--ax-space-2)" }}>
            Welcome back
          </h1>
          <p className="s-body-sm" style={{ color: "var(--ax-fg-3)", marginBottom: "var(--ax-space-6)" }}>
            Sign in to your account to continue.
          </p>
          <LoginForm />
          <p className="s-body-sm" style={{ color: "var(--ax-fg-3)", marginTop: "var(--ax-space-6)", textAlign: "center" }}>
            Access is by invitation only.
          </p>
        </div>
      </div>
    </main>
  )
}
