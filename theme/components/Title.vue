<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>

<template>
  <h1 class="text-[calc(.3vmax_+_.3vmin_+_1.5rem)] font-bold text-foreground leading-1.26 pl-[calc(var(--h-margin)*2)]">
    <span class="after:content-['~'] after:mx-2 after:text-main">elonehoo.me</span>
    <span>
      <slot>
        {{ props.title }}
      </slot>
    </span>
  </h1>
</template>
