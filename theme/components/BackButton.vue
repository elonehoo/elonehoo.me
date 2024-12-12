<script setup lang="ts">
import { Link } from 'destyler'
import { useRoute } from 'vitepress'
import { computed } from 'vue'
import { Icones } from '~/index'

const route = useRoute()

const prevPath = computed(() => route.path.split('/').slice(0, -1).join('/') || '/')
</script>

<template>
  <Link
    class="
      flex gap-x-1 w-fit rounded-sm pl-0.5 pr-1
      bg-action/80 hover:bg-action
      dark:bg-action dark:hover:bg-action/50
      text-gray-1 dark:text-gray-12
      py-0.5 leading-none items-center transition
      duration-100 justify-center"
    :to="prevPath"
  >
    <Icones name="Left" class="w-4 h-4" />
    <span class="text-sm font-medium ml-1">cd ..</span>
  </Link>
</template>
