<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div v-if="frontmatter.duration" class="text-sm text-foreground/55 cursor-default leading-7 box">
    <span class="title">
      阅读时间
    </span>
    {{ frontmatter.duration }}
  </div>
</template>

<style scoped>
.title {
  transition: var(--transition-out);
}

.title::after {
  content: '~';
  color: hsl(var(--main));
}

.box:hover .title {
  --at-apply: pr-0.3em text-main;
  transition: var(--transition);
}
</style>
