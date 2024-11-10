<script setup lang="ts">
import type { Post } from '@/post.data'
import { Link } from 'destyler'

const props = defineProps<{
  item: Post
  slider?: boolean
}>()
</script>

<template>
  <div class="flex-[1_0_90%] relative border-b border-b-dotted border-border flex blog-item">
    <div class="inner">
      <!-- image -->
      <div v-if="props.item.img && !props.slider" class="img blog-image">
        <div class="w-[var(--h-n-w)] relative h-[calc(var(--h-n-w)_/_16_*_9)]">
          <img
            src="https://destyler.org/blog/release-0.0.4.png"
            alt="image"
            class="border border-border rounded-lg"
          >
        </div>
      </div>
      <!-- tag -->
      <div class="text-xs h-4 flex justify-between items-center mb-[0.3em] text-foreground/60 ">
        <div class="blog-tag">
          阅读时间 · {{ props.item.duration }}
        </div>
      </div>
      <!-- title -->
      <div class="blog-item-title">
        <Link
          target="_self"
          :to="props.item.url"
          class="blog-item-title-link"
        >
          {{ props.item.title }}
        </Link>
      </div>
      <!-- desc -->
      <div class="blog-item-desc" v-html="props.item.excerpt" />
      <!-- time -->
      <div class="blog-item-time">
        <span class="text-main font-bold text-xs">{{ props.item.time }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-item {
  animation-delay: calc(calc(var(--blog-index) * 0.15) * var(--duration)) !important;
  animation: slowShow calc(2* var(--duration)) var(--curve) calc(.65* var(--duration)) both;
}

.blog-item {
  &>.inner {
    --at-apply: flex-auto;
    padding: calc(var(--h-margin)* .5 - 1rem) calc(var(--h-margin)* 1.5) calc(var(--h-margin)* .5);
    margin-top: calc(var(--h-margin)* .5);
    margin-bottom: calc(var(--h-margin)* .5);
  }
}

.blog-image {
  --at-apply: block float-right ml-[1em] mr-[3px] mt-[1.5em] mb-[1em];
  transition: var(--transition-out);
  --h-n-w: calc(6vw + 8em);

  .blog-item:hover & {
    opacity: 1;
    transition: var(--transition);
    transform: scale(1.01);
  }
}

.blog-tag {
  --at-apply: text-left w-full op-0 flex justify-start items-center;
  translate: -.5em 0;
  transition: var(--transition-out);

  .blog-item:hover & {
    --at-apply: op-100 op-100;
    translate: none;
    transition: var(--transition);
  }
}

.blog-item-title {
  --at-apply: font-bold mt-0 mb-[0.3em] mx-0;
  font-size: calc(1rem + 0.1vh + 0.1vw);
}

.blog-item-title-link {
  --at-apply: cursor-pointer hover:decoration-main hover:decoration-solid underline-offset-[0.2em];
  transition: var(--transition-out);

  .blog-item:hover & {
    --at-apply: underline decoration-dotted decoration-border decoration-px;
    transition: var(--transition);
  }
}

.blog-item-title-link:hover {
  color: hsl(var(--main)) !important;
  text-decoration-color: hsl(var(--main)) !important;
  text-decoration-style: solid !important;
  transition: var(--transition);
}

.blog-item-desc {
  --at-apply: leading-[1.5] relative text-foreground/55;
    font-size: calc(.8rem + .1vh + .1vw);
    transition: var(--transition-out);
}

.blog-item-time {
  --at-apply: text-xs mt-[0.5em] p-0;
  transition: var(--transition-out);
}
</style>
