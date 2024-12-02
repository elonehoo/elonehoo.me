<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: string | number
  size?: 'sm' | 'lg'
}>(), {
  size: 'lg',
})

const size = computed<string>(() => {
  return props.size === 'sm'
    ? 'text-3em top-0'
    : 'text-8em top--3rem'
})
</script>

<template>
  <div class="relative select-none h-10">
    <span
      :class="size"
      class="
        absolute font-bold
        color-transparent transition-all
        duration-200 ease-linear pointer-events-none
        dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.2)]
        [-webkit-text-stroke:1px_rgba(0,0,0,0.2)]"
    >
      {{ props.value }}
    </span>
  </div>
</template>
