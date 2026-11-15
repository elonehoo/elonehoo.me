import type { LearnNode } from '../learn'
import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { findLearnNode, getLearnTutorials, learnHasContent, learnReadingOrder } from '../learn'
import { TimelineList } from './TimelineList'

export function TutorialCatalog() {
  const records = getLearnTutorials().flatMap(tutorial => tutorial.record ? [tutorial.record] : [])

  if (!records.length)
    return <p className="not-prose mt-10 text-gray-9">还没有教程。</p>

  return <TimelineList records={records} />
}

export function LearnBack() {
  return (
    <button className="learn-back" type="button" onClick={() => window.history.back()}>
      <ArrowLeft className="h-4 w-4" />
      cd ..
    </button>
  )
}

export function LearnSidebar({ pathname, onNavigate }: { pathname: string, onNavigate?: () => void }) {
  const found = findLearnNode(getLearnTutorials(), pathname)
  const [query, setQuery] = useState('')
  if (!found?.tutorial.children.length)
    return null

  const { tutorial } = found
  const numbers = new Map(learnReadingOrder(tutorial).map((page, index) => [page.path, index + 1]))
  const needle = query.trim().toLowerCase()
  const chapters = tutorial.children.filter(child => child.children.length > 0)
  const loose = tutorial.children.filter(child => child.children.length === 0 && learnHasContent(child))

  function matches(page: LearnNode, chapter?: LearnNode) {
    if (!needle)
      return true
    const haystack = `${chapter?.title ?? ''} ${page.title}`.toLowerCase()
    return haystack.includes(needle)
  }

  const visibleLoose = loose.filter(page => matches(page))
  const visibleChapters = chapters.flatMap(chapter => {
    const pages = chapter.children.filter(page => learnHasContent(page) && matches(page, chapter))
    return pages.length ? [{ chapter, pages }] : []
  })

  return (
    <>
      <div className="learn-toc-head">
        <LearnBack />
        <button className="learn-toc-close" type="button" onClick={onNavigate}>关闭</button>
      </div>
      <input
        className="learn-search"
        type="search"
        value={query}
        placeholder="搜索"
        aria-label="搜索课程"
        autoComplete="off"
        spellCheck={false}
        onChange={event => setQuery(event.target.value)}
      />
      <nav className="learn-toc-list" aria-label="目录">
        {visibleLoose.map(page => (
          <LessonLink key={page.path} page={page} pathname={pathname} number={numbers.get(page.path) ?? 0} onNavigate={onNavigate} />
        ))}
        {visibleChapters.map(({ chapter, pages }) => (
          <section key={chapter.path}>
            <h2>
              <span>{String(chapter.order).padStart(2, '0')}</span>
              {chapter.title}
            </h2>
            {pages.map(page => (
              <LessonLink key={page.path} page={page} pathname={pathname} number={numbers.get(page.path) ?? 0} onNavigate={onNavigate} />
            ))}
          </section>
        ))}
        {!visibleLoose.length && !visibleChapters.length && <p className="learn-toc-empty">没有匹配的课</p>}
      </nav>
    </>
  )
}

function LessonLink({ page, pathname, number, onNavigate }: { page: LearnNode, pathname: string, number: number, onNavigate?: () => void }) {
  return (
    <Link
      className="learn-choice"
      to={page.path as never}
      activeOptions={{ exact: true }}
      aria-current={page.path === pathname ? 'page' : undefined}
      onClick={onNavigate}
    >
      <span>{String(number).padStart(2, '0')}</span>
      {page.title}
    </Link>
  )
}
