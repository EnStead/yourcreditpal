import Logo from '../../assets/Logo.svg?react'
import Facebook from '../../assets/Facebook.svg'
import Instagram from '../../assets/Instagram.svg'
import Linkedin from '../../assets/Linkedin.svg'
import Twitter from '../../assets/Twitter.svg'
import { NavLink } from 'react-router-dom'

const quickLinks = [
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Why YourCreditPal', to: '/#why' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Blogs', to: '/blog' },
  { label: 'Apply Now', to: '/apply' },
]

const legalLinks = [
  { label: 'Terms', to: '/legal/terms-conditions' },
  { label: 'Privacy Policy', to: '/legal/privacy-policy' },
  { label: 'Financial Disclosure', to: '/legal/financial-disclosures' },
  { label: 'E-Consent', to: '/legal/electronic-consent' },
  { label: 'Marketing Partners', to: '/legal/marketing-partners' },
  { label: 'Do Not Sell My Info', to: '/legal/do-not-sell' },
]

const supportLinks = [
  { label: 'Contact Support', to: '/' },
  { label: 'Unsubscribe', to: '/unsubscribe' },
]

const socials = [
  { label: 'Twitter', src: Twitter },
  { label: 'LinkedIn', src: Linkedin },
  { label: 'Facebook', src: Facebook },
  { label: 'Instagram', src: Instagram },
]

const Footer = () => {
  return (
    <footer className="border-t border-brand-stroke bg-brand-offwhite">
      <div className="px-5 py-12 sm:px-8 lg:px-20">
        <div className="flex flex-col gap-6 border-b border-brand-stroke pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="max-w-2xl text-3xl font-bold tracking-[-0.04em] text-brand-secondary sm:text-4xl">
              Explore Your Loan Options Today
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-brand-label">
              Complete a quick application and see if you may qualify through our lending partner network.
            </p>
          </div>

          <NavLink
            to="/apply"
            className="inline-flex items-center justify-center rounded-xl bg-brand-secondary px-7 py-3 text-sm font-semibold text-brand-white transition hover:bg-brand-primary"
          >
            Start My Application
          </NavLink>
        </div>

        <div className="grid gap-10 py-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <NavLink to="/" className="inline-flex items-center gap-3" aria-label="YourCreditPal home">
              <Logo className="h-10 w-10 text-brand-primary" aria-hidden="true" />
              <span className="text-lg font-semibold tracking-[-0.03em] text-brand-title">YourCreditPal</span>
            </NavLink>
            <p className="mt-4 max-w-sm text-sm leading-6 text-brand-label">
              YourCreditpal helps connect applicants with lending partners through a fast, secure, and simplified online
              experience.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand-title">Quick Links</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-brand-body">
              {quickLinks.map((link) => (
                <NavLink key={link.label} to={link.to} className="w-fit transition hover:text-brand-primary">
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand-title">Legal</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-brand-body">
              {legalLinks.map((link) => (
                <NavLink key={link.label} to={link.to} className="w-fit transition hover:text-brand-primary">
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand-title">Support</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-brand-body">
              {supportLinks.map((link) => (
                <NavLink key={link.label} to={link.to} className="w-fit transition hover:text-brand-primary">
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-brand-lightblue px-5 py-4 text-sm leading-7 text-brand-body">
          YourCreditpal is not a lender and does not make credit decisions. Loan approval, rates, and terms are
          determined by individual lenders based on their own criteria and applicable laws. Submitting a request
          through YourCreditpal does not guarantee approval for a loan offer.
        </div>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-brand-body">© 2026 YourCreditpal. All rights reserved.</p>

          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href="/"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full transition hover:scale-105"
              >
                <img src={social.src} alt="" className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
