<script setup lang="ts">
import { groupByTime } from '~~/shared/groupByTime'
import { data } from '@/talks.data'

const talks = computed(() => groupByTime(data))
</script>

<template>
  <div v-for="post in talks" :key="post.key" class="mt-4">
    <OnlyTitle :value="post.key" />
    <Items
      v-for="record in post.records"
      :key="record.url"
      :record="record"
    />
  </div>
</template>
