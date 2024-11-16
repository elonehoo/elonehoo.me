<script setup lang="ts">
import { data } from '@/demos.data'
import { breakpointsTailwind } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const cols = computed(() => {
  if (breakpoints.xl.value)
    return 3
  if (breakpoints.lg.value)
    return 2
  return 1
})

const parts = computed(() => {
  const result = Array.from({ length: cols.value }, () => [] as typeof data)
  data.sort((a: any, b: any) => +new Date(b.date) - +new Date(a.date))
    .forEach((item: any, i: any) => {
      result[i % cols.value].push(item)
    })
  return result
})
</script>

<template>
  <LayoutDefault>
    <template #title>
      小样存档
    </template>

    <div class="wrapper flex flex-wrap flex-row pt-[calc(var(--h-margin)_*_2)] mb-4em">
      <div grid="~ cols-1 lg:cols-2 xl:cols-3 gap-4">
        <div v-for="items, idx of parts" :key="idx" flex="~ col gap-4">
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
            </div>
          </component>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>
