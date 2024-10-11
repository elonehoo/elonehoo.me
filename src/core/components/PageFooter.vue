<script setup lang="ts">
</script>

<template>
  <div class="home-page">
    <div/>
  </div>
</template>

<style scoped>
.home-page::before {
  --at-apply: text-foreground text-[10vw] absolute bottom-[-0.25em] font-bold opacity-[0.06] leading-none left-[1em];
  content: "elonehoo.me";
  animation: footer-show 1s ease-in-out;
  animation-timeline: scroll(root);
  user-select: none;
  pointer-events: none;
}

@keyframes footer-show {
  0% {
    opacity: 0
  }
  67% {
    opacity: 0;
    translate: .5em 0;
    letter-spacing: .1em
  }
  100% {
    opacity: .06;
    translate: none;
    letter-spacing: 0
  }
}
</style>
