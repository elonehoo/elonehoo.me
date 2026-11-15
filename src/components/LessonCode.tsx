import { highlighter } from '../lib/shiki-rehype'

export function CompareCode({ c, glsl }: { c: string, glsl: string }) {
  return (
    <div className="learn-compare">
      <section>
        <h3>C · CPU 逐个</h3>
        <LessonCode code={c} lang="c" />
      </section>
      <section>
        <h3>GLSL · GPU 同时</h3>
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

  return <div className="lesson-code prose-md" dangerouslySetInnerHTML={{ __html: html }} />
}
