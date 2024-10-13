<script setup lang="ts">
import { data as notes } from '../data/notes.data'
import PageMore from './PageMore.vue'
import PageNoteItem from './PageNoteItem.vue'
import PageTitleTag from './PageTitleTag.vue'
</script>

<template>
  <section
    class="order-4 flex-[1_1_20%] h-auto relative
    [padding:calc(var(--h-margin)_*_2)_calc(var(--h-margin)_*_1.5)]"
  >
    <!-- title -->
    <PageTitleTag title="随笔" />
    <!-- item -->
    <PageNoteItem v-for="i in notes" :key="i.url" :item="i" />
    <PageMore title="看看更多的随笔" desc="咕噜～" />
  </section>
</template>
