<script setup lang="ts">
import { data as bookmark } from '@/bookmark.data'
import { computed } from 'vue'
import PageBookmarkItem from './PageBookmarkItem.vue'
import PageTitleTag from './PageTitleTag.vue'

const items = computed(() => bookmark[0].bookmarks['Current Focus'])
</script>

<template>
  <div aria-label="Bookmarks List">
    <!-- title tag -->
    <PageTitleTag title="常用书签" />
    <!-- content -->
    <div>
      <ul class="p-0 m-0 [counter-reset:jobnb]">
        <PageBookmarkItem v-for="i in items" :key="i.link" :item="i" />
      </ul>
    </div>
  </div>
</template>
