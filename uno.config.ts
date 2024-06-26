import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  rules: [
    [/^slide-enter-(\d+)$/, ([_, n]) => ({
      '--enter-stage': n,
    })],
  ],
  theme: {
    maxWidth: {
      main: '750px',
    },
    height: {
      header: '64px',
      footer: '50px',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,600,800',
        mono: 'DM Mono:400,600',
      },
    }),
    presetIcons({
      warn: true,
      extraProperties: {
        'width': '1.23rem',
        'height': '1.23rem',
        'display': 'inline-block',
        'vertical-align': 'text-bottom',
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  blocklist: ['me'],
  safelist: [
    'i-ri-sun-line',
    'i-ri-moon-line',
    'i-ri-github-line',
    'i-ri-discord-line',
    'i-ri-facebook-line',
    'i-ri-instagram-line',
    'i-ri-linkedin-line',
    'i-ri-mastodon-line',
    'i-ri-slack-line',
    'i-ri-twitter-line',
    'i-ri-youtube-line',
    'i-ri-zhihu-line',
    'i-ri-bilibili-line',
    'i-ri-bookmark-line',
    'i-ri-group-line',
    'i-ri-sticky-note-line',
    'i-ri-twitter-x-line',
    'i-ri-article-line',
    'i-ri-lightbulb-line',
    'i-ri-screenshot-line',
    'i-ri-gallery-line',
    'i-la-rss-square',
  ],
})
