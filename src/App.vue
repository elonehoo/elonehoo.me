<script setup lang="ts">
useHead({
  meta: [
    { property: 'og:title', content: 'Elone Hoo' },
    { property: 'og:image', content: 'https://elonehoo.me/og-icon.png' },
    { name: 'description', content: 'Elone Hoo\'s Portfolio' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: '@elonehoo' },
  ],
})
</script>

<template>
  <NavBar />
  <main class="px-7 py-10">
    <router-view />
    <Footer />
  </main>
</template>
