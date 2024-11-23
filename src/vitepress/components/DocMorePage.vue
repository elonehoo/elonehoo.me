<script setup lang="ts">
import { usePageType } from '../composables/pageType'
import DocMoreBlogPage from './DocMoreBlogPage.vue'
import DocMoreNotesPage from './DocMoreNotesPage.vue'

const { isNotes, isPost } = usePageType()
</script>

<template>
  <section
    class="page-doc-more order-4 flex-[1_1_20%] h-auto relative overflow-hidden
    pt-[calc(var(--h-margin)_*_1)]! pb-[calc(var(--h-margin)_*_2)]!
    "
  >
    <div class="fixed overflow-y-auto h-88%">
      <template v-if="isPost">
        <DocMoreBlogPage />
      </template>
      <template v-else-if="isNotes">
        <div class="px-[calc(var(--h-margin)_*_2)]">
          <DocMoreNotesPage />
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 900px) {
  .page-doc-more {
    --at-apply: m-0;
    padding: var(--h-margin) calc(var(--h-margin)* 1.2) 0 !important;
  }
}

@media (max-width: 1250px) {
  .page-doc-more {
    --at-apply:
      flex-[1_0_90%] [border-top:var(--standard-border)] [border-left:none];
    padding: var(--h-margin) calc(1.5* var(--h-margin)) var(--h-margin) 0;
  }
}
</style>
