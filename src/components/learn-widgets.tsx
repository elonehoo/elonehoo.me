import type { ComponentType, ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { filesBesideMarkdown } from '../learn-preview'
import { LessonCode } from './LessonCode'
import { LessonDevPreview } from './LessonDevPreview'
import { useLearnLesson } from './learn-lesson'

const lessonComponents = import.meta.glob('../../content/learn/**/*.tsx', {
  eager: true,
  import: 'default',
}) as Record<string, ComponentType<{ file: string }>>

const LessonFileContext = createContext('')

export function LessonFileProvider({ children, file }: {
  children: ReactNode
  file: string
}) {
  return <LessonFileContext.Provider value={file}>{children}</LessonFileContext.Provider>
}

export function useLessonFile() {
  return useContext(LessonFileContext)
}

export function lessonFileComponent(markdownFile: string, name: string) {
  const directory = markdownFile.replace(/^\.\.\//, '../../').replace(/[^/]+$/, '')
  return lessonComponents[`${directory}${name}.tsx`] ?? builtinLessonComponents[name]
}

function FileCode({ file, lang }: { file?: string, lang?: string }) {
  const markdownFile = useLessonFile()
  const lesson = useLearnLesson()
  const text = file && markdownFile ? filesBesideMarkdown(markdownFile).code[file] || '' : ''
  const code = lang === 'glsl' && lesson?.code ? lesson.code : text
  return (
    <LessonCode
      code={code}
      lang={lang || 'javascript'}
      onChange={lang === 'glsl' ? lesson?.setCode : undefined}
    />
  )
}

const builtinLessonComponents: Record<string, ComponentType<{ file?: string, lang?: string, path?: string }>> = {
  'dev-preview': LessonDevPreview,
  'lesson-code': FileCode,
}
