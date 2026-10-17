import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'

const vercel = process.env.VERCEL === '1' || process.env.NITRO_PRESET?.startsWith('vercel')
const output = vercel ? '.vercel/output/static' : '.output/public'
const missing = []
let references = 0
let styles = ''

function scan(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      scan(path)
      continue
    }
    if (entry.name.endsWith('.html')) {
      for (const match of readFileSync(path, 'utf8').matchAll(/(?:href|src)="(\/assets\/[^"]+)"/g)) {
        references++
        if (!existsSync(join(output, match[1].split(/[?#]/)[0])))
          missing.push(`${path}: ${match[1]}`)
      }
    }
    if (entry.name.endsWith('.css')) {
      const css = readFileSync(path, 'utf8')
      styles += css
      for (const match of css.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g)) {
        const asset = match[1]
        if (/^(?:data:|https?:|\/\/|#)/.test(asset))
          continue
        const file = asset.startsWith('/') ? join(output, asset) : join(dirname(path), asset)
        references++
        if (!existsSync(file.split(/[?#]/)[0]))
          missing.push(`${path}: ${asset}`)
      }
    }
  }
}

scan(output)
assert.deepEqual(missing, [], 'Built pages or styles reference missing files')
assert.ok(!styles.includes('#--unocss--'), 'UnoCSS placeholders were not generated')
assert.ok(styles.includes('.flex') && styles.includes('.text-gray-9'), 'Core utility styles are missing')
console.log(`Validated ${references} built asset references and generated utility styles.`)
