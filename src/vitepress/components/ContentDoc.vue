<script setup lang="ts">
import DocMorePage from './DocMorePage.vue'
import DocOutlinePage from './DocOutlinePage.vue'
import DocPage from './DocPage.vue'
</script>

<template>
  <div class="content-doc flex pl-[calc(var(--h-margin)*2)] flex-wrap items-stretch pr-0 pt-0">
    <DocPage />
    <DocOutlinePage />
    <DocMorePage />
  </div>
</template>

<style scoped>
@media (max-width: 900px) {
    .content-doc {
      --at-apply: block mt-8 mb-0 mx-0 p-0;
    }
}
</style>
