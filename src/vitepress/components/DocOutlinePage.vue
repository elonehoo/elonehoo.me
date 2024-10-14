<script setup lang="ts">
import Outline from './Outline.vue'
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
    </div>
  </section>
</template>
