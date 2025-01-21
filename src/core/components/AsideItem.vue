<script setup lang="ts">
import { Link } from 'destyler'
import Icones from './icones/Icones.vue'

const props = defineProps<{
  link?: string
  icon?: string
}>()

const isExternalLink = computed(() => {
  return props.link?.startsWith('http://') || props.link?.startsWith('https://')
})
</script>

<template>
  <div class="group relative text-gray-9 hover:text-gray-12 dark:hover:text-gray-1">
    <Link :to="props.link" :target="isExternalLink ? '_blank' : undefined">
      <slot />
    </Link>
    <div
      v-if="props.icon !== undefined"
      class="
      group-hover:opacity-100 op-0
      absolute -right-5.5 bottom-[5px]
      rounded-sm shrink-0 block p-px w-4 h-4
      bg-action/5 text-action/95"
    >
      <Icones :name="props.icon" />
    </div>
  </div>
</template>
