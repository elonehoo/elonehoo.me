// 将 demos 下的mp4文件复制到.vitepress/dist/demos目录下
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, extname, join, resolve } from 'pathe'

const docsDir = resolve(dirname(fileURLToPath(import.meta.url)), '../..')

function copyMP4Files() {
  const sourceDir = resolve(docsDir, 'demos')
  const targetDir = resolve(docsDir, '.vitepress/dist/demos')

  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error('Error reading source directory:', err)
      return
    }

    files.forEach((file) => {
      if (extname(file) === '.mp4') {
        const sourceFile = join(sourceDir, file)
        const targetFile = join(targetDir, file)

        fs.copyFile(sourceFile, targetFile, (err) => {
          if (err)
            console.error(`Error copying file ${file}:`, err)
        })
      }
    })
  })
}

copyMP4Files()
