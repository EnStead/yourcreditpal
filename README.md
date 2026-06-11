# YourCreditPal

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?logo=sanity&logoColor=fff)](https://www.sanity.io/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=fff)](https://vercel.com/)

YourCreditPal is a loan discovery and application experience that helps users explore personal loan options through a clear, secure, and friendly interface.

The app includes a marketing landing page, multi-step application form, FAQ, legal pages, unsubscribe flow, and a Sanity-powered blog.

## Design

[YourCreditPal Figma File](https://www.figma.com/design/MZZFCz7O3nBR3RrTTBeEtL/CreditPal)

## Credits

| Role | Name | GitHub |
| --- | --- | --- |
| Product Designer | DesignedbyBami | [designedbybami](https://github.com/designedbybami) |
| Developer | Anjyfade | [anjyfade1](https://github.com/anjyfade1) |

## Features

- Responsive landing page
- Multi-step loan application form
- Sanity-powered blog listing and article pages
- FAQ page
- Legal and disclosure pages
- Unsubscribe and communication preference flow
- Meta Pixel tracking for PageView, ViewContent, and InitiateCheckout
- Vercel API route for unsubscribe submissions to Google Sheets

## Tech Stack

| Tool | Purpose |
| --- | --- |
| React 19 | UI framework |
| Vite 8 | Development and production build |
| Tailwind CSS 4 | Styling |
| React Router | Routing |
| Sanity CMS | Blog content |
| Google Sheets API | Unsubscribe records |
| Meta Pixel | Frontend analytics events |
| Vercel | Hosting and API functions |

## Getting Started

Use Node.js `20.19+` or `22.12+`.

```bash
npm install
npm run dev
```

Local development usually runs at:

```text
http://localhost:5173
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Routes

| Route | Page |
| --- | --- |
| `/` | Homepage |
| `/apply` | Loan application form |
| `/faq` | FAQ |
| `/blog` | Blog listing |
| `/blog/:slug` | Blog article |
| `/legal/:slug` | Legal page |
| `/unsubscribe` | Communication preferences |

## Environment Variables

Add these in Vercel for production:

```text
VITE_SANITY_PROJECT_ID
VITE_SANITY_DATASET
VITE_SANITY_API_VERSION
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY
GOOGLE_SHEET_ID
```

Optional:

```text
GOOGLE_UNSUBSCRIBE_RANGE
```

If `GOOGLE_UNSUBSCRIBE_RANGE` is not provided, unsubscribe requests are appended to:

```text
A:M
```

Meta Pixel IDs are currently configured directly in the frontend code. Lead tracking is intentionally not implemented until backend validation and CAPI support are ready.

## Project Structure

```text
src/
  app/                         # App router
  landingpage/
    components/                # Shared UI
    features/
      ApplyForm/               # Application flow
      Blog/                    # Blog pages
      FAQ/                     # FAQ page
      Home/                    # Homepage sections
      Legal/                   # Legal pages
      Unsubscribe/             # Unsubscribe flow
  sanity/                      # Sanity client
  assets/                      # Images and SVGs
api/                           # Vercel API functions
```

## Deployment

The project is configured for Vercel using `vercel.json`.

Before deploying, confirm:

- Sanity env variables are set.
- Google Sheets service account env variables are set.
- The unsubscribe Google Sheet is shared with the service account email.
- `npm run lint` passes.
- `npm run build` passes.

## Notes

- Blog content depends on the configured Sanity project.
- Unsubscribe submissions are sent to Google Sheets.
- Legal privacy opt-out requests use a Google Form link.
- Application lead submission and Lead pixel tracking are pending backend integration.

## License

This project is private and proprietary.
