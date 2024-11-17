<script setup lang="ts">
import { data as notes } from '@/note.data'
import PageMore from './PageMore.vue'
import PageNoteItem from './PageNoteItem.vue'
import PageTitleTag from './PageTitleTag.vue'
</script>

<template>
  <ClientOnly>
    <section
      class="order-4 flex-[1_1_20%] h-auto relative page-notes
    [padding:calc(var(--h-margin)_*_2)_calc(var(--h-margin)_*_1.5)]"
    >
      <div class="sticky top-[calc(1.5_*_var(--h-margin)_+_0.6rem)]">
        <!-- title -->
        <PageTitleTag title="随笔" />
        <!-- item -->
        <PageNoteItem v-for="i in notes" :key="i.url" :item="i" />
        <PageMore title="看看更多的随笔" desc="咕噜～" to="/notes" />
      </div>
    </section>
  </ClientOnly>
</template>

<style scoped>
.page-notes {
  animation: right-in calc(2* var(--duration)) var(--curve) calc(.75* var(--duration)) both;
}
@media (max-width: 1250px) {
  .page-notes {
    flex: 1 0 90%;
    border-left: none;
    border-top: var(--standard-border);
    padding: var(--h-margin) calc(1.5* var(--h-margin)) var(--h-margin) 0;
  }
}
</style>
