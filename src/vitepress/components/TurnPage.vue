<script setup lang="ts">
import { PagePagination } from '../../core'
import { data as notes } from '@/note.data'
import { data as posts } from '@/posts.data'
import { usePageType } from '../composables/pageType'

const { isNotes, isPost } = usePageType()

const route = useRoute()

function findCurrentIndex() {
  if (isPost.value) {
    return posts.findIndex(p => p.url === route.path)
  }
  if (isNotes.value) {
    return notes.findIndex(p => p.url === route.path)
  }
  return undefined
}

// use the customData date which contains pre-resolved date info
const nextPost = computed(() => {
  if (findCurrentIndex() === undefined) {
    return undefined
  }
  else {
    if (isPost.value) {
      return posts[findCurrentIndex()! - 1]
    }
    if (isNotes.value) {
      return notes[findCurrentIndex()! - 1]
    }
    return undefined
  }
})
const prevPost = computed(() => {
  if (findCurrentIndex() === undefined) {
    return undefined
  }
  else {
    if (isPost.value) {
      return posts[findCurrentIndex()! + 1]
    }
    if (isNotes.value) {
      return notes[findCurrentIndex()! + 1]
    }
    return undefined
  }
})
</script>

<template>
  <div class="mt-2 flex flex-col">
    <!-- prev -->
    <PagePagination v-if="prevPost" title="上一篇" :item="prevPost" />
    <!-- next -->
    <PagePagination v-if="nextPost" title="下一篇" :item="nextPost" />
  </div>
</template>
