<script setup lang="ts">
import type { Note } from '@/note.data'
import type { Post } from '@/post.data'
import { useRouter } from 'vitepress'

const props = defineProps<{
  item: Post | Note
  title: string
}>()

const router = useRouter()

function goTo(url: string) {
  router.go(url)
}
</script>

<template>
  <div class="box text-sm text-foreground/55 cursor-default cursor-pointer my-1.5 hover:text-main">
    <span class="link" @click="goTo(props.item.url)">
      <span class="title">
        {{ props.title }}
      </span>
      {{ props.item.title }}
    </span>
  </div>
</template>

<style scoped>
.box {
  transition: var(--transition-out);
}

.box:hover {
  transition: var(--transition);
}

.link {
  transition: var(--transition-out);
  .box:hover & {
    --at-apply: hover:border-b hover:border-b-solid hover:border-b-main;
    transition: var(--transition);
  }
}
</style>
