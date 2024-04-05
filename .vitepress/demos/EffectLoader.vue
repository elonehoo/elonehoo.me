<script setup lang="ts">
</script>

<template>
  <CraftBox>
    <svg class="svg">
      <path class="path" />
    </svg>
    <svg>
      <path />
    </svg>
  </CraftBox>
</template>

<style scoped>
.svg {
  position: absolute;
  width: 400px;
  fill: none;
  margin-top: -60px;
}

.svg {
  filter: blur(40px);
}

.svg path {
  d: path("M0,25 C150,110 150, -60 300,25");
  stroke: #00ff00;
  stroke-width: 50;
  stroke-linecap: round;
  transform: translate(50px,50%);
  animation: effect-loader-animate 2s ease-in-out infinite;
}

@keyframes effect-loader-animate {
  0% {

    stroke: dodgerblue;
    stroke: #00ff00;
    d: path("M0,25 C150,110 150, -60 300,25");
  }

  50% {
    stroke: greenyellow;
    stroke: #ff0092;
    d: path("M0,25 C160,-50 140, 110 300,25");
  }
}
</style>
