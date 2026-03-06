import antfu from '@antfu/eslint-config'

export default antfu({
  markdown: false,
  ignores: [
    'dist',
    'node_modules',
    '*.md',
  ],
})
