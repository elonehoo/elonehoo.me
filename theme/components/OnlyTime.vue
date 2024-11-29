<script setup lang="ts">
const props = defineProps<{
  value: string | number
  // todo size and address
}>()
</script>

<template>
  <div class="relative select-none h-10">
    <span
      class="
        text-8em absolute top--3rem font-bold
        color-transparent transition-all
        duration-200 ease-linear pointer-events-none
        dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.2)]
        [-webkit-text-stroke:1px_rgba(0,0,0,0.2)]"
    >
      {{ props.value }}
    </span>
  </div>
</template>
