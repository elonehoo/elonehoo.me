<script setup lang="ts">
import { data as posts } from '@/posts.data'
import { PageBlogItem } from '../../core'
</script>

<template>
  <PageBlogItem v-for="i in posts" :key="i.url" :item="i" slider />
</template>
