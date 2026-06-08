import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { NavLink, Navigate, useParams } from 'react-router-dom'
import Share from '../../../../assets/Share.svg?react'
import Twitter from '../../../../assets/Twitter.svg?react'
import Linkedin2 from '../../../../assets/LinkedinB.svg?react'
import Whatsapp from '../../../../assets/Whatsapp.svg?react'
import { fetchBlogPostBySlug, fetchBlogPosts } from '../api/blogQueries'

const formatBlogDate = (value) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))

const renderPortableText = (block) => {
  const markDefs = Object.fromEntries((block.markDefs || []).map((markDef) => [markDef._key, markDef]))

  return (block.children || []).map((child, index) => {
    const text = child.text
    let content = text

    if (child.marks?.includes('strong')) {
      content = <strong className="font-semibold text-brand-title">{content}</strong>
    }

    if (child.marks?.includes('em')) {
      content = <em className="italic">{content}</em>
    }

    child.marks?.forEach((mark) => {
      const markDef = markDefs[mark]

      if (markDef?.href) {
        content = (
          <a
            href={markDef.href}
            target={markDef.blank ? '_blank' : '_self'}
            rel={markDef.blank ? 'noreferrer' : undefined}
            className="font-medium text-brand-primary underline underline-offset-4"
          >
            {content}
          </a>
        )
      }
    })

    return <span key={`${text}-${index}`}>{content}</span>
  })
}

const renderBodyBlock = (block) => {
  if (block._type === 'block') {
    if (block.style === 'h2' || block.style === 'h3') {
      return (
        <h3 key={block._key || block.children?.[0]?.text} className="text-3xl font-bold tracking-[-0.03em] text-brand-title">
          {renderPortableText(block)}
        </h3>
      )
    }

    if (block.style === 'blockquote') {
      return (
        <blockquote
          key={block._key || block.children?.[0]?.text}
          className="border-l-4 border-brand-accent1 bg-brand-offwhite px-5 py-4 text-base leading-8 text-brand-title"
        >
          {renderPortableText(block)}
        </blockquote>
      )
    }

    if (block.listItem) {
      return (
        <p key={block._key || block.children?.[0]?.text} className="text-base leading-8 text-brand-body">
          • {renderPortableText(block)}
        </p>
      )
    }

    return (
      <p key={block._key || block.children?.[0]?.text} className="text-base leading-8 text-brand-body">
        {renderPortableText(block)}
      </p>
    )
  }

  if (block._type === 'image') {
    return (
      <figure key={block.alt || block.image} className="mx-auto my-2 w-full max-w-3xl space-y-2">
        <img src={block.image} alt={block.alt || ''} className="aspect-[16/9] w-full rounded-[0.75rem] object-cover" />
        {block.caption ? <figcaption className="text-xs text-brand-label">{block.caption}</figcaption> : null}
      </figure>
    )
  }

  if (block._type === 'heading') {
    return (
      <h3 key={block.text} className="text-3xl font-bold tracking-[-0.03em] text-brand-title">
        {block.text}
      </h3>
    )
  }

  if (block._type === 'paragraph') {
    return (
      <p key={block.text} className="text-base leading-8 text-brand-body">
        {block.text}
      </p>
    )
  }

  if (block._type === 'quote') {
    return (
      <blockquote
        key={block.text}
        className="border-l-4 border-brand-accent1 bg-brand-offwhite px-5 py-4 text-base leading-8 text-brand-title"
      >
        {block.text}
      </blockquote>
    )
  }

  if (block._type === 'list') {
    return (
      <div key={block.items?.[0]?.title || 'list'} className="space-y-4">
        {block.items?.map((item) => (
          <div key={item.title}>
            <h4 className="text-lg font-semibold text-brand-title">• {item.title}</h4>
            <p className="mt-1 text-base leading-8 text-brand-body">{item.text}</p>
          </div>
        ))}
      </div>
    )
  }

  return null
}

