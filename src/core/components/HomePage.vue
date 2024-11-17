<script setup lang="ts">
import PageBlog from './PageBlog.vue'
import PageBookmarks from './PageBookmarks.vue'
import PageNotes from './PageNotes.vue'
</script>

<template>
  <div class="content flex pl-[calc(var(--h-margin)*2)] flex-wrap items-stretch pr-0 pt-0">
    <PageBlog />
    <PageBookmarks />
    <PageNotes />
  </div>
</template>

<style scoped>
@media (max-width: 900px) {
    .content {
        margin: 2rem 0 0 0;
        padding: 0;
        display: block;
    }
}
</style>
