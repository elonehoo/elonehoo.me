import { useEffect, useState } from 'react'

interface Heading {
  id: string
  level: number
  text: string
}

export function TableOfContents({ pathname }: { pathname: string }) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>('.page-content .prose-md h2[id], .page-content .prose-md h3[id]')]
    setHeadings(elements.map(element => ({
      id: element.id,
      level: Number(element.tagName.slice(1)),
      text: element.textContent?.replace(/^#+\s*/, '') || element.id,
    })))

    if (!elements.length)
      return

    setActiveId(decodeURIComponent(window.location.hash.replace(/^#/, '')))
    const observer = new IntersectionObserver((entries) => {
      const current = entries
        .filter(entry => entry.isIntersecting)
        .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0]

      if (current)
        setActiveId(current.target.id)
    }, {
      rootMargin: '0px 0px -70% 0px',
      threshold: [0, 1],
    })

    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [pathname])

  if (!headings.length)
    return null

  return (
    <nav className="op-0 lg:fixed lg:right-12 lg:top-12 lg:op-100" aria-label="文章目录">
      <span className="text-gray-11">Toc</span>
      <ul className="m-0 list-none p-0">
        {headings.map(heading => (
          <li key={heading.id} className={heading.level === 3 ? 'pr-3' : ''}>
            <a
              className="toc-link text-gray-9 hover:text-gray-12"
              data-active={activeId === heading.id}
              href={`#${heading.id}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
