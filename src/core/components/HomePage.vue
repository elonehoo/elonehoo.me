<script setup lang="ts">
import PageBlog from './PageBlog.vue'
import PageBookmarks from './PageBookmarks.vue'
import PageNotes from './PageNotes.vue'
</script>

<template>
  <div class="flex pl-[calc(var(--h-margin)*2)]">
    <PageBlog />
    <PageBookmarks />
    <PageNotes />
  </div>
</template>
