<script setup lang="ts">
import { data } from '@/posts.data'
import { groupByTime } from '~~/shared/groupByTime'

const posts = computed(() => groupByTime(data))
</script>

<template>
  <div v-for="post in posts" :key="post.key" class="mt-4">
    <div class="relative select-none h-10">
      <span
        class="
          text-8em absolute top--3rem font-bold
          color-transparent transition-all
          duration-200 ease-linear pointer-events-none
        dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.2)]
        [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]"
      >
        {{ post.key }}
      </span>
    </div>
    <Items
      v-for="record in post.records"
      :key="record.url"
      :record="record"
    />
  </div>
</template>
