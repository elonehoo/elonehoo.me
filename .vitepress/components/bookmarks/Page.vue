<script setup lang="ts">
import type { BookmarkItem } from './Item.vue'

const props = defineProps<{
  items: Record<string, BookmarkItem[]>
}>()
</script>

<template>
  <LayoutDefault>
    <template #title>
      常用的工具
    </template>
    <div class="wrapper flex flex-wrap flex-row pt-[calc(var(--h-margin)_*_2)] mb-4em">
      <!--  -->
      <BookmarksList
        v-for="(key, index) in Object.keys(props.items)"
        :key="key"
        :class="index === 0 ? 'mt-0' : 'mt-[calc(var(--h-margin)_*_1.5)]'"
        :title="key"
        :items="props.items[key]"
      />
    </div>
  </LayoutDefault>
</template>
