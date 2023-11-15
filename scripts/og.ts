import path, { dirname } from 'node:path'
import { Buffer } from 'node:buffer'
import fs from 'fs-extra'
import sharp from 'sharp'

interface MDFiles {
  path: string
  name: string
  content: {
    title?: string
    navigationDescription?: string
    navigationTitle?: string
    navigationImage?: string
  }
}

const promises: Promise<any>[] = []

function getMarkdownFiles(dirPath: string): MDFiles[] {
  let mdFiles: MDFiles[] = []
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    const res = path.resolve(dirPath, entry.name)
    if (entry.isDirectory()) {
      mdFiles = mdFiles.concat(getMarkdownFiles(res))
    }
    else if (entry.isFile() && path.extname(res) === '.md') {
      const fullContent = fs.readFileSync(res, 'utf-8')
      const match = fullContent.match(/---\n([\s\S]*?)\n---/)
      const content = match ? match[1] : ''
      const titleMatch = content.match(/title: (.*)/)
      const navigationDescriptionMatch = content.match(/navigation.description: (.*)/)
      const navigationTitleMatch = content.match(/navigation.title: (.*)/)
      const navigationImageMatch = content.match(/navigation.image: (.*)/)

      const title = titleMatch ? titleMatch[1] : undefined
      const navigationDescription = navigationDescriptionMatch ? navigationDescriptionMatch[1] : undefined
      const navigationTitle = navigationTitleMatch ? navigationTitleMatch[1] : undefined
      const navigationImage = navigationImageMatch ? navigationImageMatch[1] : undefined
      mdFiles.push({
        path: res,
        name: path.basename(res, '.md'),
        content: {
          title,
          navigationDescription,
          navigationTitle,
          navigationImage,
        },
      })
      if (match && !navigationImage && path.basename(res, '.md') !== 'index') {
        const newText = `navigation.image: https://elonehoo.me/og/${path.basename(res, '.md')}.png\n`
        const newContent = fullContent.replace(/---\n([\s\S]*?)\n---/, `---\n${newText}${content}\n---`)
        fs.writeFileSync(res, newContent, 'utf-8')
      }
    }
  }

  return mdFiles
}

const mdFiles: MDFiles[] = getMarkdownFiles('./content') // 将 './content' 替换为你的目录路径
generate(mdFiles)

function generate(mdFiles: MDFiles[]) {
  mdFiles.forEach((md) => {
    if (md.name === 'index')
      return

    const path = `${md.name}.png`
    promises.push(
      fs.existsSync(`${md.name}.png`)
        ? fs.copy(`${md.name}.png`, `public/og/${path}`)
        : generateOg((md.content.navigationTitle || md.content.title)!.replace(/\s-\s.*$/, '').trim(), `public/og/${path}`),
    )
  })
}

const ogSVg = fs.readFileSync('./public/og-template.svg', 'utf-8')

async function generateOg(title: string, output: string) {
  if (fs.existsSync(output))
    return

  await fs.mkdir(dirname(output), { recursive: true })
  // breakline every 25 chars
  const lines = title.trim().split(/(.{0,25})(?:\s|$)/g).filter(Boolean)

  const data: Record<string, string> = {
    line1: lines[0],
    line2: lines[1],
    line3: lines[2],
  }
  const svg = ogSVg.replace(/\{\{([^}]+)}}/g, (_, name) => {
    return data[name] || ''
  })

  console.log(`Generating ${output}`)
  try {
    await sharp(Buffer.from(svg))
      .resize(1200 * 1.1, 630 * 1.1)
      .png()
      .toFile(output)
  }
  catch (e) {
    console.error('Failed to generate og image', e)
  }
}
