<script setup lang="ts">
import { InfoRoot } from 'destyler'
import PageBookmarkItem from './PageBookmarkItem.vue'
</script>

<template>
  <div aria-label="Bookmarks List">
    <!-- title tag -->
    <div class="z-102 sticky pointer-events-none top-[calc(0.7rem_-_2px)] text-xs flex w-full justify-between items-center select-none">
      <InfoRoot class="bg-dark border rounded-sm border-b-0.2rem border-b-main text-light px-0.35rem py-0.2rem">
        elonehoo.me
        <code>
          -
        </code>
        <em>常用书签</em>
      </InfoRoot>
    </div>
    <!-- content -->
    <div>
      <ul class="p-0 m-0 [counter-reset:jobnb]">
        <PageBookmarkItem v-for="i in 5" :key="i" />
      </ul>
    </div>
  </div>
</template>
