<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <Content v-if="frontmatter.home" class="prose-md" />
</template>
