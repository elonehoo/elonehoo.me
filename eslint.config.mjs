import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    ignores: [
      '.github/skills/**',
      '**/*.md/**',
    ],
    typescript: true,
  }),
)
