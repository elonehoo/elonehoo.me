<script setup lang="ts">
import { data as posts } from '@/post.data'
import PageBlogItem from './PageBlogItem.vue'
import PageMore from './PageMore.vue'
</script>

<template>
  <ClientOnly>
    <section
      class="page-blog"
    >
      <div class="flex flex-wrap relative left-[calc(var(--h-margin)_*_-1.5)] w-[calc(100%_+_var(--h-margin)_*_3_+_2px)]">
        <!-- item -->
        <PageBlogItem v-for="(i, index) in posts" :key="i.url" :item="i" :style="{ '--blog-index': index }" />
      </div>
      <PageMore
        title="看看更多"
        desc="侧边栏导航也能进入哦~"
        to="/blog"
        class="pb-[calc(var(--h-margin)_*_2)]"
      />
    </section>
  </ClientOnly>
</template>

<style scoped>
.page-blog {
  --at-apply:
  order-1 flex-[1_1_40%] px-0
  overflow-hidden relative
  pt-[calc(1*_var(--h-margin))]
  mr-[calc(1.5*_var(--h-margin))];
}

@media (max-width: 900px) {
  .page-blog {
    padding: var(--h-margin) calc(var(--h-margin)* 1.2) 0;
    margin: 0;
  }
}
</style>
