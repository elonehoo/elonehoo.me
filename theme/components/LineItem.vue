<script setup lang="ts">
import { Link } from 'destyler'

export interface LineItem {
  name: string
  link: string
  desc: string
  icon?: string
  license?: {
    type: string
    link: string
  }
}

const props = defineProps<{
  item: LineItem
}>()
</script>

<template>
  <div
    class="
    line-item
    text-1.14em leading-[1.2]
    overflow-hidden flex-[0_0_50%]
    flex pl-0 pr-[1.5em] py-0
    lg:basis-1/3
    "
  >
    <span class="line-item-main">
      <Link
        class="
        cursor-pointer font-400 border-none line-item-title
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
.line-item {
  transition: margin var(--duration) var(--curve);
}

.line-item-main {
  --at-apply: flex flex-col basis-full;
  border-bottom: 1px dotted #ddd;
  transition: var(--transition-out);
}

.line-item:hover .line-item-main {
  border-color: hsl(var(--main));
  transition: var(--transition);
}

.line-item:hover .line-item-title{
  color: hsl(var(--main));
  transition: var(--transition);
}
</style>
