<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { data as demos } from '~/theme/utils/demo.data'
import { formatDate } from '~/theme/utils'

const breakpoints = useBreakpoints(breakpointsTailwind)

const cols = computed(() => {
  if (breakpoints.xl.value)
    return 3
  if (breakpoints.lg.value)
    return 2
  return 1
})

const parts = computed(() => {
  const result = Array.from({ length: cols.value }, () => [] as typeof demos)
  demos.sort((a: any, b: any) => +new Date(b.date) - +new Date(a.date))
    .forEach((item: any, i: any) => {
      result[i % cols.value].push(item)
    })
  return result
})
</script>

<template>
  <div aria-label="document-driven-page">
    <div class="m-auto mb-8 slide-enter-50">
      <h1 class="page-title text-center">
        Demos
      </h1>
      <p class="text-center opacity-50 !-mt-6 italic">
        Demonstrations for projects I am working on from Tweets.
      </p>
    </div>
    <div grid="~ cols-1 lg:cols-2 xl:cols-3 gap-4">
      <div
        v-for="items, idx of parts"
        :key="idx"
        flex="~ col gap-4"
        class="slide-enter"
        :style="{
          '--enter-stage': idx + 1,
        }"
      >
        <component
          :is="demo.frontmatter.type === 'component' ? 'div' : 'a'"
          v-for="demo in items"
          :key="demo.url"
          :href="demo.frontmatter.link === false ? null : demo.frontmatter.href || demo.url"
          class="cursor-pointer [background:#ffffff] dark:[background:#000000] p-4px  block w-full [list-style:none] h-fit relative border overflow-hidden mb-1 rounded-xl border-solid border-#e8e8e8 hover:border-b-[#e8e8e8]! dark:border-[#2e2e2e] dark:hover:border-b-[#2e2e2e]! [transform:translateZ(0px)] text-inherit! no-underline! slide-enter transition-all duration-500"
          :style="`--enter-stage: ${idx + 1};`" style="content: none;"
        >
          <div
            class="
                  relative overflow-hidden rounded-lg [transform:translateZ(0px)]
                  [&::after]:content-[''] [&::after]:absolute [&::after]:w-full [&::after]:h-[200px] [&::after]:[transition:opacity_200ms_ease_0s] [&::after]:-bottom-16
                  bg-after
              "
          >
            <video playsinline loop autoplay muted="true" class="relative block w-full h-full object-cover box-border m-0 my-0! object-contain overflow-clip [overflow-clip-margin:content-box]" :src="`${demo.url}.mp4`" />
            <div class="w-full h-8 gap-3 absolute z-[1] [transition:opacity_200ms_ease_0s] whitespace-nowrap p-4 left-0 bottom-2 flex-nowrap justify-between items-center flex-row box-border flex">
              <p class="text-[rgb(237,237,237)] gap-1 overflow-hidden whitespace-nowrap text-ellipsis font-normal leading-7 text-sm block m-0">
                {{ demo.frontmatter.title }}
              </p>
              <p class="text-[rgba(255,255,255,0.592)] font-normal leading-7 text-sm block m-0">
                {{ formatDate(demo.frontmatter.date, false) }}
              </p>
            </div>
          </div>
          <a
            v-if="demo.frontmatter.meta"
            :href="demo.url"
            class="h-10 cursor-pointer items-center justify-center text-sm font-medium text-#171717 dark:text-[#ededed] flex gap-1 mt-1 rounded-lg [background:#f3f3f3] hover:[background:#ededed] dark:[background:#232323] dark:hover:[background:#282828] [transition:background_150ms_ease_0s,_color_150ms_ease_0s] border-none!"
          >
            {{ demo.frontmatter.meta }} <div i-ri-arrow-right-line />
          </a>
        </component>
      </div>
    </div>
  </div>
</template>
