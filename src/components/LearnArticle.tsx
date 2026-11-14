import { Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { coreCode, filesBesideMarkdown, lessonDependencies, splitLessonPreview } from '../learn-preview'
import { findLearnNode, getLearnTutorials, learnNeighbors } from '../learn'
import { CompareCode, LessonCode } from './LessonCode'
import { LessonStage } from './LessonPreview'
import { MarkdownContent } from './MarkdownContent'

export function LearnArticle({ path }: { path: string }) {
  const found = findLearnNode(getLearnTutorials(), path)
  if (!found)
    return null

  const { node, tutorial } = found
  const { next, prev } = learnNeighbors(tutorial, path)
  const preview = useMemo(() => {
    if (!node.record)
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
  }, [node.record])
  const record = node.record && preview
    ? { ...node.record, source: preview.explanation }
    : node.record
  const lesson = preview?.files ? coreCode(preview.files) : undefined
  const [view, setView] = useState<'code' | 'explain'>('explain')

  return (
    <article>
      <h1 className="mt-4 flex items-center gap-x-1.5 pt-2 text-18px font-medium before:flex before:items-center before:justify-center before:text-action before:content-['#']">
        {node.title}
      </h1>
      {preview?.files && (
        <LessonStage
          dependencies={lessonDependencies(node.record?.meta)}
          files={preview.files}
        />
      )}
      {(lesson || preview?.compare) && (
        <div className="not-prose mt-6 flex items-baseline justify-between gap-3 border-b border-gray-12 pb-1.5 text-sm">
          <span className="font-medium">{view === 'explain' ? '讲解' : 'JavaScript'}</span>
          <button
            className="text-gray-9 hover:text-gray-12"
            type="button"
            aria-pressed={view === 'code'}
            onClick={() => setView(view === 'explain' ? 'code' : 'explain')}
          >
            {view === 'code' ? '讲解' : '核心代码'}
          </button>
        </div>
      )}
      {view === 'code' && preview?.compare?.c && preview.compare.glsl
        ? <CompareCode c={preview.compare.c} glsl={preview.compare.glsl} />
        : view === 'code' && lesson
          ? <LessonCode code={lesson.code} lang={lesson.lang} />
          : (
              <div className="prose-md mt-4">
                {record && <MarkdownContent record={record} />}
              </div>
            )}
      <div className="prose-md">
        <div className="not-prose">
          {(prev || next) && (
            <div className="mt-10 flex items-start justify-between gap-6 text-sm">
              {prev
                ? <Link className="text-gray-9 hover:text-gray-12" to={prev.path as never}>上一节 · {prev.title}</Link>
                : <span />}
              {next
                ? <Link className="text-right text-gray-9 hover:text-gray-12" to={next.path as never}>下一节 · {next.title}</Link>
                : <span />}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}


