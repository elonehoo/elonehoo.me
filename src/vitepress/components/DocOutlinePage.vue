<script setup lang="ts">
import { PageBack, PageDuration, PageTime } from '../../core'
import Outline from './Outline.vue'
import TurnPage from './TurnPage.vue'
</script>

<template>
  <section
    class="page
    order-3 flex-[1_1_15%] border-x border-x-dotted border-x-border
    [background-size:var(--pattern-size)] [background-image:var(--pattern-bg)]
    relative [padding:calc(var(--h-margin)_*_2)_calc(var(--h-margin)_*_1.5)]
    "
  >
    <div class="fixed">
      <Outline />
      <PageTime />
      <PageDuration />
      <TurnPage />
      <PageBack />
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 900px) {
  .page {
    --at-apply: w-full text-base m-0 border-[none];
    padding: var(--h-margin) calc(var(--h-margin)* 1.2) 0;
    border-top: var(--standard-border);
  }
}
</style>