const BlogPostSection = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [morePosts, setMorePosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)
  const toastTimerRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    const loadPost = async () => {
      try {
        const [postResult, allPostsResult] = await Promise.all([fetchBlogPostBySlug(slug), fetchBlogPosts()])

        if (isMounted) {
          setPost(postResult)
          setMorePosts(allPostsResult.filter((entry) => entry.slug !== postResult?.slug).slice(0, 3))
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError?.message || 'Unable to load this blog post from Sanity.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadPost()

    return () => {
      isMounted = false
    }
  }, [slug])

  const renderedBody = useMemo(() => post?.body || [], [post])
  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return window.location.href
  }, [post?.slug])

  const shareTitle = post?.title || 'YourCreditPal blog post'

  const openShareWindow = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    window.clearTimeout(toastTimerRef.current)
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2600)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      showToast('Link copied to clipboard.')
    } catch {
      openShareWindow(shareUrl)
      showToast('Clipboard unavailable. Opened the share link instead.', 'info')
    }
  }

  const handleShareX = () => {
    openShareWindow(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`)
  }

  const handleShareLinkedIn = () => {
    openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)
  }

  const handleShareWhatsApp = () => {
    openShareWindow(`https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`)
  }

  if (!loading && !post) return <Navigate to="/blog" replace />

  if (loading) {
    return <section className="px-5 py-20 sm:px-8 lg:px-20">Loading article...</section>
  }

  return (
    <section className="pb-24 pt-4">
      <div className="grid gap-10 ls:grid-cols-[1.05fr_0.95fr] ls:items-center">
        <div className="relative overflow-hidden  h-[350px] sm:h-[450px] ls:h-[calc(100vh-160px)]">
          <img src={post.heroImage} alt={post.heroAlt || post.title} className="h-full w-full object-cover" />
        </div>

        <div className="px-5">
          <p className="text-sm font-medium text-brand-accent2">
            {formatBlogDate(post.publishDate)} • {post.readTimeMinutes} Min read
          </p>
          <h2 className="my-6 max-w-2xl text-[40px] font-bold tracking-[-0.04em] text-brand-title">
            {post.title}
          </h2>
          <p className="max-w-2xl text-xl leading-8 text-brand-body">{post.excerpt}</p>
        </div>
      </div>

      {error ? (
        <div className="mx-auto mt-8 max-w-4xl px-5">
          <p className="rounded-xl border border-brand-stroke bg-brand-offwhite px-4 py-3 text-sm text-brand-body">
            {error}
          </p>
        </div>
      ) : null}

      <div className="mx-auto mt-14 max-w-4xl px-5">
        <main className="space-y-10">
          <div>
            <h3 className="text-2xl font-bold tracking-[-0.03em] text-brand-title">Article Summary</h3>
            <p className="mt-4 text-sm leading-7 text-brand-body">{post.articleSummary}</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold tracking-[-0.03em] text-brand-title">Quick Takeaways</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-brand-body">
              {post.quickTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {renderedBody.map(renderBodyBlock)}
        </main>

        <article className="mt-10 rounded-[0.75rem] border border-brand-stroke bg-brand-white p-6">
          <h3 className="text-xl font-bold tracking-[-0.03em] text-brand-title">{post.infoBoxTitle}</h3>
          <p className="mt-3 text-sm leading-7 text-brand-body">{post.infoBoxDescription}</p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-brand-stroke pt-5">
            <span className="text-sm text-brand-body">Share this post</span>
            <div className="flex items-center gap-5 text-brand-title">
              <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Copy link"
                className="transition hover:text-brand-primary"
              >
                <Share className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleShareX}
                aria-label="Share on X"
                className="transition hover:text-brand-primary"
              >
                <Twitter className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleShareLinkedIn}
                aria-label="Share on LinkedIn"
                className="transition hover:text-brand-primary"
              >
                <Linkedin2 className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleShareWhatsApp}
                aria-label="Share on WhatsApp"
                className="transition hover:text-brand-primary"
              >
                <Whatsapp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </article>
      </div>

      {toast ? (
        <div className="pointer-events-none fixed bottom-5 right-5 z-50">
          <div
            className={`pointer-events-auto flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm shadow-[0_18px_45px_rgba(0,0,0,0.16)] backdrop-blur-md transition-all duration-300 ${
              toast.type === 'info'
                ? 'border-brand-stroke bg-brand-white/95 text-brand-title'
                : 'border-brand-primary/20 bg-brand-white/95 text-brand-title'
            }`}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                toast.type === 'info'
                  ? 'bg-brand-lightblue text-brand-title'
                  : 'bg-brand-primary text-brand-white'
              }`}
            >
              {toast.type === 'info' ? 'i' : '✓'}
            </span>
            <p className="max-w-[18rem]">{toast.message}</p>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="ml-1 text-brand-label transition hover:text-brand-title"
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        </div>
      ) : null}

      <div className="mt-20 w-full border-t border-brand-stroke" />

      <div className="mt-16 px-5 lg:px-20">
        <h3 className="text-3xl font-bold tracking-[-0.03em] text-brand-title">More Blogs like this</h3>
        <div className="mt-8 grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {morePosts.map((relatedPost) => (
            <article key={relatedPost._id} className="group flex flex-col">
              <div className="overflow-hidden rounded-[0.6rem] bg-brand-offwhite">
                <img
                  src={relatedPost.thumbnailImage}
                  alt={relatedPost.thumbnailAlt || relatedPost.title}
                  className="h-[13rem] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="pt-4">
                <h4 className="text-lg font-bold tracking-[-0.03em] text-brand-title">{relatedPost.title}</h4>
                <p className="mt-2 text-sm leading-6 text-brand-body">{relatedPost.excerpt}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-brand-stroke pt-4 text-sm">
                  <span className="text-brand-body">
                    {formatBlogDate(relatedPost.publishDate)}
                    <span className="mx-2">•</span>
                    {relatedPost.readTimeMinutes} Min read
                  </span>
                  <NavLink
                    to={`/blog/${relatedPost.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-brand-primary transition hover:gap-2"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </NavLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogPostSection
