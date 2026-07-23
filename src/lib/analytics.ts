import { track } from "@vercel/analytics"

export function trackEvent(name: string, props?: Record<string, string | number | boolean>) {
  track(name, props)
}

// Pre-defined event helpers for consistency
export const analytics = {
  ctaClick: (label: string, location: string) =>
    trackEvent("cta_click", { label, location }),

  bookAuditClick: (location: string) =>
    trackEvent("book_audit_click", { location }),

  contactFormSubmit: (service: string) =>
    trackEvent("contact_form_submit", { service }),

  newsletterSubscribe: (location: string) =>
    trackEvent("newsletter_subscribe", { location }),

  searchQuery: (query: string, resultCount: number) =>
    trackEvent("search_query", { query, result_count: resultCount }),

  blogPostView: (slug: string, category: string) =>
    trackEvent("blog_post_view", { slug, category }),

  caseStudyView: (slug: string, industry: string) =>
    trackEvent("case_study_view", { slug, industry }),

  externalLinkClick: (href: string, label: string) =>
    trackEvent("external_link_click", { href, label }),
} as const
