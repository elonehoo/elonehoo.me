<script setup lang="ts">
definePageMeta({
  layout: 'list',
  outline: true,
})

const route = useRoute()

const { data } = await useAsyncData(() => queryCollection('content').path(`/${route.params.id}`).first())

useSeoMeta({
  title: data.value?.seo.title,
  description: data.value?.seo.description,
})
</script>

<template>
  <ContentRenderer v-if="data" :value="data" />
</template>
