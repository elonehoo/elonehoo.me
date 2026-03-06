<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <h1
    class="
      font-medium flex items-center gap-x-1.5 text-18px pt-2 mt-4
      before:content-['#'] before:text-action
      before:flex before:justify-center before:items-center
    "
  >
    <slot>
      {{ frontmatter.title }}
    </slot>
  </h1>
</template>
