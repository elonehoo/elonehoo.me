import fs from 'node:fs/promises'
import type { HeadConfig, TransformContext } from 'vitepress'

const ogSVGPromise = fs.readFile('./scripts/og-template.svg', 'utf-8')

export async function transformHead({ pageData }: TransformContext) {
  const head: HeadConfig[] = []
  if (pageData.relativePath === 'index.md') {
    head.push(
      ['meta', { property: 'og:image', content: 'https://elonehoo.me/og.png' }],
      ['meta', { property: 'twitter:image', content: 'https://elonehoo.me/og.png' }],
    )
    return head
  }
  return head
}
