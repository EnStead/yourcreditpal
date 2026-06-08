import { sanityClient } from '../../../../sanity/client'

export const fetchBlogCategories = () =>
  sanityClient.fetch(`*[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }`)

const blogFields = `
  _id,
  title,
  "slug": slug.current,
  featured,
  category->{_id, title, "slug": slug.current},
  "thumbnailImage": thumbnailImage.asset->url,
  "thumbnailAlt": thumbnailImage.alt,
  "heroImage": heroImage.asset->url,
  "heroAlt": heroImage.alt,
  excerpt,
  publishDate,
  readTimeMinutes,
  articleSummary,
  quickTakeaways,
  body[]{
    ...,
    _type == "image" => {
      "image": asset->url,
      alt,
      caption
    }
  },
  infoBoxTitle,
  infoBoxDescription
`

export const blogListQuery = `*[_type == "blogPost"] | order(featured desc, publishDate desc) { ${blogFields} }`

export const blogPostQuery = `*[_type == "blogPost" && slug.current == $slug][0] { ${blogFields} }`

export const fetchBlogPosts = () => sanityClient.fetch(blogListQuery)

export const fetchBlogPostBySlug = (slug) => sanityClient.fetch(blogPostQuery, { slug })
