<script setup lang="ts">
import { PageBlogItem } from '../../core'
import { data as posts } from '../../core/data/posts.data'
</script>

<template>
  <PageBlogItem v-for="i in posts" :key="i.url" :item="i" slider />
</template>
