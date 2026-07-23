import type { MetadataRoute } from "next"
import { getPublishedPosts } from "@/lib/supabase/blog"
import { getPublishedCaseStudies } from "@/lib/supabase/case-studies"

export const revalidate = 3600

const SITE_URL = "https://aronix.io"

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "",                              priority: 1.0, changeFrequency: "weekly" },
  { path: "/services",                     priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/ai-voice-agents",     priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/speed-to-lead",       priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/ai-chat-booking",     priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/workflow-automation",  priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/crm-integrations",    priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/websites",            priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/local-seo",           priority: 0.8, changeFrequency: "monthly" },
  { path: "/case-studies",                 priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog",                         priority: 0.8, changeFrequency: "daily" },
  { path: "/contact",                      priority: 0.7, changeFrequency: "monthly" },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies] = await Promise.all([
    getPublishedPosts(),
    getPublishedCaseStudies(),
  ])

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE_URL}/case-studies/${cs.slug}`,
    lastModified: new Date(cs.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries, ...caseStudyEntries]
}
