<script setup lang="ts">
function scrollTop() {
  document.documentElement.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <div
    class="
    flex items-center gap-x-0.5 w-fit text-gray-8 text-sm
     px-1.5 py-1 rounded-sm text-gray-1 dark:text-gray-12
    bg-action/80 hover:bg-action
    dark:bg-action dark:hover:bg-action/50
    font-medium cursor-pointer after:bg-transparent!"
    @click="scrollTop"
  >
    Back to Top
  </div>
</template>
