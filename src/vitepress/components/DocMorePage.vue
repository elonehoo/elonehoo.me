<script setup lang="ts">
import { usePageType } from '../composables/pageType'
import DocMoreBlogPage from './DocMoreBlogPage.vue'
import DocMoreNotesPage from './DocMoreNotesPage.vue'

const { isNotes, isPost } = usePageType()
</script>

<template>
  <section
    class="order-4 flex-[1_1_20%] h-100% relative overflow-hidden
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
