import type { MetadataRoute } from "next"

const AI_SEARCH_AND_RETRIEVAL_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
]

const AI_TRAINING_BOTS = ["GPTBot", "ClaudeBot", "Google-Extended"]

const DISALLOW = ["/dashboard/", "/login", "/api/"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...[...AI_SEARCH_AND_RETRIEVAL_BOTS, ...AI_TRAINING_BOTS].map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: "https://aronix.io/sitemap.xml",
  }
}
