<script setup lang="ts">
import defaultVue from './default.vue'

useHead({
  meta: [
    { property: 'og:title', content: 'Elone Hoo' },
    { property: 'og:image', content: '/og.png' },
    { property: 'og:description', content: 'Elone Hoo\'s Blog' },
    { name: 'description', content: 'Elone Hoo\'s Blog' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: '@elonehoo' },
    { name: 'twitter:title', content: 'Blog' },
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
</script>

<template>
  <defaultVue>
    <ListMenu show-year name="talk" />
  </defaultVue>
</template>
