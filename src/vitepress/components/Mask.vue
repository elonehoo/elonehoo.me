<script setup lang="ts">

</script>

<template>
  <!-- top -->
  <div class="mask top-0 h-3 w-full left-0" />
  <!-- bottom -->
  <div class="mask bottom-0 h-3 w-full left-0" />
  <!-- right -->
  <div class="mask w-3 h-80vh right-0 top-0" />
  <div class="mask w-3 h-80vh right-0 bottom-0" />
  <!-- left -->
  <div class="mask w-3 h-80vh left-0 top-0" />
  <div class="mask w-3 h-80vh left-0 bottom-0" />
</template>

<style scoped>
.mask {
  --at-apply: fixed z-999 bg-main pointer-events-none border-[0.35rem] border-solid border-main;
}
</style>
