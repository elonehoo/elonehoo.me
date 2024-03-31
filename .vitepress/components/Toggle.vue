<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  modelValue: Boolean as PropType<boolean>,
})
const emit = defineEmits(['update:modelValue'])
function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <div class="toggle" :class="{ active: modelValue }" @click="toggle">
    <slot />
  </div>
</template>

<style scoped>
.toggle {
  cursor: pointer;
  opacity: 0.2;
}
.toggle:hover {
  text-decoration: underline;
}
.toggle.active {
  opacity: 1;
}
</style>
