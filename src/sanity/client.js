import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-06-02'

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity environment variables. Set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET in your .env.local file.',
  )
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})
