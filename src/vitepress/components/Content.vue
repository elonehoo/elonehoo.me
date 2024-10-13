<script setup lang="ts">
import { useData } from 'vitepress'
import ContentDoc from './ContentDoc.vue'
import ContentPage from './ContentPage.vue'
import NotFound from './NotFound.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <main class="content">
    <NotFound v-if="page.isNotFound" />
    <ContentPage v-else-if="!!frontmatter.page" />
    <ContentDoc v-else />
  </main>
</template>

<style scoped>
.content {
  --at-apply: flex flex-wrap items-stretch pr-0 pt-0 min-h-[calc(100vh-6em)] ml-[--nav-width];
  padding: var(--h-margin) calc(var(--h-margin)* 1.5) 0 calc(var(--h-margin)* 2);
  padding-top: 0;
  padding-right: 0;
}
</style>
