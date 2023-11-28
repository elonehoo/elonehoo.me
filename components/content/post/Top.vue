<script setup lang="ts">
const props = defineProps<{
  rank?: string
  value?: string
  money?: string
}>()
</script>

<template>
  <sup v-if="props.rank" class="badge-green badge-xs!">
    Top {{ props.rank }}
  </sup>
  <span v-if="props.value" class="mx-1">
    {{ props.value }}
  </span>
  <sub v-if="props.money" class="badge-sky badge-xs!">
    ¥ {{ props.money }}
  </sub>
</template>
