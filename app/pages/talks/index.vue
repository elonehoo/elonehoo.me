<script setup lang="ts">
definePageMeta({
  layout: 'talks',
  outline: true,
})

const { data } = await useAsyncData(() => queryCollection('content').path('/talks').first())

useSeoMeta({
  title: data.value?.seo.title,
  description: data.value?.seo.description,
})
</script>

<template>
  <ContentRenderer v-if="data" :value="data" />
</template>
