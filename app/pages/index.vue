<script setup lang="ts">
definePageMeta({
  layout: 'home',
})

const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
  title: home.value?.seo.title,
  description: home.value?.seo.description,
})
</script>

<template>
  <div class="prose-md">
    <ContentRenderer v-if="home" :value="home" />
    <div v-else>
      Home not found
    </div>
  </div>
</template>
