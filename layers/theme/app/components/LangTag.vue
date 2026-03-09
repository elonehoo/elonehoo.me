<script setup lang="ts">
defineOptions({
  name: 'ThemeLangTag',
})

defineProps<{
  name: string
  status?: string
}>()
</script>

<template>
  <span>{{ name }}<sup v-if="status">{{ status }}</sup></span>
</template>
