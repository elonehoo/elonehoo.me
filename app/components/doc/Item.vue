<script setup lang="ts">
import dayjs from 'dayjs'

const props = defineProps<{
  record: any
}>()
</script>

<template>
  <div class="flex flex-col mt-4 group">
    <div class="flex justify-between md:gap-x-8 gap-x-4">
      <NuxtLink :to="props.record.url" target="_self">
        {{ props.record.title }}
      </NuxtLink>
      <time class="hidden md:block text-gray-9 group-hover:text-gray-12">
        {{ dayjs(props.record.date).format('M月D日') }}
      </time>
    </div>
  </div>
</template>
