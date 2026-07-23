import Blog from '../../src/landingpage/features/Blog'
import { fetchBlogCategories, fetchBlogPosts } from '../../src/landingpage/features/Blog/api/blogQueries'
import { buildMeta } from '../lib/seo'

const loadList = async () => {
  try {
    const [categories, posts] = await Promise.all([fetchBlogCategories(), fetchBlogPosts()])
    return { categories: (categories || []).slice(0, 5), posts: posts || [] }
  } catch {
    return { categories: [], posts: [] }
  }
}

export const loader = () => loadList()
export const clientLoader = () => loadList()

export const meta = () =>
  buildMeta({
    title: 'Blog — Personal Finance & Loan Guides | YourCreditPal',
    description:
      'Practical guides on personal loans, credit, and borrowing decisions from YourCreditPal.',
    path: '/blog',
  })

export default function BlogRoute() {
  return <Blog />
}
