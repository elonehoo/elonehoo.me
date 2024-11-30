<script setup lang="ts">
import { data } from '@/posts.data'
import { groupByTime } from '~~/shared/groupByTime'

const posts = computed(() => groupByTime(data))
</script>

<template>
  <div v-for="post in posts" :key="post.key" class="mt-4">
    <OnlyTitle :value="post.key" />
    <Items
      v-for="record in post.records"
      :key="record.url"
      :record="record"
    />
  </div>
</template>
