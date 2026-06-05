import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'xqdkz7sb',
  dataset: 'production',
  apiVersion: '2026-06-02',
  useCdn: false,
})
