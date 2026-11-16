import type { ComponentType, ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { filesBesideMarkdown, lessonDependencies, previewRuntimeFiles } from '../learn-preview'
import { LessonCode } from './LessonCode'
import { LessonDevPreview } from './LessonDevPreview'
import { useLearnLesson } from './learn-lesson'

const lessonComponents = import.meta.glob('../../content/learn/**/*.tsx', {
  eager: true,
  import: 'default',
}) as Record<string, ComponentType<{ file: string }>>

const LessonFileContext = createContext<{ dependencies?: Record<string, string>, file: string }>({ file: '' })

export function LessonFileProvider({ children, file, meta }: {
  children: ReactNode
  file: string
  meta?: Record<string, unknown>
}) {
  const dependencies = lessonDependencies(meta)
  return <LessonFileContext.Provider value={{ dependencies, file }}>{children}</LessonFileContext.Provider>
}

export function useLessonFile() {
  return useContext(LessonFileContext).file
}

export function lessonFileComponent(markdownFile: string, name: string) {
  const directory = markdownFile.replace(/^\.\.\//, '../../').replace(/[^/]+$/, '')
  return lessonComponents[`${directory}${name}.tsx`] ?? builtinLessonComponents[name]
}

function DevPreview() {
  const { dependencies, file } = useContext(LessonFileContext)
  const files = useMemo(() => {
    if (!file)
      return
    const disk = filesBesideMarkdown(file)
    return previewRuntimeFiles({ ...disk.code, ...disk.preview })
  }, [file])
  if (!files)
    return null
  return <LessonDevPreview dependencies={dependencies} files={files} />
}

function FileCode({ file, lang }: { file?: string, lang?: string }) {
  const markdownFile = useLessonFile()
  const lesson = useLearnLesson()
  const source = file && markdownFile ? filesBesideMarkdown(markdownFile).code[file] || '' : ''
  const code = lesson?.code || source
  return (
    <LessonCode
      code={code}
      lang={lang || 'javascript'}
      onChange={lang === 'glsl' ? lesson?.setCode : undefined}
    />
  )
}

const builtinLessonComponents: Record<string, ComponentType<{ file?: string, lang?: string }>> = {
  'dev-preview': DevPreview,
  'lesson-code': FileCode,
}
