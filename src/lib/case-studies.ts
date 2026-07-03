// Case studies data layer (Phase 1: static module).
// The CaseStudy shape mirrors the future case_studies table so the
// dashboard CRUD phase only swaps the data source, never the pages.

export type CaseStudy = {
  slug: string
  title: string
  client: string
  industry: string
  summary: string
  challenge: string
  solution: string
  results: { value: string; label: string }[]
  tools: { name: string; icon: string }[]
  quote?: { text: string; author: string; role: string }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "crm-lead-qualification",
    title: "Lead response time cut from 4 hours to 60 seconds",
    client: "B2B SaaS company, 45 employees",
    industry: "SaaS",
    summary:
      "A growing sales team was losing deals to faster competitors. We built an end-to-end lead pipeline that captures, enriches, scores and routes every inbound lead the moment it arrives.",
    challenge:
      "Inbound leads arrived from website forms, ad platforms and email, then sat in a shared inbox until someone manually copied them into the CRM. Average response time was four hours; hot leads regularly went cold, and duplicate records made attribution impossible. The sales team spent the first hour of every day triaging instead of selling.",
    solution:
      "We connected every lead source to a single intake workflow. Each lead is enriched with firmographic data, scored against the team's qualification criteria, deduplicated against existing CRM records and routed to the right rep with full context in Slack. Nothing reaches the CRM without passing validation, and every step is logged and monitored with automatic retries.",
    results: [
      { value: "60s", label: "Avg lead response time" },
      { value: "0", label: "Duplicate records since launch" },
      { value: "31%", label: "Lift in qualified meetings" },
    ],
    tools: [
      { name: "HubSpot", icon: "/Assets/icons/icons/hubspot.png" },
      { name: "Salesforce", icon: "/Assets/icons/icons/salesforce.png" },
      { name: "Slack", icon: "/Assets/icons/icons/slack.png" },
    ],
    quote: {
      text: "Leads used to sit for half a day before anyone saw them. Now the right rep has full context before the prospect has closed the tab.",
      author: "Head of Sales",
      role: "B2B SaaS client",
    },
  },
  {
    slug: "finance-month-end-close",
    title: "Month-end close reduced from 5 days to 6 hours",
    client: "E-commerce operator, 8-figure revenue",
    industry: "E-commerce",
    summary:
      "Reconciliation across payments, invoicing and accounting ate a full working week every month. We automated the matching so exceptions are the only thing humans touch.",
    challenge:
      "Every month the finance team exported transactions from Stripe and PayPal, matched them line by line against invoices in spreadsheets, and chased discrepancies by email. The close took five days, mistakes surfaced weeks later, and the P&L was always out of date when leadership needed it.",
    solution:
      "We connected the payment processors, invoicing tool and accounting platform so every transaction reconciles automatically as it settles. Mismatches are flagged to the team with the exact records side by side; approvals stay human. A single trigger generates the P&L draft from live data, and every run is logged with alerting on failures.",
    results: [
      { value: "6h", label: "Month-end close (was 5 days)" },
      { value: "100%", label: "Transactions auto-reconciled" },
      { value: "12d", label: "Earlier P&L visibility" },
    ],
    tools: [
      { name: "Stripe", icon: "/Assets/icons/icons/stripe.svg" },
      { name: "PayPal", icon: "/Assets/icons/icons/paypal.svg" },
      { name: "Google Sheets", icon: "/Assets/icons/icons/sheets.png" },
    ],
    quote: {
      text: "Close used to be the week everyone dreaded. Now it's an afternoon, and the numbers are right the first time.",
      author: "Finance Lead",
      role: "E-commerce client",
    },
  },
  {
    slug: "ops-employee-onboarding",
    title: "New-hire onboarding with zero manual checklists",
    client: "Professional services firm, 120 employees",
    industry: "Professional services",
    summary:
      "Onboarding a new hire meant 30+ manual steps across five tools. We automated the entire sequence, from signed offer to first-day setup, with human approval gates where they matter.",
    challenge:
      "Each new hire triggered a 30-step checklist spread across HR, IT and the hiring manager: accounts to create, licences to assign, documents to send, intro meetings to book. Steps were missed weekly, new starters waited days for access, and HR spent two to three hours per hire chasing completion by Slack.",
    solution:
      "A signed offer now triggers the full onboarding sequence automatically: accounts provisioned, licences assigned, welcome documents sent, checklists created in Notion and intro meetings scheduled. Approval-sensitive steps route to the right owner with one-click sign-off, and a live status board shows exactly where every new hire stands.",
    results: [
      { value: "0", label: "Manual checklist steps" },
      { value: "3h", label: "Saved per hire in admin" },
      { value: "Day 1", label: "Full access for every starter" },
    ],
    tools: [
      { name: "Notion", icon: "/Assets/icons/icons/notion.png" },
      { name: "Airtable", icon: "/Assets/icons/icons/airtable.svg" },
      { name: "Slack", icon: "/Assets/icons/icons/slack.png" },
    ],
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}
