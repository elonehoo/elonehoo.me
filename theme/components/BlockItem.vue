<script setup lang="ts">
import { Link } from 'destyler'

export interface BlockItem {
  title: string
  lang: string
  url: string
  date: string
  excerpt: string
  time: string
  duration: string
  frontmatter: any
  _idx: number
}

const props = defineProps<{
  item: BlockItem
}>()
</script>

<template>
  <div class="mb-1em text-[1.14em] leading-[1.2] flex-[0_0_50%] flex pr-[1.5em] lg:basis-1/3">
    <div class="mr-[0.5em] flex pt-4 justify-start items-start">
      <div class="item-tag text-3.5 w-[2.65em] flex justify-center items-center text-center font-700 bg-main text-white py-0.25em rounded-md">
        {{ props.item._idx }}
      </div>
    </div>
    <span class="item-content flex flex-col pb-[1em] basis-full">
      <Link
        class="
        font-bold cursor-pointer text-foreground hover:text-main
        items-start border-none flex-[0_0_auto] flex text-foreground
        decoration-none pt-4 pb-3 underline-offset-0.17em
        "
        :to="props.item.url"
      >
        {{ props.item.title }}
      </Link>
      <div
        class="flex-[1_0_auto] mb-1em text-3.5 leading-[1.65] text-foreground/60"
        v-html="props.item.excerpt"
      />
      <div class="item-meta text-foreground/60 flex text-3.5">
        <!-- tag -->
        <span class="item-meta-tag">
          <!-- duration -->
          <span>{{ props.item.duration }}</span>
        </span>
        <!-- date -->
        <span class="inline-block">{{ props.item.time }}</span>
      </div>
    </span>
  </div>
</template>

<style scoped>
.item-tag {
  font-feature-settings: 'tnum';
}

.item-content {
  border-bottom: 1px dotted #ddd;
  transition: var(--transition-out);
}

.item-meta-tag::after {
  content: "▪︎";
  margin: 0 .5em;
  opacity: .25;
}
</style>
