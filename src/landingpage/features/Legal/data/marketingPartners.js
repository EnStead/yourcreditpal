// Client-editable list of named lending partners / buyers shown on /legal/marketing-partners.
// No Sanity schema access from this session — see the note in `reference_sheet_export_technique`-
// adjacent context for the other developer: this should move to a Sanity singleton document
// (e.g. `partnersPage` with a `partners` array of {name, url}) once Studio access is available,
// so the client can edit it without a GitHub commit. Until then, edit this array directly.
//
// Real partner names are blocked on Open Item O-08 (client-supplied) and Boberdoo buyer tier
// setup (F-150-153) — this list is intentionally empty until that content exists.
export const marketingPartners = [
  // { name: 'Example Lending Partner', url: 'https://example.com' },
]
