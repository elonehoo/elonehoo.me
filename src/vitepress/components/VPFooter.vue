<script setup lang="ts">
import { useConfig } from '../composables/config'

const { config } = useConfig()
</script>

<template>
  <div class="mt-10 mb-6">
    <a
      :href="config.footer?.license?.link"
      target="_blank"
      class="
        items-center gap-x-0.5 w-fit hover:bg-action hover:text-gray-12
        after:content-[''] after:absolute after:bottom-px after:left-0
        after:w-full after:h-px after:bg-action relative inline-flex"
    >
      {{ config.footer?.license?.text }}
    </a>
    <span class="ml-1">{{ config.footer?.copyright }}</span>
  </div>
</template>
