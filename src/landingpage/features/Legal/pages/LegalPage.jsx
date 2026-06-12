import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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

const emailPattern = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi
const isEmail = (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
const linkPattern = /\[([^\]]+)\]\(((?:\/|https?:\/\/)[^)]+)\)/g
const boldPattern = /\*\*([^*]+)\*\*/g

const renderTextWithEmails = (text, keyPrefix) => {
  const parts = text.split(emailPattern)

  return parts.map((part, index) => {
    if (isEmail(part)) {
      return (
        <a
          key={`${keyPrefix}-${part}-${index}`}
          href={`mailto:${part}`}
          className="break-words font-medium text-brand-primary underline underline-offset-4"
        >
          {part}
        </a>
      )
    }

    return (
      <span key={`${keyPrefix}-${part}-${index}`} className="break-words">
        {part}
      </span>
    )
  })
}

const renderTextWithFormatting = (text, keyPrefix) => {
  const parts = []
  let lastIndex = 0
  let match

  boldPattern.lastIndex = 0
  while ((match = boldPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) })
    }

    parts.push({ type: 'bold', value: match[1] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) })
  }

  return parts.map((part, index) => {
    if (part.type === 'bold') {
      return (
        <strong key={`${keyPrefix}-bold-${index}`} className="font-semibold text-brand-title">
          {part.value}
        </strong>
      )
    }

    return renderTextWithEmails(part.value, `${keyPrefix}-${index}`)
  })
}

const renderInlineText = (text) => {
  if (!text || typeof text !== 'string') return text

  const segments = []
  let lastIndex = 0
  let match

  linkPattern.lastIndex = 0
  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', value: text.slice(lastIndex, match.index) })
    }

    segments.push({ type: 'link', label: match[1], href: match[2] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', value: text.slice(lastIndex) })
  }

  return segments.map((segment, index) => {
    if (segment.type === 'link') {
      if (/^https?:\/\//i.test(segment.href)) {
        return (
          <a
            key={`link-${index}`}
            href={segment.href}
            target="_blank"
            rel="noopener noreferrer"
            className="break-words font-medium text-brand-primary hover:underline"
          >
            {segment.label}
          </a>
        )
      }

      return (
        <Link
          key={`link-${index}`}
          to={segment.href}
          className="break-words font-medium text-brand-primary hover:underline"
        >
          {segment.label}
        </Link>
      )
    }

    return renderTextWithFormatting(segment.value, `text-${index}`)
  })
}

const renderParagraphText = (text) => {
  const isSubSection = /^\d+\.\d+/.test(text) || /^[a-z]\./i.test(text)
  const isImportantNotice = text === 'THIS SECTION IS IMPORTANT. PLEASE READ IT CAREFULLY.'
  const isImportantLegal = text === 'PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.'
  const isPrivacyRequest = text === 'How to Submit a Privacy Rights Request'
  const isPrivacyVerify = text === 'Verification of Identity'
  const isVulnerabilityProhibited = text === 'The following voids the safe harbor in Section 3:'


  return (
    <span className={isSubSection || isImportantNotice || isImportantLegal || isPrivacyRequest || isPrivacyVerify || isVulnerabilityProhibited ? 'break-words font-semibold text-lg text-brand-title' : 'break-words'}>
      {renderInlineText(text)}
    </span>
  )
}

