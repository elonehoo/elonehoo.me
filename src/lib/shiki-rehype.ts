import rehypeShikiFromHighlighter from '@shikijs/rehype/core'
import { createHighlighter } from 'shiki'

/**
 * Preload highlighter so rehype stays sync (react-markdown uses runSync).
 * Dual theme: vitesse-light (inline) + vitesse-dark (css vars, switched by html.dark).
 */
const highlighter = await createHighlighter({
  themes: ['vitesse-light', 'vitesse-dark'],
  langs: [
    'typescript',
    'javascript',
    'tsx',
    'jsx',
    'vue',
    'html',
    'css',
    'json',
    'yaml',
    'bash',
    'shellscript',
    'plaintext',
    'markdown',
    'python',
    'go',
    'rust',
    'toml',
    'sql',
    'diff',
  ],
  langAlias: {
    ts: 'typescript',
    js: 'javascript',
    yml: 'yaml',
    sh: 'shellscript',
    shell: 'shellscript',
    md: 'markdown',
    text: 'plaintext',
    txt: 'plaintext',
  },
})

export function rehypeShikiVitesse() {
  return rehypeShikiFromHighlighter(highlighter, {
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    defaultLanguage: 'plaintext',
    fallbackLanguage: 'plaintext',
  })
}
