<script setup lang="ts">
const props = defineProps<{
  items: Record<string, any>
}>()
</script>

<template>
  <div v-for="bookmark in Object.keys(props.items)" :key="bookmark" class="mt-4">
    <OnlyTime :value="bookmark" />
    <BookmarkItem
      v-for="record in props.items[bookmark]"
      :key="record.url"
      :record="record"
    />
  </div>
</template>
