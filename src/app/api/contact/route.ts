import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type ContactBody = {
  first: string
  last: string
  email: string
  company: string
  service: string
  message: string
}

function isContactBody(body: unknown): body is ContactBody {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  return (
    typeof b.first === "string" &&
    typeof b.last === "string" &&
    typeof b.email === "string" &&
    typeof b.company === "string" &&
    typeof b.service === "string" &&
    typeof b.message === "string"
  )
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json()

    if (!isContactBody(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { first, last, email, company, service, message } = body

    if (!email.trim() || !company.trim()) {
      return NextResponse.json({ error: "Email and company are required" }, { status: 400 })
    }

    const toEmail = process.env.CONTACT_TO_EMAIL
    if (!toEmail) {
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 })
    }

    const serviceLine = service || "Not specified"
    const subject = service
      ? `New enquiry: ${service} — ${company}`
      : `New enquiry from ${company}`

    const name = [first, last].filter(Boolean).join(" ") || "Not provided"

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:sans-serif;color:#111;max-width:600px;margin:0 auto;padding:32px 16px">
  <h2 style="margin:0 0 24px;font-size:20px;font-weight:700">New audit enquiry</h2>

  <table style="width:100%;border-collapse:collapse">
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eee;width:140px;vertical-align:top;color:#666;font-size:14px">Name</td>
      <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px">${escHtml(name)}</td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eee;vertical-align:top;color:#666;font-size:14px">Email</td>
      <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px"><a href="mailto:${escHtml(email)}" style="color:#0070f3">${escHtml(email)}</a></td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eee;vertical-align:top;color:#666;font-size:14px">Company</td>
      <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px">${escHtml(company)}</td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eee;vertical-align:top;color:#666;font-size:14px">Service</td>
      <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px">${escHtml(serviceLine)}</td>
    </tr>
    <tr>
      <td style="padding:10px 0;vertical-align:top;color:#666;font-size:14px">Message</td>
      <td style="padding:10px 0;font-size:14px;white-space:pre-wrap">${escHtml(message) || "<em style=\"color:#999\">No message provided</em>"}</td>
    </tr>
  </table>

  <p style="margin:32px 0 0;font-size:12px;color:#999">
    Sent from aronix.io/contact
  </p>
</body>
</html>`

    await resend.emails.send({
      from: "Aronix Contact <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject,
      html,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
