<script setup lang="ts">
const route = useRoute()

const { data } = await useAsyncData(`content-${route.path}`, () => {
  return queryContent().where({ _path: route.path }).findOne()
})
useSeoMeta({
  ogTitle: data.value?.navigation.title,
  ogImage: data.value?.navigation.image === undefined ? '/og.png' : data.value?.navigation.image,
  ogDescription: data.value?.navigation.subtitle === undefined ? 'Elone Hoo\'s Portfolio' : data.value?.navigation.subtitle,
  description: data.value?.navigation.subtitle === undefined ? 'Elone Hoo\'s Portfolio' : data.value?.navigation.subtitle,
  twitterTitle: data.value?.navigation.title,
  twitterCard: 'summary_large_image',
  twitterCreator: '@elonehoo',
  twitterDescription: data.value?.navigation.subtitle === undefined ? 'Elone Hoo\'s Portfolio' : data.value?.navigation.subtitle,
  twitterImage: data.value?.navigation.image === undefined ? '/og.png' : data.value?.navigation.image,
})

useHead({
  title: data.value?.navigation.title,
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
    <ListMenu show-year name="notes" />
  </DefaultLayout>
</template>
