import fs from 'node:fs/promises'
import sharp from 'sharp'
import type { HeadConfig, PageData, TransformContext } from 'vitepress'

const ogSVGPromise = fs.readFile('./public/og-template.svg', 'utf-8')

export async function transformHead({ pageData }: TransformContext) {
  const head: HeadConfig[] = []
  if (pageData.relativePath === 'index.md') {
    head.push(
      ['meta', { property: 'twitter:title', content: 'Elone Hoo' }],
      ['meta', { property: 'twitter:description', content: 'i hope every sunny afternoon can be wasted.' }],
      ['meta', { property: 'og:image', content: 'https://elonehoo.me/og.png' }],
      ['meta', { property: 'twitter:image', content: 'https://elonehoo.me/og.png' }],
    )
    return head
  }
  const name = getFileName(pageData.filePath)
  await generateSVG(pageData, `dist/og-${name}.png`)
  head.push(
    ['meta', { property: 'twitter:title', content: `${pageData.title}` }],
    ['meta', { property: 'twitter:description', content: `${pageData.description || pageData.title}` }],
    ['meta', { property: 'og:image', content: `https://elonehoo.me/og-${name}.png` }],
    ['meta', { property: 'twitter:image', content: `https://elonehoo.me/og-${name}.png` }],
  )
  return head
}

function getFileName(path: string) {
  const match = path.match(/\/([^/]+)\.md$/)
  return match ? match[1] : null
}

async function generateSVG(pageData: PageData, output: string) {
  const data = {
    line1: pageData.title || '',
    line2: pageData.description || '',
  }
  const ogSVg = await ogSVGPromise
  const svg = ogSVg.replace(/\{\{([^}]+)}}/g, (_, name: keyof typeof data) => data[name])

  // eslint-disable-next-line no-console
  console.log(`Generating ${output}`)
  try {
    // eslint-disable-next-line node/prefer-global/buffer
    await sharp(Buffer.from(svg))
      .resize(1200 * 1.1, 630 * 1.1)
      .png()
      .toFile(output)
  }
  catch (e) {
    console.error('Error generating', { filename: output, ...data, svg })
    console.error(e)
  }
}
