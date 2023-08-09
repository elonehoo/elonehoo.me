<script setup lang="ts">
import defaultVue from './default.vue'

const gallery = useContent().navigation.value?.filter((i: any) => i._path.startsWith('/gallery'))[0].gallery

useHead({
  meta: [
    { property: 'og:title', content: 'Elone Hoo' },
    { property: 'og:image', content: '/og.png' },
    { property: 'og:description', content: 'Elone Hoo\'s Gallery' },
    { name: 'description', content: 'Elone Hoo\'s Gallery' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: '@elonehoo' },
    { name: 'twitter:title', content: 'Gallery' },
    { name: 'twitter:description', content: 'Elone Hoo\'s Gallery' },
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
    <main class="p-2 flex flex-col relative min-h-screen overflow-hidden mx-auto my-0 box-border">
      <div class="grid grid-cols-[repeat(auto-fit,minmax(440px,1fr))] gap-2 box-border">
        <div v-for="photo in gallery" :key="photo.url" class="inline-block relative h-[700px] [outline:0px]" style="content: none;">
          <img
            class="absolute h-full w-full text-transparent inset-0 select-none object-cover"
            :src="`/gallery${photo.url}`"
            alt=""
          >
        </div>
      </div>
    </main>
  </defaultVue>
</template>
