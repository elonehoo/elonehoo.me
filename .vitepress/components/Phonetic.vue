<script setup lang="ts">
import { useIndex } from '../composables/index'

const props = defineProps<{
  phonetic?: string
  index?: number
}>()

const moIndex = useIndex()

const index = computed(() => props.index ?? moIndex)
</script>

<template>
  <span class="phonetic pho" :style="{ '--phonetic': `'${props.phonetic}'`, '--index': index }">
    <slot />
  </span>
</template>

<style scoped>
.pho::before {
  transition-delay: calc(var(--duration) * .3 * var(--index));
}
</style>
