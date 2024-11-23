<script setup lang="ts">
import { useData } from 'vitepress'

const { page } = useData()
</script>

<template>
  <section
    class="order-1 flex-[1_1_40%] pt-[calc(1.5_*_var(--h-margin))] overflow-hidden relative mr-[calc(1.5*_var(--h-margin))] px-0 pl-[calc(var(--h-margin)*2)]"
  >
    <h1 class="doc-page-h1">
      {{ page.title }}
    </h1>
    <Content class="w-full prose-doc" style="margin: .8em auto .5em;" />
  </section>
</template>

<style scoped>
.doc-page-h1 {
  --at-apply:
    font-bold leading-[1.4] relative
    text-foreground border-none
    touch-manipulation;
  font-size: calc(.3vmax + .3vmin + 1.5rem);
  transition: color var(--duration) var(--curve), background-color var(--duration) var(--curve);
}
</style>
