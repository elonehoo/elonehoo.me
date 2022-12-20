<script setup lang="ts">
</script>

<template>
  <div>
    <div class="prose m-auto mb-8">
      <h1 class="mb-0">
        {{ $frontmatter.title }}
      </h1>
    </div>
    <Content class="prose content m-auto" />
  </div>


</template>

<style scoped>
.prose h1 {
    color: var(--fg-deeper);
    font-weight: 800;
    font-size: 2.25em;
    margin-top: 0;
    margin-bottom: 0.8888889em;
    line-height: 1.1111111;
}
</style>
