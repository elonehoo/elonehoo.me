<script setup lang="ts">
import { Link } from 'destyler'

const props = defineProps<{
  record: any
}>()
</script>

<template>
  <div class="flex flex-col mt-4 group">
    <div class="flex justify-between md:gap-x-16 gap-x-4">
      <Link :to="props.record.link" target="_blank">
        {{ props.record.name }}
      </Link>
      <span>
        {{ props.record.desc }}
      </span>
    </div>
  </div>
</template>
