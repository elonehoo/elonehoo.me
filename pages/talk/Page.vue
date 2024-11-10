<script setup lang="ts">
import { data } from '@/talks.data'
import { groupByTime } from '~~/shared/groupByTime'

const talks = groupByTime(data)
</script>

<template>
  <LayoutDefault>
    <template #title>
      随笔存档
    </template>

    <div class="wrapper flex flex-wrap flex-row pt-[calc(var(--h-margin)_*_2)] mb-4em">
      <PageList
        v-for="({ key, records }, index) in talks"
        :key="key"
        :title="key"
        :class="index === 0 ? 'mt-0' : 'mt-[calc(var(--h-margin)_*_1.5)]'"
        type="block"
        meta="篇博客"
        :items="records"
      />
    </div>
  </LayoutDefault>
</template>
