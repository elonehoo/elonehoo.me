<script setup lang="ts">
import { InfoRoot } from 'destyler'
import PageMore from './PageMore.vue'
import PageProjectItem from './PageProjectItem.vue'
</script>

<template>
  <div aria-label="Project List">
    <!-- title tag -->
    <div class="z-102 sticky pointer-events-none top-[calc(0.7rem_-_2px)] text-xs flex w-full justify-between items-center select-none">
      <InfoRoot class="bg-dark border rounded-sm border-b-0.2rem border-b-main text-light px-0.35rem py-0.2rem">
        elonehoo.me
        <code>
          -
        </code>
        <em>聚焦的开源项目</em>
      </InfoRoot>
    </div>
    <div>
      <ul class="p-0 m-0 [counter-reset:jobnb]">
        <!-- item -->
        <PageProjectItem v-for="i in 4" :key="i" />
      </ul>
    </div>
    <PageMore title="看看更多的开源项目" desc="咻咪～" />
  </div>
</template>
