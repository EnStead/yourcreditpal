import { useEffect, useMemo, useState } from 'react'
import Star from '../../../../assets/Star.svg?react'
import Seal from '../../../../assets/Seal.svg?react'
import Repay from '../../../../assets/Repay.svg?react'
import Pay from '../../../../assets/Pay.svg?react'

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/^\d+\.\s*/, '')
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '')

const resolveSectionId = (section) => {
  return section.anchor ? slugify(section.anchor) : slugify(section.title)
}

const resolveTocHref = (page, item) => {
  const itemSlug = slugify(item)
  const matchedSection = page.sections.find((section) => {
    const titleSlug = slugify(section.title)
    const anchorSlug = section.anchor ? slugify(section.anchor) : null

    return titleSlug === itemSlug || anchorSlug === itemSlug
  })

  return `#${matchedSection ? resolveSectionId(matchedSection) : itemSlug}`
}

const LegalPage = ({ page }) => {
  const [activeSectionId, setActiveSectionId] = useState(
    page.sections[0] ? resolveSectionId(page.sections[0]) : '',
  )

  const sectionIdMap = useMemo(() => {
    const map = new Map()

    page.sections.forEach((section) => {
      map.set(section.title, resolveSectionId(section))
    })

    return map
  }, [page.sections])

  const tocLinks = useMemo(() => {
    return page.toc.map((item) => ({
      label: item,
      href: resolveTocHref(page, item),
      id: resolveTocHref(page, item).slice(1),
    }))
  }, [page])

  useEffect(() => {
    const sectionElements = Array.from(sectionIdMap.values())
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sectionElements.length) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]) {
          setActiveSectionId(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-18% 0px -58% 0px',
        threshold: [0.1, 0.25, 0.4, 0.6, 0.8],
      },
    )

    sectionElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [sectionIdMap])

  return (
    <section className="px-5 py-12 sm:px-8 lg:px-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_260px] lg:gap-14">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-brand-accent2">{page.eyebrow}</span>
            <Star className="h-3 w-3 text-brand-accent2" />
          </div>

          <h1 className="mt-6 max-w-4xl text-3xl font-bold tracking-[-0.04em] text-brand-title sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-body">{page.intro}</p>

          {page.calloutTitle ? (
            <div className="mt-8 border-l-4 border-brand-accent1 bg-brand-offwhite px-5 py-4">
              <h2 className="text-xl font-bold tracking-[-0.03em] text-brand-title">{page.calloutTitle}</h2>
              <p className="mt-2 max-w-3xl text-base text-brand-body">{page.calloutBody}</p>
            </div>
          ) : null}

          <div className="mt-10 space-y-10">
            {page.sections.map((section) => (
              <article
                key={section.title}
                id={resolveSectionId(section)}
                className="scroll-mt-28"
              >
                <h2 className="text-xl sm:text-3xl font-bold tracking-[-0.03em] text-brand-title">{section.title}</h2>

                <div className="mt-4 space-y-4 text-base text-brand-body">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {section.bullets?.length ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-brand-body">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}

                {section.subParagraphs?.length ? (
                  <div className="mt-4 space-y-4 text-base text-brand-body">
                    {section.subParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}

                {section.subBullets?.length ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-brand-body">
                    {section.subBullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}

                {section.paragraphsAfter?.length ? (
                  <div className="mt-4 space-y-4 text-base text-brand-body">
                    {section.paragraphsAfter.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}

                {section.linkText ? (
                  <p className="mt-4 text-base text-brand-body">
                    {section.linkPrefix}
                    <a href={section.linkHref} className="font-semibold text-brand-primary underline">
                      {section.linkText}
                    </a>
                  </p>
                ) : null}

                {section.cards?.length ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {section.cards.map((card, idx) => {
                      const Icon = idx === 0 ? Seal : idx === 1 ? Repay : Pay;
                      return (
                        <div key={card.title} className="rounded-xl border-2 border-brand-stroke bg-brand-lightblue p-4">
                          <Icon className="mb-3 h-8 w-8 text-brand-primary" />
                          <h3 className="text-sm font-semibold text-brand-title">{card.title}</h3>
                          <p className="mt-2 text-xs text-brand-body">{card.body}</p>
                        </div>
                      )
                    })}
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          {page.noteTitle ? (
            <div className="mt-10 border-l-4 border-brand-accent1 bg-brand-offwhite px-5 py-4">
              <h2 className="text-xl font-bold tracking-[-0.03em] text-brand-title">{page.noteTitle}</h2>
              <p className="mt-2 max-w-3xl text-base text-brand-body">{page.noteBody}</p>
              {page.noteBullets?.length ? (
                <ul className="mt-3 space-y-2 text-base text-brand-body">
                  {page.noteBullets.map((bullet) => (
                    <li key={bullet}>✓ {bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>

        <aside className="hidden lg:block lg:pt-24">
          <div className="sticky top-24">
            <p className="text-sm text-brand-label">Last Updated: {page.updatedAt}</p>
            <div className="mt-10">
              <div className="mt-4 flex flex-col gap-4 text-sm text-brand-body">
                {tocLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`transition hover:text-brand-primary ${
                      activeSectionId === item.id ? 'text-brand-title font-medium' : 'text-brand-body'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default LegalPage
