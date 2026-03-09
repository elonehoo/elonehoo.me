<script setup lang="ts">
definePageMeta({
  layout: 'default',
  outline: true,
})

const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
  title: home.value?.seo.title,
  description: home.value?.seo.description,
})
</script>

<template>
  <div class="prose-md">
    <ContentRenderer v-if="home" :value="home">
      <template #empty>
        Home not found
      </template>
    </ContentRenderer>
  </div>
</template>
