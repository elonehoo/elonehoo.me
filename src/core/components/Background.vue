<script setup lang="ts">

</script>

<template>
  <div class="p-4 py-10 background md:p-12 min-h-screen z--10">
    <div class="justify-between md:flex animate-in fade-in duration-500">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.background {
  background-image: linear-gradient(90deg, #ffffff, rgba(255, 255, 255, .83)), url(/noise.svg), linear-gradient(hsl(var(--theme-action)) 1px, transparent 0), linear-gradient(90deg, hsl(var(--theme-action)) 1px, #fff 0);
  background-size: auto, auto, 20px 20px, 20px 20px;
}

.dark .background {
  background-image: linear-gradient(90deg, #101010, rgba(0, 0, 0, .83)), url(/noise.svg), linear-gradient(hsl(var(--theme-action)) 1px, transparent 0), linear-gradient(90deg, hsl(var(--theme-action)) 1px, #000 0);
  background-size: auto, auto, 20px 20px, 20px 20px;
}
</style>
