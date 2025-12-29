<script setup lang="ts">
import { groupByTime } from '~~/shared/groupByTime'
import { data } from '@/demos.data'

const demos = computed(() => groupByTime(data))
</script>

<template>
  <div v-for="demo in demos" :key="demo.key" class="mt-4">
    <OnlyTitle :value="demo.key" />
    <Items
      v-for="record in demo.records"
      :key="record.url"
      :record="record"
    />
  </div>
</template>
