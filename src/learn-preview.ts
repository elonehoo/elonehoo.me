const lessonAssets = import.meta.glob('../content/**/*.{js,c,glsl,css}', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

export function filesBesideMarkdown(markdownFile: string) {
  const directory = /\/(?:\d+\.)?index\.md$/.test(markdownFile)
    ? markdownFile.replace(/[^/]+$/, '')
    : markdownFile.replace(/\.md$/, '/')
  const files: Record<string, string> = {}
  const compare: { c?: string, glsl?: string } = {}

  for (const [path, source] of Object.entries(lessonAssets)) {
    if (!path.startsWith(directory))
      continue
    const name = path.slice(directory.length)
    if (name.includes('/'))
      continue
    if (name === 'cpu.c')
      compare.c = source.trim()
    else if (name === 'shader.glsl')
      compare.glsl = source.trim()
    else
      files[name] = source.replace(/\n$/, '')
  }

  return { compare, files }
}

export function splitLessonPreview(source: string) {
  const files: Record<string, string> = {}
  const compare: { c?: string, glsl?: string } = {}
  const fencePattern = /^```([^\n]*)\n([\s\S]*?)^```/gm

  const explanation = source.replace(fencePattern, (fence, info: string, body: string) => {
    const tokens = info.trim().split(/\s+/).filter(Boolean)
    if (tokens.includes('compare')) {
      const lang = tokens.find(token => token !== 'compare')
      if (lang === 'c')
        compare.c = body.trim()
      if (lang === 'glsl')
        compare.glsl = body.trim()
      return ''
    }

    if (!tokens.includes('preview'))
      return fence

    const file = tokens.find(token => token.includes('/') || token.includes('.'))
    const lang = tokens.find(token => token !== 'preview' && !token.includes('/') && !token.includes('.')) || 'tsx'
    const path = file || (lang === 'css' ? 'styles.css' : 'pages/index.tsx')
    files[path] = body.replace(/\n$/, '')
    return ''
  })

  return {
    compare: compare.c || compare.glsl ? compare : undefined,
    explanation: explanation.replace(/\n{3,}/g, '\n\n').trim(),
    files: Object.keys(files).length ? files : undefined,
  }
}

export function previewRuntimeFiles(files: Record<string, string>) {
  if (files['pages/index.tsx'] || files['pages/index.jsx'])
    return files

  const script = Object.keys(files).find(name => name.endsWith('.js'))
  if (!script)
    return files

  return {
    ...files,
    'pages/index.tsx': `import { useEffect, useRef } from 'react'

export default function Page() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const frame = requestAnimationFrame(() => {
      import('../${script}')
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <style>{\`html, body, #__jar, #__reactRoot { height: 100%; margin: 0; background: #101b23; } canvas { display: block; width: 100%; height: 100%; }\`}</style>
      <canvas ref={ref} />
    </>
  )
}
`,
  }
}

export function coreCode(files: Record<string, string>) {
  const entry = Object.entries(files).find(([name]) => !name.startsWith('pages/') && !name.endsWith('.css'))
  if (!entry)
    return
  const [name, code] = entry
  const lang = name.endsWith('.css')
    ? 'css'
    : name.endsWith('.tsx') || name.endsWith('.jsx')
      ? 'tsx'
      : 'javascript'
  return { code, lang }
}

export function extractShaders(source: string) {
  const vertex = shaderTemplate(source, 'vertexShader')
  const fragment = shaderTemplate(source, 'fragmentShader')
  if (!vertex || !fragment)
    return
  return { fragment, vertex }
}

function shaderTemplate(source: string, key: string) {
  const marker = source.indexOf(`${key}:`)
  if (marker < 0)
    return
  const open = source.indexOf('`', marker)
  const close = open < 0 ? -1 : source.indexOf('`', open + 1)
  if (open < 0 || close < 0)
    return
  return source.slice(open + 1, close).trim()
}

export function lessonDependencies(meta: Record<string, unknown> | undefined) {
  const value = meta?.dependencies
  if (!value || typeof value !== 'object' || Array.isArray(value))
    return undefined

  const entries = Object.entries(value).flatMap(([key, item]) => {
    if (typeof item === 'string' || typeof item === 'number')
      return [[key, String(item)] as const]
    return []
  })

  return entries.length ? Object.fromEntries(entries) : undefined
}
