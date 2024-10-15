<script setup lang="ts">
import dayjs from 'dayjs'
import zh from 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useData } from 'vitepress'

dayjs.locale(zh)
dayjs.extend(relativeTime)

const { page } = useData()
</script>

<template>
  <div v-show="page.lastUpdated" class="text-sm text-foreground/55 cursor-default box">
    <span class="title">
      更新时间
    </span>
    {{ dayjs(page.lastUpdated).fromNow() }}
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
