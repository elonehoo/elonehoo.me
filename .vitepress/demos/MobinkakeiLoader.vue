<script setup lang="ts">
</script>

<template>
  <CraftBox>
    <div class="w-[150px] h-[150px] relative flex items-center justify-center">
      <div class="mobinkakei-loader mobinkakei-loader-color" />
      <div class="mobinkakei-loader mobinkakei-loader-glowing" />
    </div>
  </CraftBox>
</template>

<style scoped>
.mobinkakei-loader {
  --at-apply: absolute w-full h-full rounded-[30px];
}
.mobinkakei-loader-glowing {
  --at-apply: z-[2] bg-[rgba(255,255,255,0.2)] border-2 border-solid border-[rgba(0,0,0,0.3)] dark:border-[rgba(255,255,255,0.3)];
}
.mobinkakei-loader-color {
  --at-apply: z-[1] blur-[2px] animate-[mobinkakei-loader-animation_2.5s_ease-in-out_infinite];
  background: linear-gradient(135deg, #1afbf0, #da00ff);
}

@keyframes mobinkakei-loader-animation {
  50% {
    transform: rotate(-80deg);
  }
}
</style>
