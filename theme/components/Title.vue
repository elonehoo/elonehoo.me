<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <h1
    class="
      font-medium flex items-center gap-x-1.5 text-18px pt-2 mt-4
    "
  >
    <span class="inline-block w-2 h-2 rounded-full bg-action" />
    {{ frontmatter.title }}
  </h1>
</template>
