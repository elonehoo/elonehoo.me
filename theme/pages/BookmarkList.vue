<script setup lang="ts">
const props = defineProps<{
  items: Record<string, any>
}>()
</script>

<template>
  <div v-for="bookmark in Object.keys(props.items)" :key="bookmark" class="mt-4">
    <OnlyTitle :value="bookmark" size="sm" />
    <BookmarkItem
      v-for="record in props.items[bookmark]"
      :key="record.link"
      :record="record"
    />
  </div>
</template>
