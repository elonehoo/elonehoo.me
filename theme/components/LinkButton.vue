<script setup lang="ts">
import { Link } from 'destyler'
import { Icones } from '~/index'

const props = defineProps<{
  link: string
}>()
</script>

<template>
  <Link
    :to="props.link"
    target="_self"
    class="
    flex items-center gap-x-0.5 w-fit text-gray-11 text-sm
    hover:bg-action hover:text-gray-12 px-1.5 py-1 rounded-sm
    font-medium border border-gray-12 hover:border-action
    cursor-pointer after:bg-transparent!"
  >
    <slot />
    <Icones name="Right" class="w-3 h-3" />
  </Link>
</template>
