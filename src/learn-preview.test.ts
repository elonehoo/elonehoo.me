import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { coreCode, extractShaders, filesBesideMarkdown, replaceCodeNumber, splitLessonPreview } from './learn-preview'

describe('splitLessonPreview', () => {
  it('moves preview fences to the example and leaves the explanation', () => {
    const source = [
      '先看这一颗。',
      '',
      '```tsx preview pages/index.tsx',
      'export default function Page() { return null }',
      '```',
      '',
      '```css preview styles.css',
      'body { margin: 0 }',
      '```',
      '',
      '普通代码还留在讲解里。',
      '',
      '```ts',
      'const answer = 1',
      '```',
    ].join('\n')

    const preview = splitLessonPreview(source)
    expect(preview.explanation).toContain('先看这一颗。')
    expect(preview.explanation).toContain('const answer = 1')
    expect(preview.explanation).not.toContain('export default')
    expect(preview.files).toEqual({
      'pages/index.tsx': 'export default function Page() { return null }',
      'styles.css': 'body { margin: 0 }',
    })
  })

  it('reads the vertex and fragment shaders as the core code', () => {
    const source = [
      'const material = new THREE.ShaderMaterial({',
      '  vertexShader: /* glsl */ `',
      '    void main() { gl_Position = vec4(position, 1.0); }',
      '  `,',
      '  fragmentShader: /* glsl */ `',
      '    void main() { gl_FragColor = vec4(1.0); }',
      '  `',
      '})',
    ].join('\n')

    const lesson = readFileSync('content/learn/0001.shader-learn/0001.basic/0001.a-planet/0000.index.md', 'utf8')
    expect(lesson).not.toContain('```')
    const scene = readFileSync('content/learn/0001.shader-learn/0001.basic/0001.a-planet/preview/scene.js', 'utf8')
    expect(scene).toContain("import * as THREE from 'three'")
    expect(scene).not.toContain('useEffect')
    const planet = filesBesideMarkdown('../content/learn/0001.shader-learn/0001.basic/0001.a-planet/0000.index.md')
    expect(planet.preview['scene.js']).toContain("import * as THREE from 'three'")
    expect(planet.code['scene.js']).toBe(planet.preview['scene.js'])
    expect(coreCode(planet.code)?.lang).toBe('javascript')

    expect(replaceCodeNumber('vec3(0.480, 0.830, 0.690)', 0, '1.0')).toBe('vec3(1.0, 0.830, 0.690)')
    expect(replaceCodeNumber('vec3(0.480, 0.830, 0.690)', 2, '0.0')).toBe('vec3(0.480, 0.830, 0.0)')

    const canvas = filesBesideMarkdown('../content/learn/0001.shader-learn/0001.basic/0002.canvas/0000.index.md')
    expect(canvas.code['fragment.glsl']).toContain('gl_FragColor')
    expect(canvas.preview['scene.js']).toContain('__FRAGMENT_SOURCE__')
    expect(canvas.code['scene.js']).toBeUndefined()

    expect(extractShaders(source)).toEqual({
      vertex: 'void main() { gl_Position = vec4(position, 1.0); }',
      fragment: 'void main() { gl_FragColor = vec4(1.0); }',
    })
  })
})
