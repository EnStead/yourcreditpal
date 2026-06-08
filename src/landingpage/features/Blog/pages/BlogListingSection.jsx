import { useEffect, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { fetchBlogCategories, fetchBlogPosts } from '../api/blogQueries'
import BlogLoadingState from './BlogLoadingState'

const formatBlogDate = (value) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))

const BlogListingSection = () => {
  const [activeCategory, setActiveCategory] = useState('all-blogs')
  const [categories, setCategories] = useState([{ _id: 'all', title: 'All Blogs', slug: 'all-blogs' }])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [visibleCount, setVisibleCount] = useState(12)

  useEffect(() => {
    let isMounted = true

    const loadPosts = async () => {
      try {
        const [categoryResult, postResult] = await Promise.all([fetchBlogCategories(), fetchBlogPosts()])

        if (isMounted) {
          const shuffledCategories = [...categoryResult].sort(() => Math.random() - 0.5).slice(0, 5)
          setCategories([{ _id: 'all', title: 'All Blogs', slug: 'all-blogs' }, ...shuffledCategories])
          setPosts(postResult)
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError?.message || 'Unable to load blog posts from Sanity.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadPosts()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all-blogs') {
      return posts
    }

    return posts.filter((post) => post.category?.slug === activeCategory)
  }, [activeCategory, posts])

  const listPosts = filteredPosts

  return (
    <section className="px-5 py-14 sm:px-8 lg:px-20">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => {
              setActiveCategory(category.slug || 'all-blogs')
              setVisibleCount(12)
            }}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              activeCategory === (category.slug || 'all-blogs')
                ? 'border-brand-primary bg-brand-primary text-brand-white'
                : 'border-brand-stroke bg-white text-brand-body hover:border-brand-primary hover:text-brand-primary'
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {error ? (
        <p className="mt-10 rounded-xl border border-brand-stroke bg-brand-offwhite px-4 py-3 text-sm text-brand-body">
          {error}
        </p>
      ) : null}

      {loading ? (
        <BlogLoadingState />
      ) : (
        <>
          <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
            {listPosts.slice(0, visibleCount).map((post) => (
              <NavLink
                key={post._id}
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-4"
              >
                <div className="relative overflow-hidden rounded-[0.6rem] bg-brand-offwhite">
                  <img
                    src={post.thumbnailImage}
                    alt={post.thumbnailAlt || post.title}
                    className="h-[18rem] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  {post.featured ? (
                    <span className="absolute right-3 top-3 rounded-full bg-brand-white px-3 py-1 text-xs font-semibold text-brand-primary shadow-soft">
                      Featured
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col pt-4">
                  <h3 className="text-xl font-bold tracking-[-0.03em] text-brand-title line-clamp-2">{post.title}</h3>
                  <p className="mb-6 mt-2 text-sm leading-6 text-brand-body line-clamp-2">{post.excerpt}</p>

                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-brand-stroke pt-4 text-sm">
                    <div className="text-brand-body">
                      <span>{formatBlogDate(post.publishDate)}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTimeMinutes} Min read</span>
                    </div>
                    <span className="inline-flex items-center gap-1 font-semibold text-brand-primary transition group-hover:gap-2">
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </>
      )}

      {!loading && !error && filteredPosts.length === 0 ? (
        <p className="mt-10 text-center text-sm text-brand-body">No blog posts found for this category.</p>
      ) : null}

      {!loading && !error && visibleCount < listPosts.length ? (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="rounded-xl border border-brand-stroke bg-white px-6 py-3 text-sm font-medium text-brand-title transition hover:border-brand-primary hover:text-brand-primary"
          >
            Load More
          </button>
        </div>
      ) : null}
    </section>
  )
}

export default BlogListingSection
