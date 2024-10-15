<script setup lang="ts">
import type { Post } from '../data/post.data'
import { useRouter } from 'vitepress'

const props = defineProps<{
  post: Post
  title: string
}>()

const router = useRouter()

function goTo(url: string) {
  router.go(url)
}
</script>

<template>
  <div class="box text-sm text-foreground/55 cursor-default cursor-pointer my-1.5 hover:text-main">
    <span class="link" @click="goTo(props.post.url)">
      <span class="title">
        {{ props.title }}
      </span>
      {{ props.post.title }}
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
