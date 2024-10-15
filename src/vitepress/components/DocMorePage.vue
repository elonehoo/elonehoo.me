<script setup lang="ts">
import { PageBlogItem } from '../../core'
import { data as posts } from '../../core/data/posts.data'
</script>

<template>
  <section
    class="order-4 flex-[1_1_20%] h-100% relative overflow-hidden
    pt-[calc(var(--h-margin)_*_1)]! pb-[calc(var(--h-margin)_*_2)]!"
  >
    <div class="fixed overflow-y-auto h-88%">
      <PageBlogItem v-for="i in posts" :key="i.url" :item="i" slider />
    </div>
  </section>
</template>
