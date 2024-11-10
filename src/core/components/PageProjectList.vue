<script setup lang="ts">
import { computed } from 'vue'
import { data as project } from '@/project.data'
import PageMore from './PageMore.vue'
import PageProjectItem from './PageProjectItem.vue'
import PageTitleTag from './PageTitleTag.vue'

const items = computed(() => project[0].projects['Current Focus'])
</script>

<template>
  <div aria-label="Project List">
    <!-- title tag -->
    <PageTitleTag title="聚焦的开源项目" />
    <div>
      <ul class="p-0 m-0 [counter-reset:jobnb]">
        <!-- item -->
        <PageProjectItem v-for="i in items" :key="i.link" :item="i" />
      </ul>
    </div>
    <PageMore title="看看更多的开源项目" desc="咻咪～" />
  </div>
</template>
