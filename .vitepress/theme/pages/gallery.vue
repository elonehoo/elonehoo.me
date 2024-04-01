<script setup lang="ts">
const { frontmatter } = useData()
</script>

<template>
  <div aria-label="document-driven-page">
    <div class="m-auto mb-8 slide-enter-50">
      <h1 class="page-title text-center">
        Gallery
      </h1>
      <p class="text-center opacity-50 !-mt-6 italic">
        Record my life with photos.
      </p>
    </div>
    <main class="p-0 md:p-2 flex flex-col relative min-h-screen overflow-hidden mx-0 md:mx-auto my-0 box-border">
      <div class="grid grid-cols-[repeat(auto-fit,minmax(440px,1fr))] gap-2 box-border">
        <div v-for="photo, idx in frontmatter.gallery.reverse()" :key="photo.url" class="inline-block relative w-334px md:w-full md:h-350px h-200px [outline:0px] slide-enter" :style="`--enter-stage: ${idx};`" style="content: none;">
          <img
            class="absolute h-200px md:h-350px md:w-full w-334px text-transparent inset-0 select-none object-cover my-0! rounded-2xl"
            :src="`/gallery${photo.url}`"
            :alt="photo.url"
          >
        </div>
      </div>
    </main>
  </div>
</template>
