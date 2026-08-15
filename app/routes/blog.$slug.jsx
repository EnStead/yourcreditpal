import BlogPostSection from '../../src/landingpage/features/Blog/pages/BlogPostSection'
import { fetchBlogPostBySlug, fetchBlogPosts } from '../../src/landingpage/features/Blog/api/blogQueries'
import { buildMeta, SITE_URL, canonical } from '../lib/seo'

const loadPost = async (slug) => {
  try {
    const [post, allPosts] = await Promise.all([fetchBlogPostBySlug(slug), fetchBlogPosts()])
    const morePosts = (allPosts || []).filter((entry) => entry.slug !== post?.slug).slice(0, 3)
    return { post, morePosts }
  } catch {
    return { post: null, morePosts: [] }
  }
}

// Runs at build for every prerendered slug (per-post meta in the static HTML).
export const loader = ({ params }) => loadPost(params.slug)
// Runs in the browser for slugs added after the last build.
export const clientLoader = ({ params }) => loadPost(params.slug)

export function meta({ data, params }) {
  const post = data?.post
  if (!post) {
    return buildMeta({ title: 'Blog | YourCreditPal', path: `/blog/${params.slug}` })
  }
  const tags = buildMeta({
    title: `${post.title} | YourCreditPal`,
    description: post.excerpt || `${post.title}: a personal finance guide from YourCreditPal.`,
    path: `/blog/${params.slug}`,
    image: post.heroImage || undefined,
    type: 'article',
  })

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.heroImage || undefined,
    datePublished: post.publishDate || undefined,
    mainEntityOfPage: canonical(`/blog/${params.slug}`),
    publisher: { '@type': 'Organization', name: 'YourCreditPal', url: SITE_URL },
  }

  return [...tags, { 'script:ld+json': articleJsonLd }]
}

export default function BlogPostRoute() {
  return <BlogPostSection />
}
