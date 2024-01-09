<script setup lang="ts">
const data = useContent().navigation.value?.filter((i: any) => i._path.startsWith('/gallery'))[0]
const gallery = data.gallery.reverse()

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
</script>

<template>
  <DefaultLayout>
    <main class="p-0 md:p-2 flex flex-col relative min-h-screen overflow-hidden mx-0 md:mx-auto my-0 box-border">
      <div class="grid grid-cols-[repeat(auto-fit,minmax(440px,1fr))] gap-2 box-border">
        <div v-for="photo, idx in gallery" :key="photo.url" class="inline-block relative w-334px md:w-full md:h-350px h-200px [outline:0px] slide-enter" :style="`--enter-stage: ${idx};`" style="content: none;">
          <PreviewRoot class="transition-transform ease-in-out duration-500 outline-none">
            <template #default>
              <img
                class="absolute h-200px md:h-350px md:w-full w-334px text-transparent inset-0 select-none object-cover my-0! rounded-2xl"
                :src="`/gallery${photo.url}`"
                :alt="photo.url"
              >
            </template>
            <template #preview>
              <img
                class="rounded-2xl"
                :src="`/gallery${photo.url}`"
                :alt="photo.url"
              >
            </template>
          </PreviewRoot>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>
