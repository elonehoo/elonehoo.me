<script setup lang="ts">
import defaultVue from './default.vue'
import { formatDate } from '~/composables'

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

useHead({
  meta: [
    { property: 'og:title', content: 'Elone Hoo' },
    { property: 'og:image', content: '/og.png' },
    { property: 'og:description', content: 'Elone Hoo\'s Notes' },
    { name: 'description', content: 'Elone Hoo\'s Notes' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: '@elonehoo' },
    { name: 'twitter:title', content: 'Notes' },
    { name: 'twitter:description', content: 'Elone Hoo\'s Blog' },
    { name: 'twitter:image', content: '/og.png' },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/logo-dark.svg',
    },
  ],
})

const routers = navigation.value
  ?.filter(i => i._path.startsWith('/notes'))[0]
  .children
  ?.sort((a, b) => +new Date(b.date) - +new Date(a.date))
  .filter(i => !i._path.endsWith('.html'))
  .map(i => ({
    path: i._path,
    title: i.title,
    date: i.date,
    lang: i.lang,
    duration: i.duration,
    recording: i.recording,
    upcoming: i.upcoming,
  }))

// const posts = computed(() => routers.filter(i => !englishOnly.value || i.lang !== 'zh'))
const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isSameYear = (a: Date | string | number, b: Date | string | number) => a && b && getYear(a) === getYear(b)
</script>

<template>
  <defaultVue>
    <ListMenu show-year name="notes" />
  </defaultVue>
</template>
