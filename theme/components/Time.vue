<script setup lang="ts">
import dayjs from 'dayjs'
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div class="op-50 flex mt-1">
    <span>{{ dayjs(frontmatter.date).format('M月D日') }}</span>
    <span class="mx-1">•</span>
    <span>{{ frontmatter.duration }}</span>
  </div>
</template>
