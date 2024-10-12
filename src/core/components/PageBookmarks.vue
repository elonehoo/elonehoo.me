<script setup lang="ts">
import PageBookmarksList from './PageBookmarksList.vue'
import PageProjectList from './PageProjectList.vue'
</script>

<template>
  <section
    class="
    order-3 flex-[1_1_15%] border-x border-x-dotted border-x-border
    [background-size:var(--pattern-size)] [background-image:var(--pattern-bg)]
    h-auto relative [padding:calc(var(--h-margin)_*_2)_calc(var(--h-margin)_*_1.5)]
    "
  >
    <div class="pre">
      <!-- bookmark -->
      <PageBookmarksList />
      <!-- project -->
      <PageProjectList class="mt-[calc(2_*_var(--h-margin))]" />
    </div>
  </section>
</template>
