import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetAnimations } from 'unocss-preset-animations'
import { presetRadix } from './src/plugins/unocss'

export default defineConfig({
  rules: [
    ['bg-action', { 'background-color': 'rgb(179, 252, 3)' }],
    ['border-action', { 'border-color': 'rgb(179, 252, 3)' }],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetAnimations(),
    presetRadix({
      safelist: [
        'gray',
        'green',
      ],
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