const renderTable = (table, key) => {
  const headers = table.headers || []
  const rows = table.rows || []

  return (
    <div key={key} className="mt-6 overflow-hidden rounded-2xl border border-brand-stroke/25 bg-brand-white">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[800px] lg:min-w-full table-auto border-collapse text-sm">
          {headers.length ? (
            <thead className="bg-brand-offwhite">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="border-b border-brand-stroke/20 px-4 py-3 text-left font-semibold text-brand-title break-words"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={`${key}-row-${rowIndex}`}
                className={`align-top ${rowIndex % 2 === 0 ? 'bg-brand-white' : 'bg-brand-offwhite/60'}`}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${key}-cell-${rowIndex}-${cellIndex}`}
                    className="border-t border-brand-stroke/10 px-4 py-3 break-words text-brand-body [overflow-wrap:anywhere]"
                  >
                    {Array.isArray(cell) ? (
                      <ul className="list-disc space-y-1 pl-4">
                        {cell.map((item, itemIndex) => (
                          <li key={`${key}-cell-${rowIndex}-${cellIndex}-${itemIndex}`} className="break-words [overflow-wrap:anywhere]">
                            {renderInlineText(item)}
                          </li>
                        ))}
                      </ul>
                    ) : cell && typeof cell === 'object' && Array.isArray(cell.lines) ? (
                      <div className="space-y-1">
                        {cell.lines.map((item, itemIndex) => (
                          <p key={`${key}-cell-${rowIndex}-${cellIndex}-${itemIndex}`} className="whitespace-nowrap">
                            {renderInlineText(item)}
                          </p>
                        ))}
                      </div>
                    ) : (
                      renderInlineText(cell)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const LegalPage = ({ page }) => {
  const { hash } = useLocation()
  const [activeSectionId, setActiveSectionId] = useState(
    page.sections[0] ? resolveSectionId(page.sections[0]) : '',
  )

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [hash])

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
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-brand-accent2">{page.eyebrow}</span>
            <Star className="h-3 w-3 text-brand-accent2" />
          </div>

          <h1 className="mt-6 max-w-4xl break-words text-3xl font-bold tracking-[-0.04em] text-brand-title sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-2xl break-words text-lg text-brand-body [overflow-wrap:anywhere]">{page.intro}</p>

          {page.calloutTitle ? (
            <div className="mt-8 border-l-4 border-brand-accent1 bg-brand-offwhite px-5 py-4">
              <h2 className="text-xl font-bold tracking-[-0.03em] text-brand-title">{page.calloutTitle}</h2>
              <p className="mt-2 max-w-3xl break-words text-base text-brand-body [overflow-wrap:anywhere]">
                {page.calloutBody}
              </p>
            </div>
          ) : null}

          <div className="mt-10 space-y-10">
            {page.sections.map((section) => (
              <article
                key={section.title}
                id={resolveSectionId(section)}
                className="scroll-mt-28"
              >
                <h2 className="text-xl sm:text-3xl break-words font-bold tracking-[-0.03em] text-brand-title">{section.title}</h2>

                <div className="mt-4 space-y-4 break-words text-base text-brand-body [overflow-wrap:anywhere]">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="break-words [overflow-wrap:anywhere]">
                      {renderParagraphText(paragraph)}
                    </p>
                  ))}
                </div>

                {section.bullets?.length ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-brand-body">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="break-words [overflow-wrap:anywhere]">
                        {renderInlineText(bullet)}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.extraBlocks?.length ? (
                  <div className="mt-8 space-y-6">
                    {section.extraBlocks.map((block, blockIndex) => (
                      <div key={`${section.title}-extra-${blockIndex}`}>
                        {block.paragraphs?.length ? (
                          <div className="space-y-4 break-words text-base text-brand-body [overflow-wrap:anywhere]">
                            {block.paragraphs.map((paragraph) => (
                              <p key={paragraph} className="break-words [overflow-wrap:anywhere]">
                                {renderParagraphText(paragraph)}
                              </p>
                            ))}
                          </div>
                        ) : null}

                        {block.bullets?.length ? (
                          <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-brand-body">
                            {block.bullets.map((bullet) => (
                              <li key={bullet} className="break-words [overflow-wrap:anywhere]">
                                {renderInlineText(bullet)}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}

                {section.subParagraphs?.length ? (
                  <div className="mt-4 space-y-4 break-words text-base text-brand-body [overflow-wrap:anywhere]">
                    {section.subParagraphs.map((paragraph) => (
                      <p key={paragraph} className="break-words [overflow-wrap:anywhere]">
                        {renderParagraphText(paragraph)}
                      </p>
                    ))}
                  </div>
                ) : null}

                {section.subBullets?.length ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-brand-body">
                    {section.subBullets.map((bullet) => (
                      <li key={bullet} className="break-words [overflow-wrap:anywhere]">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.paragraphsAfter?.length ? (
                  <div className="mt-4 space-y-4 break-words text-base text-brand-body [overflow-wrap:anywhere]">
                    {section.paragraphsAfter.map((paragraph) => (
                      <p key={paragraph} className="break-words [overflow-wrap:anywhere]">
                        {renderParagraphText(paragraph)}
                      </p>
                    ))}
                  </div>
                ) : null}

                {section.tables?.length ? (
                  <div className="space-y-4">
                    {section.tables.map((table, tableIndex) => renderTable(table, `${section.title}-table-${tableIndex}`))}
                  </div>
                ) : null}

                {section.subsections?.length ? (
                  <div className="mt-6 space-y-8">
                    {section.subsections.map((subsection) => (
                      <div key={subsection.title} className="space-y-4">
                        <h3 className="text-lg font-semibold tracking-[-0.03em] text-brand-title">
                          {subsection.title}
                        </h3>

                        {subsection.paragraphs?.length ? (
                          <div className="space-y-4 break-words text-base text-brand-body [overflow-wrap:anywhere]">
                            {subsection.paragraphs.map((paragraph) => (
                              <p key={paragraph} className="break-words [overflow-wrap:anywhere]">
                                {renderParagraphText(paragraph)}
                              </p>
                            ))}
                          </div>
                        ) : null}

                        {subsection.bullets?.length ? (
                          <ul className="list-disc space-y-2 pl-5 text-base text-brand-body">
                            {subsection.bullets.map((bullet) => (
                              <li key={bullet} className="break-words [overflow-wrap:anywhere]">
                                {renderInlineText(bullet)}
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        {subsection.paragraphsAfter?.length ? (
                          <div className="space-y-4 break-words text-base text-brand-body [overflow-wrap:anywhere]">
                            {subsection.paragraphsAfter.map((paragraph) => (
                              <p key={paragraph} className="break-words [overflow-wrap:anywhere]">
                                {renderParagraphText(paragraph)}
                              </p>
                            ))}
                          </div>
                        ) : null}

                        {subsection.linkText ? (
                          <p className="text-base text-brand-body">
                            {subsection.linkPrefix ? renderInlineText(subsection.linkPrefix) : null}
                            <a
                              href={subsection.linkHref}
                              className="break-words font-semibold text-brand-primary underline"
                            >
                              {subsection.linkText}
                            </a>
                          </p>
                        ) : null}

                        {subsection.tables?.length ? (
                          <div className="space-y-4">
                            {subsection.tables.map((table, tableIndex) =>
                              renderTable(table, `${subsection.title}-table-${tableIndex}`),
                            )}
                          </div>
                        ) : null}
                      </div>
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
              <p className="mt-2 max-w-3xl break-words text-base text-brand-body [overflow-wrap:anywhere]">
                {page.noteBody}
              </p>
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
