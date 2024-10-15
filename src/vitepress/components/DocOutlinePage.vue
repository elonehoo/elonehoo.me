<script setup lang="ts">
import { PageDivider, PageDuration, PageTime } from '../../core'
import Outline from './Outline.vue'
import TurnPage from './TurnPage.vue'
</script>

<template>
  <section
    class="
    order-3 flex-[1_1_15%] border-x border-x-dotted border-x-border
    [background-size:var(--pattern-size)] [background-image:var(--pattern-bg)]
    relative [padding:calc(var(--h-margin)_*_2)_calc(var(--h-margin)_*_1.5)]
    "
  >
    <div class="fixed">
      <Outline />
      <PageDivider />
      <PageTime />
      <PageDuration />
      <TurnPage />
    </div>
  </section>
</template>
