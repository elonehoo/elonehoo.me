<script setup lang="ts">

</script>

<template>
  <CraftBox>
    <div class="absolute left-1/2 top-1/2">
      <b
        v-for="i in 15"
        :key="i"
        class="absolute block rotate-[-10deg] rounded-1/20"
        :style="{
          width: `${i * 10}px`,
          height: `${i * 10}px`,
          left: `-${i * 5}px`,
          top: `-${i * 5}px`,
          filter: `blur(${i * 0.15}px)`,
          boxShadow: `0 0 ${i * 1}px var(--color-wiggle)`,
          animation: `wiggle 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95) ${50 * i}ms infinite alternate`,
        }"
      />
    </div>
  </CraftBox>
</template>

<style>
.dark:root{
  --color-wiggle: rgba(255, 255, 255, 0.5);
}
:root {
  --color-wiggle: rgba(0, 0, 0, 0.9);
}
@keyframes wiggle {
  0% {
    transform: rotate(-10deg);
 }
  100% {
    transform: rotate(10deg);
 }
}
</style>
