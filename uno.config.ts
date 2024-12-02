import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetAnimations } from 'unocss-preset-animations'

function generateScale(name: string) {
  const scale = Array.from({ length: 12 }, (_, i) => {
    const id = i + 1
    return [
      [id, `var(--${name}-${id})`],
      [`a${id}`, `var(--${name}A-${id})`],
    ]
  }).flat()

  return Object.fromEntries(scale)
}

export default defineConfig({
  rules: [
    [/^scrollbar-hide$/, ([_]) => {
      return `.scrollbar-hide{scrollbar-width:none}
.scrollbar-hide::-webkit-scrollbar{display:none}`
    }],
    [/^scrollbar-default$/, ([_]) => {
      return `.scrollbar-default{scrollbar-width:auto}
.scrollbar-default::-webkit-scrollbar{display:block}`
    }],
  ],
  theme: {
    colors: {
      gray: generateScale('gray'),
      action: '#B3FC03',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetAnimations(),
    presetIcons(),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
