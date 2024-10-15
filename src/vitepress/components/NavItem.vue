<script setup lang="ts">
import type { NavItemWithLink } from '../config'
import { Link } from 'destyler'
import { About, Blog, Bookmarks, Gallery, Note, Project, Talk, Video } from '../../core'

const props = defineProps<{
  item: NavItemWithLink
}>()

const icones = {
  about: About,
  bookmarks: Bookmarks,
  gallery: Gallery,
  blog: Blog,
  project: Project,
  video: Video,
  note: Note,
  talk: Talk,
}
</script>

<template>
  <li class="order-2">
    <Link
      :to="props.item.link"
      class="
      nav-item no-underline flex items-center leading-none
      hover:text-main cursor-pointer touch-manipulation
      px-0 py-[0.8rem] border-0
      "
    >
      <component :is="icones[props.item.icon]" v-if="props.item.icon" class="w-[1.25em] h-[1.25em] relative" />
      <span class="leading-[1.5em] h-[1.5em] pl-[0.4em] pr-[0.5em] py-0">{{ props.item.text }}</span>
    </Link>
  </li>
</template>

<style scoped>
.nav-item {
  transition: var(--transition-out);
  --c-border: hsl(var(--foreground) / 0.6);
}

.nav-item:hover {
  transition: var(--transition);
  --c-border: hsl(var(--main));
}

.nav-item::after {
  --at-apply: grow inline-block h-px ml-[0.2em] border-b border-b-dotted;
  border-color: var(--c-border) !important;
  content: "";
  transition: var(--transition);
}
</style>
