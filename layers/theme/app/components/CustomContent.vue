<script setup lang="ts">
defineOptions({
  name: 'Theme.CustomContent',
})
</script>

<template>
  <div class="md:max-w-[550px] flex flex-col md:gap-y-0 gap-y-6 overflow-x-hidden overflow-y-auto scrollbar-hide">
    <slot />
  </div>
</template>
