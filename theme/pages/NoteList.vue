<script setup lang="ts">
import { data } from '@/notes.data'
import { groupByTime } from '~~/shared/groupByTime'

const notes = computed(() => groupByTime(data))
</script>

<template>
  <div v-for="post in notes" :key="post.key" class="mt-4">
    <OnlyTime :value="post.key" />
    <Items
      v-for="record in post.records"
      :key="record.url"
      :record="record"
    />
  </div>
</template>
