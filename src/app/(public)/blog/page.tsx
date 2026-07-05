import type { Metadata } from "next"
import { getFeaturedPost, getPublishedCategories, getPublishedPosts } from "@/lib/supabase/blog"
import { BlogHero } from "@/components/sections/BlogHero"
import { CategoryFilter } from "@/components/sections/CategoryFilter"
import { NewsletterBand } from "@/components/sections/NewsletterBand"
import { FeaturedPostCard, PostCard } from "@/components/cards/BlogPostCard"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on automation, operations and growth. Practical thinking on how growing teams remove manual work and build reliable systems.",
  openGraph: {
    title: "Blog | Aronix",
    description: "Insights on automation, operations and growth.",
    url: "/blog",
    siteName: "Aronix",
    locale: "en_GB",
    type: "website",
  },
  alternates: { canonical: "/blog" },
}

export const revalidate = 60

type SearchParams = Promise<{ category?: string }>

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const { category } = await searchParams
  const [posts, featured, categories] = await Promise.all([
    getPublishedPosts(),
    getFeaturedPost(),
    getPublishedCategories(),
  ])

  const activeCategory = category && categories.includes(category) ? category : undefined
  const showFeatured = !activeCategory && featured !== null

  const gridPosts = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts.filter((p) => !showFeatured || p.id !== featured?.id)

  return (
    <>
      <BlogHero count={posts.length} />

      <section className="px-12 pt-14 pb-24" aria-label="Blog posts">
        <div className="max-w-[1280px] mx-auto">
          <CategoryFilter categories={categories} active={activeCategory} />

          {showFeatured && featured && <FeaturedPostCard post={featured} />}

          {gridPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[16px] text-[var(--ax-fg-2)]">
                {activeCategory
                  ? `No posts in ${activeCategory} yet. Check back soon.`
                  : "No posts published yet. Check back soon."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridPosts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <NewsletterBand />
    </>
  )
}
