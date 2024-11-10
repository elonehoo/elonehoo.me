<script setup lang="ts">
import type { Note } from '@/note.data'
import { useRouter } from 'vitepress'

const props = defineProps<{
  item: Note
}>()

const router = useRouter()

function goDetail(url: string) {
  router.go(url)
}
</script>

<template>
  <div
    class="border-b border-b-dotted border-b-border relative
    pt-[--h-margin] pb-[calc(var(--h-margin)_-_1em)] text-sm box"
  >
    <div class="inner grid h-full">
      <!-- title -->
      <h1
        class="title cursor-pointer hover:text-main underline-offset-[0.2em] hover:decoration-solid! hover:decoration-main! text-[calc(.8rem_+_.1vh_+_.1vw)] font-bold leading-[1.26] relative text-foreground [grid-area:title] m-0"
        @click="goDetail(props.item.url)"
      >
        {{ props.item.title }}
      </h1>
      <!-- body -->
      <div
        class="mt-0.5em text-[calc(.75rem_+_.05vh_+_.05vw)] text-foreground/60
        text-left leading-[1.7] relative [grid-area:body] mb-0.5em "
        v-html="props.item.excerpt"
      />
      <!-- footer -->
      <div class="flex flex-row justify-end items-center [grid-area:footer]">
        <!-- meta -->
        <div class="text-xs inline text-foreground/40 leading-normal">
          <div class="inline">
            {{ props.item.time }}
          </div>
          <div class="inline before:content-['·'] before:text-main mx-0.3em">
            {{ props.item.duration }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inner {
  grid-template-areas:
    "title"
    "body"
    "footer";
  grid-template-rows: auto 1fr auto;
}

.title {
  transition: var(--transition-out);
  .box:hover & {
    --at-apply: underline decoration-dotted decoration-border;
    transition: var(--transition);
  }
}
</style>
