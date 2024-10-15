<script setup lang="ts">
import { PagePagination } from '../../core'
import { data as posts } from '../../core/data/posts.data'

const route = useRoute()

function findCurrentIndex() {
  return posts.findIndex(p => p.url === route.path)
}

// use the customData date which contains pre-resolved date info
const nextPost = computed(() => posts[findCurrentIndex() - 1])
const prevPost = computed(() => posts[findCurrentIndex() + 1])
</script>

<template>
  <div class="mt-2 flex flex-col">
    <!-- prev -->
    <PagePagination title="上一篇" :post="prevPost" />
    <!-- next -->
    <PagePagination title="下一篇" :post="nextPost" />
  </div>
</template>
