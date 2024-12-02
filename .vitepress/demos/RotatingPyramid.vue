<script setup lang="ts">

</script>

<template>
  <CraftBox>
    <div class="rotating-pyramid-loader">
      <div class="rotating-pyramid-wrapper">
        <span class="rotating-pyramid-side rotating-pyramid-side1" />
        <span class="rotating-pyramid-side rotating-pyramid-side2" />
        <span class="rotating-pyramid-side rotating-pyramid-side3" />
        <span class="rotating-pyramid-side rotating-pyramid-side4" />
        <span class="rotating-pyramid-shadow" />
      </div>
    </div>
  </CraftBox>
</template>

<style scoped>
.rotating-pyramid-loader {
  --at-apply: relative w-[300px] h-[300px] block;
  transform-style: preserve-3d;
  transform: rotateX(-20deg);
}

.rotating-pyramid-wrapper {
  --at-apply: relative w-full h-full animate-[rotating-pyramid-spin_4s_linear_infinite];
  transform-style: preserve-3d;
}
@keyframes rotating-pyramid-spin {
  100% {
    transform: rotateY(360deg);
  }
}
.rotating-pyramid-loader .rotating-pyramid-wrapper .rotating-pyramid-side {
  --at-apply: w-[70px] h-[70px] absolute origin-[center_top] m-auto inset-0;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
.rotating-pyramid-loader .rotating-pyramid-wrapper .rotating-pyramid-side1 {
  transform: rotateZ(-30deg) rotateY(90deg);
  background: conic-gradient(#2bdeac, #f028fd, #d8cce6, #2f2585);
}
.rotating-pyramid-loader .rotating-pyramid-wrapper .rotating-pyramid-side2 {
  transform: rotateZ(30deg) rotateY(90deg);
  background: conic-gradient(#2f2585, #d8cce6, #f028fd, #2bdeac);
}
.rotating-pyramid-loader .rotating-pyramid-wrapper .rotating-pyramid-side3 {
  transform: rotateX(30deg);
  background: conic-gradient(#2f2585, #d8cce6, #f028fd, #2bdeac);
}
.rotating-pyramid-loader .rotating-pyramid-wrapper .rotating-pyramid-side4 {
  transform: rotateX(-30deg);
  background: conic-gradient(#2bdeac, #f028fd, #d8cce6, #2f2585);
}
.rotating-pyramid-loader .rotating-pyramid-wrapper .rotating-pyramid-shadow {
  --at-apply: w-[60px] h-[60px] absolute blur-md m-auto inset-0;
  background: #8b5ad5;
  transform: rotateX(90deg) translateZ(-40px);
}
</style>
