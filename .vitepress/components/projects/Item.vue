<script setup lang="ts">
import { Link } from 'destyler'

export interface ProjectItem {
  name: string
  link: string
  desc: string
  icon?: string
  license?: {
    type: string
    link: string
  }
}
/**
- name: 'Destyler'
  link: 'https://github.com/destyler/destyler'
  desc: 'Vue.js 的无样式组件库'
  icon: '/projects/destyler-packages.png'
  license:
    - type: 'MIT'
      link: 'https://github.com/destyler/destyler/blob/main/LICENSE'
 */

const props = defineProps<{
  item: ProjectItem
}>()
</script>

<template>
  <div
    class="
    project-item
    text-1.14em leading-[1.2]
    overflow-hidden flex-[0_0_50%]
    flex pl-0 pr-[1.5em] py-0
    lg:basis-1/3
    "
  >
    <span class="project-item-main">
      <Link
        class="
        cursor-pointer font-400 border-none project-item-title
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
.project-item {
  transition: margin var(--duration) var(--curve);
}

.project-item-main {
  --at-apply: flex flex-col basis-full;
  border-bottom: 1px dotted #ddd;
  transition: var(--transition-out);
}

.project-item:hover .project-item-main {
  border-color: hsl(var(--main));
  transition: var(--transition);
}

.project-item:hover .project-item-title{
  color: hsl(var(--main));
  transition: var(--transition);
}
</style>
