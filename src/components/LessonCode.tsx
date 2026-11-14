import { highlighter } from '../lib/shiki-rehype'

export function CompareCode({ c, glsl }: { c: string, glsl: string }) {
  return (
    <div className="mt-3 grid gap-4 md:grid-cols-2">
      <section>
        <h3 className="mb-2 text-sm font-medium">C · CPU 逐个</h3>
        <LessonCode code={c} lang="c" />
      </section>
      <section>
        <h3 className="mb-2 text-sm font-medium">GLSL · GPU 同时</h3>
        <LessonCode code={glsl} lang="glsl" />
      </section>
    </div>
  )
}

export function LessonCode({ code, lang }: { code: string, lang: string }) {
  const html = highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  })

  return <div className="lesson-code prose-md mt-3" dangerouslySetInnerHTML={{ __html: html }} />
}
