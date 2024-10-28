<script setup lang="ts">
import type { LineItem } from '../LineItem.vue'

const props = defineProps<{
  items: Record<string, LineItem[]>
}>()
</script>

<template>
  <LayoutDefault>
    <template #title>
      常用的工具
    </template>
    <div class="wrapper flex flex-wrap flex-row pt-[calc(var(--h-margin)_*_2)] mb-4em">
      <PageList
        v-for="(key, index) in Object.keys(props.items)"
        :key="key"
        :class="index === 0 ? 'mt-0' : 'mt-[calc(var(--h-margin)_*_1.5)]'"
        :title="key"
        type="line"
        meta="个书签"
        :items="props.items[key]"
      />
    </div>
  </LayoutDefault>
</template>
