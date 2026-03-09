<script setup lang="ts">
import type { PropType } from 'vue'
import { get } from '../utils/vector'

const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
    required: true,
  },
  options: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})
const emit = defineEmits(['update:modelValue'])
function toggle() {
  const index = props.options.indexOf(props.modelValue) || 0
  emit('update:modelValue', get(props.options, index + 1))
}
</script>

<template>
  <div class="opacity-50 hover:underline cursor-pointer" :class="{ active: modelValue }" @click="toggle">
    {{ modelValue }}
  </div>
</template>
