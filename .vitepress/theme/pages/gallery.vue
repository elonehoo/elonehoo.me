<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { data as gallery } from '~/theme/utils/gallery.data'

const breakpoints = useBreakpoints(breakpointsTailwind)

const cols = computed(() => {
  if (breakpoints.xl.value)
    return 3
  if (breakpoints.lg.value)
    return 2
  return 1
})

const parts = computed(() => {
  const result = Array.from({ length: cols.value }, () => [] as typeof gallery)
  gallery.forEach((item, i) => {
    result[i % cols.value].push(item)
  })
  return result
})
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
    <div grid="~ cols-1 lg:cols-2 xl:cols-3 gap-4">
      <div v-for="items, idx of parts" :key="idx" flex="~ col gap-4">
        <div
          v-for="item in items"
          :key="item.img"
          class="slide-enter"
          :style="{
            '--enter-stage': idx + 1,
          }"
        >
          <img
            :src="`/gallery/${item.img}`"
            border="~ #8884 rounded-lg"
            block of-hidden
            class="group"
            hover="scale-101 shadow-xl z-10"
            transition-all
            duration-500
            bg-white dark:bg-black
            relative
          >
        </div>
      </div>
    </div>
  </div>
</template>
