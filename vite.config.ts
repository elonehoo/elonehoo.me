import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import React from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import UnoCSS from 'unocss/vite'
import { defineConfig, type Plugin } from 'vite'

// Devjar copies its runtime into the preview iframe. Vite's import() rewrite
// injects __vite__injectQuery, which does not exist in that iframe.
function keepDevjarPreviewImports(): Plugin {
  return {
    name: 'keep-devjar-preview-imports',
    enforce: 'post',
    transform: {
      order: 'post',
      handler(code, id) {
        if (!id.includes('devjar') || !code.includes('__vite__injectQuery('))
          return
        return code.replace(/__vite__injectQuery\(([\s\S]*?), 'import'\)/g, '($1)')
      },
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || ''
        if (!url.includes('devjar') || url.includes('.wasm')) {
          next()
          return
        }

        const setHeader = res.setHeader.bind(res)
        res.setHeader = (name, value) => {
          if (String(name).toLowerCase() === 'cache-control')
            return setHeader(name, 'no-store')
          return setHeader(name, value)
        }

        const chunks: Buffer[] = []
        const originalEnd = res.end.bind(res)
        res.write = ((chunk: unknown, ..._args: unknown[]) => {
          if (chunk)
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)))
          return true
        }) as typeof res.write
        res.end = ((chunk: unknown, ..._args: unknown[]) => {
          if (chunk && typeof chunk !== 'function')
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)))
          const body = Buffer.concat(chunks).toString('utf8').replace(
            /__vite__injectQuery\(([\s\S]*?), 'import'\)/g,
            '($1)',
          )
          setHeader('Content-Length', Buffer.byteLength(body))
          return originalEnd(body)
        }) as typeof res.end
        next()
      })
    },
  }
}

export default defineConfig(({ mode }) => ({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    devtools(),
    UnoCSS(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // Default is os.cpus().length; on small CI builders concurrent SSR + Shiki OOMs the prerender server.
        concurrency: 2,
        retryCount: 2,
        retryDelay: 500,
        filter: ({ path }) => !path.startsWith('/api/'),
      },
    }),
    ...(mode === 'test' ? [] : [nitro()]),
    React(),
    keepDevjarPreviewImports(),
  ],
}))
