import type { Metadata } from "next"

export const metadata: Metadata = { title: "Login" }

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="surface p-8 w-full max-w-sm">
        <h1 className="s-h2 mb-6">Sign in</h1>
        {/* LoginForm client component goes here */}
        <p className="s-body-sm mt-4" style={{ color: "var(--ax-fg-3)" }}>
          Access is by invitation only.
        </p>
      </div>
    </main>
  )
}
