const lessonAssets = import.meta.glob('../content/**/*.{js,c,glsl,css}', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

export function filesBesideMarkdown(markdownFile: string) {
  const directory = /\/(?:\d+\.)?index\.md$/.test(markdownFile)
    ? markdownFile.replace(/[^/]+$/, '')
    : markdownFile.replace(/\.md$/, '/')
  const code: Record<string, string> = {}
  const preview: Record<string, string> = {}
  const compare: { c?: string, glsl?: string } = {}

  for (const [path, source] of Object.entries(lessonAssets)) {
    if (!path.startsWith(directory))
      continue
    const name = path.slice(directory.length)
    const folder = name.startsWith('code/') ? 'code' : name.startsWith('preview/') ? 'preview' : ''
    const file = folder ? name.slice(folder.length + 1) : name
    if (!file || file.includes('/'))
      continue
    const text = source.replace(/\n$/, '')
    if (folder === 'preview') {
      preview[file] = text
      continue
    }
    if (file === 'cpu.c')
      compare.c = text.trim()
    else if (file === 'shader.glsl')
      compare.glsl = text.trim()
    else
      code[file] = text
  }

  return { code, compare, files: code, preview }
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
  const prepared = files['fragment.glsl'] && files['scene.js']?.includes('__FRAGMENT_SOURCE__')
    ? {
        ...files,
        'scene.js': files['scene.js'].replaceAll('__FRAGMENT_SOURCE__', JSON.stringify(files['fragment.glsl'])),
      }
    : files

  if (prepared['pages/index.tsx'] || prepared['pages/index.jsx'])
    return prepared

  const script = Object.keys(prepared).find(name => name.endsWith('.js'))
  if (!script)
    return prepared

  return {
    ...prepared,
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

const codeNumberPattern = /(?<![A-Za-z_])-?(?:\d+\.\d*|\.\d+|\d+)/g

export function replaceCodeNumber(source: string, index: number, next: string) {
  let current = 0
  return source.replace(codeNumberPattern, match => current++ === index ? next : match)
}

export function coreCode(files: Record<string, string>) {
  const names = Object.keys(files).filter(name => !name.startsWith('pages/') && !name.endsWith('.css'))
  const name = names.find(item => item.endsWith('.glsl') || item.endsWith('.frag')) ?? names[0]
  if (!name)
    return
  const code = files[name]
  const lang = name.endsWith('.glsl') || name.endsWith('.frag')
    ? 'glsl'
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
