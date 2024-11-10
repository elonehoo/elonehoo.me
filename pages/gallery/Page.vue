<script setup lang="ts">
import { data } from '@/gallerys.data'
import { breakpointsTailwind } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const cols = computed(() => {
  if (breakpoints.xl.value)
    return 3
  if (breakpoints.lg.value)
    return 2
  return 1
})

const galleryList = computed(() => {
  const gallerys: { url: string }[] = []
  data.forEach((item) => {
    gallerys.push(...item.images)
  })
  const result = Array.from({ length: cols.value }, () => [] as any)
  gallerys.forEach((item, i) => {
    result[i % cols.value].push(item)
  })
  return result
})
</script>

<template>
  <LayoutDefault>
    <template #title>
      照片存档
    </template>

    <div class="wrapper flex flex-wrap flex-row pt-[calc(var(--h-margin)_*_2)] mb-4em">
      <div grid="~ cols-1 lg:cols-2 xl:cols-3 gap-4">
        <div v-for="items, idx of galleryList" :key="idx" flex="~ col gap-4">
          <div
            v-for="item in items"
            :key="item.img"
          >
            <img
              :src="`/gallery/${item.url}`"
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
  </LayoutDefault>
</template>
