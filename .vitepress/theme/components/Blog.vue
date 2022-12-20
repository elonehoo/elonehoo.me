<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { data as posts } from '../composables/post.data'

const { frontmatter: data } = useData()

const route = useRoute()

function findCurrentIndex() {
  return posts.findIndex((p) => p.href === route.path)
}

const date = computed(() => posts[findCurrentIndex()].date)

</script>

<template>
  <div class="prose m-auto mb-8">
    <h1 class="mb-0">
      {{ data.title }}
    </h1>
    <p v-if="data.date" class="opacity-50 !-mt-2">
      {{ date.string }} · {{ data.duration }}
    </p>
    <div>
      <Content class="prose content m-auto" />
    </div>
  </div>
</template>
