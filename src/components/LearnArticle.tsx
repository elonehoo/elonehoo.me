import { Link } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { coreCode, filesBesideMarkdown, lessonDependencies, splitLessonPreview } from '../learn-preview'
import { findLearnNode, getLearnTutorials, learnAncestors, learnNeighbors, learnReadingOrder } from '../learn'
import { CompareCode, LessonCode } from './LessonCode'
import { LearnBack, LearnSidebar } from './LearnOutline'
import { LessonStage } from './LessonPreview'
import { MarkdownContent } from './MarkdownContent'

export function LearnArticle({ path }: { path: string }) {
  const found = findLearnNode(getLearnTutorials(), path)
  const node = found?.node
  const tutorial = found?.tutorial
  const preview = useMemo(() => {
    if (!node?.record)
      return
    const fromMarkdown = splitLessonPreview(node.record.source)
    const fromDisk = filesBesideMarkdown(node.record.file)
    const files = { ...fromDisk.files, ...fromMarkdown.files }
    const compare = { ...fromDisk.compare, ...fromMarkdown.compare }
    return {
      compare: compare.c || compare.glsl ? compare : undefined,
      explanation: fromMarkdown.explanation,
      files: Object.keys(files).length ? files : undefined,
    }
  }, [node])
  const [view, setView] = useState<'code' | 'explain'>('explain')
  const [tocOpen, setTocOpen] = useState(false)

  useEffect(() => {
    setView('explain')
    setTocOpen(false)
  }, [path])

  if (!node || !tutorial)
    return null

  const record = node.record && preview
    ? { ...node.record, source: preview.explanation }
    : node.record
  const lesson = preview?.files ? coreCode(preview.files) : undefined
  const compare = Boolean(preview?.compare?.c && preview.compare.glsl)
  const pages = learnReadingOrder(tutorial)
  const index = pages.findIndex(page => page.path === path)
  const { next, prev } = learnNeighbors(tutorial, path)
  const chapter = learnAncestors(tutorial, path).find(item => item !== tutorial && item.children.length > 0)

  return (
    <div className={tocOpen ? 'learn-frame is-toc-open' : 'learn-frame'}>
      <header className="learn-running-head">
        <LearnBack />
        <button type="button" aria-expanded={tocOpen} aria-controls="learn-toc" onClick={() => setTocOpen(true)}>
          {index >= 0 && <span className="learn-progress">{index + 1} / {pages.length}</span>}
          目录
        </button>
      </header>
      <button className="learn-scrim" type="button" aria-label="关闭目录" onClick={() => setTocOpen(false)} />
      <aside id="learn-toc" className="learn-toc" aria-label="目录">
        <LearnSidebar pathname={path} onNavigate={() => setTocOpen(false)} />
      </aside>
      <main className="learn-page">
        <header className="learn-heading">
          {chapter && <p className="learn-kicker">{chapter.title}</p>}
          <h1>{node.title}</h1>
          {node.description && <p className="learn-description">{node.description}</p>}
        </header>
        <div className="learn-workspace">
          {preview?.files && (
            <figure className="learn-figure" aria-label="实时画面">
              <div id="learn-stage" className="learn-stage" />
            </figure>
          )}
          <section className="learn-panel" aria-label="讲解">
            {(lesson || compare) && (
              <div className="learn-bar">
                <strong>{view === 'explain' ? '讲解' : compare ? '对照' : 'JavaScript'}</strong>
                <button
                  type="button"
                  aria-pressed={view === 'code'}
                  onClick={() => setView(view === 'explain' ? 'code' : 'explain')}
                >
                  {view === 'code' ? '核心代码' : '完整代码'}
                </button>
              </div>
            )}
            {view === 'code' && compare && preview?.compare?.c && preview.compare.glsl
              ? <CompareCode c={preview.compare.c} glsl={preview.compare.glsl} />
              : view === 'code' && lesson
                ? <LessonCode code={lesson.code} lang={lesson.lang} />
                : (
                    <div className="learn-notes">
                      {record && <MarkdownContent record={record} />}
                    </div>
                  )}
          </section>
        </div>
        {(prev || next) && (
          <nav className="learn-pager" aria-label="翻页">
            {prev
              ? (
                  <Link to={prev.path as never}>
                    <small>上一课</small>
                    <span>{prev.title}</span>
                  </Link>
                )
              : <span />}
            {next
              ? (
                  <Link className="learn-next" to={next.path as never}>
                    <small>下一课</small>
                    <span>{next.title}</span>
                  </Link>
                )
              : <span />}
          </nav>
        )}
      </main>
      {preview?.files && (
        <LessonStage
          dependencies={lessonDependencies(node.record?.meta)}
          files={preview.files}
        />
      )}
    </div>
  )
}
