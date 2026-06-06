# YourCreditPal

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?logo=sanity&logoColor=fff)](https://www.sanity.io/)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify&logoColor=fff)](https://www.netlify.com/)

YourCreditPal is a modern loan discovery and application experience that helps users explore personal loan options with a clear, friendly, and trustworthy interface.

The project includes a public marketing site, multi-step application flow, FAQ, legal pages, unsubscribe preferences, and a Sanity-powered blog.

## Design Source

The product UI was designed in Figma:

[CreditPal Figma File](https://www.figma.com/design/MZZFCz7O3nBR3RrTTBeEtL/CreditPal)

## Credits

| Role | Name | GitHub | X | Portfolio |
| --- | --- | --- | --- | --- |
| Product Designer | DesignedbyBami | [designedbybami](https://github.com/designedbybami) |  |  |
| Developer | Anjyfade | [anjyfade1](https://github.com/anjyfade1) |  |  |

## What Is Inside

- Home page with hero, benefits, loan purposes, testimonials, and security sections
- Multi-step loan application form
- FAQ page
- Blog listing and article pages powered by Sanity
- Legal and disclosure pages
- Unsubscribe and communication preferences page
- Netlify deployment configuration
- Responsive Tailwind-based interface

## Tech Stack

| Tool | Purpose |
| --- | --- |
| React 19 | UI framework |
| Vite 8 | Development server and production build |
| Tailwind CSS 4 | Styling and design tokens |
| React Router | Client-side routing |
| Sanity CMS | Blog content management |
| Swiper | Carousels and sliders |
| GSAP | Motion and animation |
| Netlify | Hosting and deployment |

## Project Structure

```text
src/
  app/
    YourCreditPal.jsx          # App routing
  landingpage/
    components/                # Shared navigation, footer, helpers
    features/
      ApplyForm/               # Multi-step application flow
      Blog/                    # Blog listing and article pages
      FAQ/                     # Frequently asked questions
      Home/                    # Homepage sections
      Legal/                   # Legal and disclosure pages
      Unsubscribe/             # Communication preferences page
  sanity/
    client.js                  # Sanity client configuration
  assets/                      # Images and SVG assets
```

## Getting Started

### Requirements

Use Node.js `20.19+` or `22.12+`. Vite requires one of these versions.

### Install Dependencies

```bash
npm install
```

### Start The App

```bash
npm run dev
```

The local development URL is usually:

```text
http://localhost:5173
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |
| `npm run netlify:dev` | Run the app with Netlify Dev |
| `npm run netlify:deploy` | Build and deploy to Netlify |
| `npm run netlify:deploy:prod` | Build and deploy to production |

## Routes

| Route | Page |
| --- | --- |
| `/` | Homepage |
| `/apply` | Loan application form |
| `/faq` | FAQ |
| `/blog` | Blog listing |
| `/blog/:slug` | Blog article |
| `/legal/:slug` | Legal/disclosure page |
| `/unsubscribe` | Communication preferences |

## Sanity CMS

Blog content is loaded from Sanity through:

```text
src/sanity/client.js
```

Current values:

```js
projectId: 'xqdkz7sb'
dataset: 'production'
apiVersion: '2026-06-02'
```

For production, move these values into environment variables:

```env
VITE_SANITY_PROJECT_ID=
VITE_SANITY_DATASET=
VITE_SANITY_API_VERSION=
```

## Deployment

The project is configured for Netlify with `netlify.toml`.

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

The redirect keeps React Router pages working after deployment.

## Launch Notes

- The application form UI is present, but still needs a real submission endpoint.
- The unsubscribe form should be connected to the planned spreadsheet workflow.
- The legal opt-out link should point to the planned Google Form.
- Blog content depends on the configured Sanity project.
- Legal copy should be reviewed before production use.
- Support contact should remain consistent as `support@yourcreditpal.com`.

## Pre-Launch Checklist

- Run `npm run lint` and fix reported issues.
- Run `npm run build` on a supported Node version.
- Connect the application form to the required backend, CRM, or lender workflow.
- Connect unsubscribe requests to the spreadsheet or preference-management flow.
- Add the legal privacy request Google Form URL.
- Move Sanity values into environment variables.
- Review all legal pages and disclosure copy.
- Verify support, social, and contact links.
- Test mobile, tablet, and desktop layouts.

## License

This project is private and proprietary.
