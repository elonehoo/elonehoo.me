<script setup lang="ts">
const props = defineProps<{
  record: any
}>()
</script>

<template>
  <div class="flex flex-col mt-4 group">
    <div class="flex justify-start md:gap-x-16 gap-x-4">
      <NuxtLink :to="props.record.link" target="_blank">
        {{ props.record.name }}
      </NuxtLink>
    </div>
    <span class="mt-2">
      {{ props.record.desc }}
    </span>
  </div>
</template>
