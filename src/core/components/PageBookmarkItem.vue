<script setup lang="ts">
import type { BookmarkItem } from '@/bookmark.data'
import { Link } from 'destyler'

const props = defineProps<{
  item: BookmarkItem
}>()
</script>

<template>
  <li class="page-bookmark-item flex text-left relative [list-style:none] py-[--h-margin] border-b border-b-dotted border-b-border">
    <Link
      target="_blank"
      :to="props.item.link"
      class="cursor-pointer page-bookmark-item-link"
    >
      <!-- title -->
      <div class="page-bookmark-item-title">
        {{ props.item.name }}
      </div>
      <!-- desc -->
      <div class="page-bookmark-item-desc">
        <span>{{ props.item.desc }}</span>
      </div>
    </Link>
  </li>
</template>

<style scoped>
.page-bookmark-item::after {
  --at-apply: text-3em text-foreground/60 op-15 absolute right-[-0.15em] top-[0.1em] font-bold z-0;
  counter-increment: jobnb;
  content: "" counter(jobnb) "";
  font-feature-settings: 'tnum';
}

.page-bookmark-item-title {
  --at-apply: font-bold z-2 relative leading-[1.35] text-foreground;
  font-size: calc(.8rem + .1vh + .1vw);
  transition: var(--transition-out);

  .page-bookmark-item-link:hover & {
    --at-apply: text-main;
    transition: var(--transition);
  }
}

.page-bookmark-item-link {
  --at-apply: block w-full border-none relative;
  transition: var(--transition-out);
  text-decoration: none;
}

.page-bookmark-item-link:hover {
  --at-apply:  border-[none] [scale:1.03];
  transition: var(--transition);
}

.page-bookmark-item-desc{
  --at-apply: leading-[1.35] text-sm text-foreground/60 mt-0.3em mb-0.5em;
}
</style>
