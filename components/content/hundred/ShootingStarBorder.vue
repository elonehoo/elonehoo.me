<script setup lang="ts">

</script>

<template>
  <CraftBox>
    <button class="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
      <span>
        <span class="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
      </span>
      <span class="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-800" />
      <span class="z-10 py-0.5 text-sm text-neutral-100">Get notified</span>
    </button>
  </CraftBox>
</template>

<style scoped>
.before\:bg-\[conic-gradient\(from_0deg\2c transparent_0_340deg\2c white_360deg\)\]:before {
    content: "";
    background-image: conic-gradient(from 0deg,transparent 0 340deg,#fff 1turn);
}
.animate-rotate:before {
    content: "";
    animation: rotate 3s linear infinite both;
}
.animate-flip {
    animation: flip 6s steps(2) infinite;
}
@keyframes flip {
    to {
        transform: rotate(1turn)
    }
}
@keyframes rotate {
    to {
        content: "";
        transform: rotate(90deg)
    }
}
</style>
