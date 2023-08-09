<script setup lang="ts">
useHead({
  meta: [
    { property: 'og:title', content: 'Elone Hoo' },
    { property: 'og:image', content: '/og.png' },
    { property: 'og:description', content: 'Elone Hoo\'s Portfolio' },
    { property: 'og:url', content: 'https://elonehoo.me' },
    { name: 'description', content: 'Elone Hoo\'s Portfolio' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: '@elonehoo' },
    { name: 'twitter:title', content: 'Elone Hoo' },
    { name: 'twitter:description', content: 'Elone Hoo\'s Portfolio' },
    { name: 'twitter:image', content: '/og.png' },
    { name: 'title', content: 'Elone Hoo' },
    { name: 'lang', content: 'en' },
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
  <AppLayout>
    <NuxtPage />
  </AppLayout>
</template>

<style>
html {
  background-color: var(--c-bg);
}

html.dark {
  --c-bg: #050505;
  --c-scrollbar: #111;
  --c-scrollbar-hover: #222;
}

html {
  overflow: scroll;
}
</style>
