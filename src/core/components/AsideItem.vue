<script setup lang="ts">
import { Link } from 'destyler'
import Icones from './icones/Icones.vue'

const props = defineProps<{
  link?: string
  icon?: string
}>()
</script>

<template>
  <div class="group relative text-gray-11 hover:text-gray-1">
    <Link :to="props.link" target="_blank">
      <slot />
    </Link>
    <div v-if="props.icon !== undefined" class="group-hover:opacity-100 opacity-0 absolute -right-4 bottom-[5px] rounded-sm bg-action shrink-0 block w-3 h-3 text-white">
      <Icones :name="props.icon" />
    </div>
  </div>
</template>
