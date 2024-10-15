<script setup lang="ts">
function goBack() {
  window.history.back()
}
</script>

<template>
  <div class="box text-sm text-foreground/55 cursor-default cursor-pointer my-1.5 hover:text-main">
    <span class="link" @click="goBack">
      返回上一级
    </span>
  </div>
</template>

<style scoped>
.box {
  transition: var(--transition-out);
}

.box:hover {
  transition: var(--transition);
}

.link {
  transition: var(--transition-out);
  .box:hover & {
    --at-apply: hover:border-b hover:border-b-solid hover:border-b-main;
    transition: var(--transition);
  }
}
</style>
