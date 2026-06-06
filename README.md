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

## Product Flow

YourCreditPal is designed around a lead qualification and routing flow:

```text
Loan applicant
  -> Frontend loan form
  -> Backend validation, scoring, and suppression
  -> Third-party checks
  -> Qualified leads route to Boberdoo
  -> Buyer/lender response returns to frontend
  -> Database stores the full lead record and routing result
```

In simple terms: the frontend collects the applicant, the backend qualifies the applicant, Boberdoo attempts to match or sell the qualified lead, and the database keeps the full record.

## Credits

| Role | Name | GitHub |
| --- | --- | --- |
| Product Designer | DesignedbyBami | [designedbybami](https://github.com/designedbybami) |
| Developer | Anjyfade | [anjyfade1](https://github.com/anjyfade1) |

## What Is Inside

- Home page with hero, benefits, loan purposes, testimonials, and security sections
- Multi-step loan application form
- Planned matched, fallback, and correction states for backend responses
- FAQ page
- Blog listing and article pages powered by Sanity
- Legal and disclosure pages
- Unsubscribe and communication preferences page
- Netlify deployment configuration
- Responsive Tailwind-based interface

## Application Flow Requirements

The intended applicant flow has two main stages.

**Page 1: Loan Basics**

- Loan amount
- Loan purpose
- Credit score range
- First name and last name
- Email and phone
- State and ZIP code
- CTA: `See My Loan Options`

**Page 2: Applicant Details**

- Employment status
- Monthly income
- Bank name
- Account type
- Housing status
- Date of birth
- Street address
- City and ZIP code
- CTA: `Submit My Application`

After submission, the frontend should show the correct result based on the backend response:

- Matched page
- Still searching or soft-reject thank-you page
- Error/correction state
- No-buyer fallback page

## Integration Plan

| Service | Purpose | Owner |
| --- | --- | --- |
| [TrustedForm](https://activeprospect.com/products/trustedform-for-publishers/) | Capture and store proof of consent | Frontend + Backend |
| [Twilio Lookup](https://www.twilio.com/en-us/user-authentication-identity/lookup) | Validate phone number, carrier, and VoIP status | Backend |
| [Email Verifier](https://emailverifier.io/) | Validate email deliverability and filter risky addresses | Backend |
| [Google Sheets](https://workspace.google.com/products/sheets/) | Store soft rejects, lower-quality leads, and remarketing records | Backend |
| [Boberdoo](https://www.boberdoo.com/) | Route qualified leads to buyers/lenders | Backend |
| Database | Store lead records, scores, suppression checks, and routing history | Backend |

## Response Handling

The backend should classify every submission and return one of the expected outcomes:

```json
{
  "status": "matched",
  "redirect_url": "https://buyer.com/continue"
}
```

```json
{
  "status": "soft_reject",
  "message": "We are still searching for lenders."
}
```

```json
{
  "status": "hard_reject",
  "message": "Please check your information and try again."
}
```

## Team Ownership

| Area | Owner |
| --- | --- |
| Form UX, validation states, thank-you pages, legal pages, user guidance copy | Design |
| Form implementation, input collection, TrustedForm capture, backend submission, response handling | Frontend |
| Validation, suppression checks, scoring, database, Google Sheets, Boberdoo routing, third-party APIs | Backend |

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

- The current application form UI should be aligned with the final two-stage loan flow.
- The application form still needs backend submission, TrustedForm capture, loading states, and backend response handling.
- Backend validation should cover phone, email, age, ZIP/state match, income, loan amount, and name quality.
- Backend suppression should check phone, email, previous opt-outs, complaints, and recent duplicates.
- Qualified leads should route to Boberdoo.
- Soft rejects and lower-quality leads should be stored in Google Sheets or the configured database workflow.
- All valid records should be stored with score, source, status, suppression result, routing result, and timestamp.
- The unsubscribe form should be connected to an Excel or Google Sheets spreadsheet workflow.
- The legal opt-out link should point to a Google Form.
- Blog content depends on the configured Sanity project.
- Legal copy and disclaimers should be reviewed before production use.

## Pre-Launch Checklist

- Run `npm run lint` and fix reported issues.
- Run `npm run build` on a supported Node version.
- Align the application UI with the final two-stage loan flow.
- Add loading, hard-reject, soft-reject, matched, and no-buyer fallback states.
- Connect the application form to the backend lead workflow.
- Add TrustedForm certificate capture.
- Connect Twilio Lookup and Email Verifier through the backend.
- Connect qualified lead routing to Boberdoo.
- Store lead records, scores, suppression results, and routing history in the database.
- Connect unsubscribe requests to the spreadsheet or preference-management flow.
- Add the legal privacy request Google Form URL.
- Move Sanity values into environment variables.
- Review all legal pages and disclosure copy.
- Verify support, social, and contact links.
- Test mobile, tablet, and desktop layouts.

## License

This project is private and proprietary.
