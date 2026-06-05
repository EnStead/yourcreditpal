import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from '../../assets/Logo.svg?react'

const navItems = [
//   { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Blogs', to: '/blog' },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isMenuOpen) return

    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setIsMenuOpen(false)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-50">
      <div className="relative z-50 flex items-center justify-between gap-4 bg-brand-white/90 px-5 py-4 backdrop-blur-md sm:px-10 lg:px-20">
        <NavLink to="/" className="flex items-center gap-3" aria-label="YourCreditPal home">
          <Logo className="h-10 w-auto text-brand-primary" aria-hidden="true" />
          <div>
            <h3 className="text-lg font-bold">YourCreditPal</h3>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 ls:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => {
                const isHashLink = item.to.includes('#');
                return `rounded-full px-4 py-2 text-base font-medium transition ${
                  isActive && !isHashLink
                    ? 'bg-brand-title text-brand-white'
                    : 'text-brand-body hover:bg-brand-white hover:text-brand-primary'
                }`;
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/apply"
          className="hidden items-center rounded-xl bg-brand-secondary px-10 py-3 text-sm font-semibold text-brand-white transition hover:bg-brand-primary ls:inline-flex"
        >
          Apply Now
        </NavLink>

        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center text-brand-title transition hover:border-brand-primary hover:text-brand-primary ls:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={`fixed inset-x-0 top-[73px] z-40 border-t border-brand-stroke bg-brand-white/98 px-5 backdrop-blur-md transition-[max-height,opacity,transform] duration-300 ease-out ls:hidden ${
          isMenuOpen
            ? 'pointer-events-auto max-h-[28rem] translate-y-0 opacity-100'
            : 'pointer-events-none max-h-0 -translate-y-2 overflow-hidden opacity-0'
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4 py-5 sm:px-3">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => {
                  const isHashLink = item.to.includes('#')

                  return `rounded-xl px-4 py-3 text-base font-medium transition ${
                    isActive && !isHashLink
                      ? 'bg-brand-lightblue text-brand-title'
                      : 'text-brand-body hover:bg-brand-offwhite hover:text-brand-primary'
                  }`
                }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <NavLink
            to="/apply"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-xl bg-brand-secondary px-6 py-3 text-sm font-semibold text-brand-white transition hover:bg-brand-primary"
          >
            Apply Now
          </NavLink>
        </div>
      </div>

      {isMenuOpen ? (
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-30 cursor-default bg-brand-title/20 backdrop-blur-[1px] ls:hidden"
        />
      ) : null}
    </header>
  )
}

export default Navbar
