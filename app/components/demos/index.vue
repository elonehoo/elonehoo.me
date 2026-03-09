<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps<{
  name: string
}>()

const modules = import.meta.glob('./*.vue')

const demoComponent = computed(() => {
  const loader = modules[`./${props.name}.vue`]

  if (!loader)
    return null

  return defineAsyncComponent(loader)
})
</script>

<template>
  <component :is="demoComponent" v-if="demoComponent" v-bind="$attrs" />
  <div
    v-else
    class="border border-dashed border-gray-300 rounded-lg px-4 py-3 text-sm op-70"
  >
    Demo not found: {{ name }}
  </div>
</template>