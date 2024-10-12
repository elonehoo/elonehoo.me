<script setup lang="ts">
import PageBlog from './PageBlog.vue'
import PageBookmarks from './PageBookmarks.vue'
</script>

<template>
  <div class="flex">
    <PageBlog />
    <PageBookmarks />
    <section class="flex-[1_0_20%] order-4">
      notes
    </section>
  </div>
</template>
