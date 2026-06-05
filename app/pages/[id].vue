<script setup lang="ts">
definePageMeta({
  layout: 'list',
  outline: true,
})

const route = useRoute()

const contentId = computed(() => getRouteParam(route.params.id))

const contentKey = computed(() => `content-page:${contentId.value}`)

const { data } = await useAsyncData(
  contentKey,
  () => queryCollection('content').path(`/${contentId.value}`).first(),
)

useSeoMeta({
  title: () => data.value?.seo.title,
  description: () => data.value?.seo.description,
})
</script>

<template>
  <ContentRenderer v-if="data" :value="data" />
</template>
