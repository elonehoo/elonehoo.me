import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetAnimations } from 'unocss-preset-animations'
import { presetRadix, radixColors } from 'unocss-preset-radix'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetAnimations(),
    presetRadix({
      palette: radixColors,
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
