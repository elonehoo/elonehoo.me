<script setup lang="ts">
const props = defineProps<{
  headers: any[]
}>()
</script>

<template>
  <ul>
    <li v-for="header, idx in props.headers" :key="idx">
      <a :href="header.link" :aria-label="`Header Level ${header.level}`">{{ header.title }}</a>
      <TocItem v-if="header.children" :headers="header.children" />
    </li>
  </ul>
</template>
