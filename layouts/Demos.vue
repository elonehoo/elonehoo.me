<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import dayjs from 'dayjs'

const breakpoints = useBreakpoints(breakpointsTailwind)

const cols = computed(() => {
  if (breakpoints.xl.value)
    return 3
  if (breakpoints.lg.value)
    return 2
  return 1
})

const data = useContent().navigation.value?.filter((i: any) => i._path.startsWith('/demos'))[0]

const demos = data.demos

const parts = computed(() => {
  const result = Array.from({ length: cols.value }, () => [] as typeof demos)
  demos
    .sort((a: any, b: any) => +new Date(b.date) - +new Date(a.date))
    .forEach((item: any, i: any) => {
      result[i % cols.value].push(item)
    })
  return result
})

useSeoMeta({
  title: data.title,
  description: data.subtitle === undefined ? 'Elone Hoo\'s Portfolio' : data.subtitle,
  ogTitle: data.title,
  ogImage: data.image === undefined ? '/og.png' : data.image,
  ogDescription: data.subtitle === undefined ? 'Elone Hoo\'s Portfolio' : data.subtitle,
  twitterTitle: data.title,
  twitterCard: 'summary_large_image',
  twitterCreator: '@elonehoo',
  twitterDescription: data.subtitle === undefined ? 'Elone Hoo\'s Portfolio' : data.subtitle,
  twitterImage: data.image === undefined ? '/og.png' : data.image,
})

useHead({
  title: data.title,
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/logo-dark.svg',
    },
  ],
})

const router = useRouter()

function go(type: string, url: string) {
  if (type === 'component')
    router.push({ path: url })
}
</script>

<template>
  <DefaultLayout>
    <main class="md:p-2 p-0 flex flex-col relative min-h-screen overflow-hidden md:mx-auto mx-0 my-0 box-border">
      <div grid="~ cols-1 lg:cols-2 xl:cols-3 gap-4">
        <div v-for="items, idx of parts" :key="idx" flex="~ col gap-4">
          <component
            :is="demo.type === 'component' ? 'div' : 'a'"
            v-for="demo in items"
            :key="demo.link"
            :href="demo.link"
            :class="demo.type === 'component' ? '' : 'cursor-pointer'"
            class="[background:#ffffff] dark:[background:#000000] p-4px  block w-full [list-style:none] h-fit relative border overflow-hidden mb-1 rounded-xl border-solid border-#e8e8e8 hover:border-b-[#e8e8e8]! dark:border-[#2e2e2e] dark:hover:border-b-[#2e2e2e]! [transform:translateZ(0px)] text-inherit! no-underline! slide-enter transition-all duration-500"
            :style="`--enter-stage: ${idx + 1};`" style="content: none;"
          >
            <div
              class="
                  relative overflow-hidden rounded-lg [transform:translateZ(0px)]
                  [&::after]:content-[''] [&::after]:absolute [&::after]:w-full [&::after]:h-[200px] [&::after]:[transition:opacity_200ms_ease_0s] [&::after]:-bottom-16
                  bg-after
              "
            >
              <component :is="demo.url" v-if="demo.type === 'component'" />
              <video v-else-if="demo.type === 'video'" playsinline loop autoplay class="relative block w-full h-full object-cover box-border m-0 my-0! object-contain overflow-clip [overflow-clip-margin:content-box]" :src="`/demos/${demo.url}.mp4`" />
              <img
                v-else
                class="text-transparent aspect-[1.90476_/_1] block w-full h-full object-cover box-border m-0 my-0!"
                :src="`/demos/${demo.url}.png`"
              >
              <div class="w-full h-8 gap-3 absolute z-[1] [transition:opacity_200ms_ease_0s] whitespace-nowrap p-4 left-0 bottom-2 flex-nowrap justify-between items-center flex-row box-border flex">
                <p class="text-[rgb(237,237,237)] gap-1 overflow-hidden whitespace-nowrap text-ellipsis font-normal leading-7 text-sm block m-0">
                  {{ demo.desc }}
                </p>
                <p class="text-[rgba(255,255,255,0.592)] font-normal leading-7 text-sm block m-0">
                  {{ dayjs(demo.date).format('MMM D, YYYY') }}
                </p>
              </div>
            </div>
            <div
              v-if="demo.meta"
              class="h-10 cursor-pointer items-center justify-center text-sm font-medium text-#171717 dark:text-[#ededed] flex gap-1 mt-1 rounded-lg [background:#f3f3f3] hover:[background:#ededed] dark:[background:#232323] dark:hover:[background:#282828] [transition:background_150ms_ease_0s,_color_150ms_ease_0s]"
              @click="go(demo.type, demo.link)"
            >
              {{ demo.meta }} <div i-ri-arrow-right-line />
            </div>
          </component>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

<style scoped>
.bg-after::after{
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9),
    50%,
    rgba(0, 0, 0, 0)
  );
}
</style>
