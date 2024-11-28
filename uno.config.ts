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
