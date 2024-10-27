<script setup lang="ts">
import { Link } from 'destyler'

export interface BookmarkItem {
  name: string
  link: string
  desc: string
}

const props = defineProps<{
  item: BookmarkItem
}>()
</script>

<template>
  <div
    class="
    bookmark-item
    text-1.14em leading-[1.2]
    overflow-hidden flex-[0_0_50%]
    flex pl-0 pr-[1.5em] py-0
    lg:basis-1/3
    "
  >
    <span class="bookmark-item-main">
      <Link
        class="
        cursor-pointer font-400 border-none bookmark-item-title
        pt-4 pb-3 flex-[0_0_auto] items-center
        transition-none text-foreground touch-manipulation
        decoration-none underline underline-offset-[0.17em]
        "
        :to="props.item.link"
        target="_bank"
      >
        <span>{{ props.item.name }}</span>
        <sub class="ml-4 text-foreground/60">{{ props.item.desc }}</sub>
      </Link>
    </span>
  </div>
</template>

<style scoped>
.bookmark-item {
  transition: margin var(--duration) var(--curve);
}

.bookmark-item-main {
  --at-apply: flex flex-col basis-full;
  border-bottom: 1px dotted #ddd;
  transition: var(--transition-out);
}

.bookmark-item:hover .bookmark-item-main {
  border-color: hsl(var(--main));
  transition: var(--transition);
}

.bookmark-item:hover .bookmark-item-title{
  color: hsl(var(--main));
  transition: var(--transition);
}
</style>
