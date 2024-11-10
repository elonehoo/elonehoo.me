<script setup lang="ts">
import type { ProjectItem } from '@/project.data'
import { Link } from 'destyler'

const props = defineProps<{
  item: ProjectItem
}>()
</script>

<template>
  <li class="block [list-style:none] py-[--h-margin] relative text-left border-b border-b-dotted border-b-border">
    <!-- title -->
    <Link
      target="_blank"
      :to="props.item.link"
      class="
      underline decoration-dotted underline-offset-[0.17em]
      font-bold text-foreground z-2 relative leading-[1.3]
      cursor-pointer hover:decoration-solid
      hover:decoration-main hover:text-main!"
    >
      {{ props.item.name }}
    </Link>
    <!-- img -->
    <img :src="props.item.icon" class="max-w-[calc(2em_+_1.2vmax)] float-right ml-[0.8em] rounded-md">
    <!-- desc -->
    <div class="page-project-item-desc">
      {{ props.item.desc }}
    </div>
    <!-- meta -->
    <div class="text-3 font-bold text-main">
      <Link
        target="_blank"
        :to="props.item.license[0].link"
        class="underline cursor-pointer decoration-main decoration-dotted underline-offset-[0.17em] hover:decoration-solid"
      >
        {{ props.item.license[0].type }}
      </Link>
      License
    </div>
  </li>
</template>

<style scoped>
.page-project-item-link {
  --at-apply: cursor-pointer;
  font-size: calc(.8rem + .1vh + .1vw);
  transition: var(--transition-out);
}

.page-project-item-desc {
  --at-apply: text-sm leading-[1.35] text-foreground/60 mt-0.3em mb-0.5em;
  transition: var(--transition-out);
}
</style>
