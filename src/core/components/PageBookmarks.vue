<script setup lang="ts">
import PageBookmarksList from './PageBookmarksList.vue'
import PageProjectList from './PageProjectList.vue'
</script>

<template>
  <ClientOnly>
    <section
      class="
    order-3 flex-[1_1_15%] border-x border-x-dotted border-x-border page-bookmarks
    [background-size:var(--pattern-size)] [background-image:var(--pattern-bg)]
    h-auto relative [padding:calc(var(--h-margin)_*_2)_calc(var(--h-margin)_*_1.5)]
    "
    >
      <div class="pre sticky top-[calc(1.5_*_var(--h-margin)_+_0.6rem)]">
        <!-- bookmark -->
        <PageBookmarksList />
        <!-- project -->
        <PageProjectList class="mt-[calc(2_*_var(--h-margin))]" />
      </div>
    </section>
  </ClientOnly>
</template>

<style scoped>
.page-bookmarks {
  animation-delay: calc(.4 * var(--duration)) !important;
  animation: right-in calc(2 * var(--duration)) var(--curve) calc(.75* var(--duration)) both;
}
</style>
