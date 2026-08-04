import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import React from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rolldownOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
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
    React(),
  ],
})
