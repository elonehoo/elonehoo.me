<script setup lang="ts">
import { data } from '~/core/data/posts.data'
import { groupByTime } from '../../shared/groupByTime'

const groupedList = computed(() => groupByTime(data))
</script>

<template>
  <LayoutDefault>
    <template #title>
      博客存档
    </template>

    <div class="wrapper flex flex-wrap flex-row pt-[calc(var(--h-margin)_*_2)] mb-4em">
      <PageList
        v-for="({ key, records }, index) in groupedList"
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
