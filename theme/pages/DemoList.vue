<script setup lang="ts">
import { data } from '@/demos.data'
import { groupByTime } from '~~/shared/groupByTime'

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
