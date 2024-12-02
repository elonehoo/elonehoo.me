<script setup lang="ts">

</script>

<template>
  <CraftBox>
    <div class="system">
      <div class="glass" />
    </div>
  </CraftBox>
</template>

<style scoped>
@property --ay {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
@property --az {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
html, body, div {
  display: grid;
}
body, div {
  place-items: center;
}

div, ::before, ::after {
  grid-area: 1/1;
  aspect-ratio: 1;
}

.system {
  transform-style: preserve-3d;
  rotate: -22.5deg;
}
.system::before, .system::after {
  --p: 0;
  width: 33.3%;
  border-radius: calc(var(--p)*50%);
  transform: rotatey(calc(-1*var(--ay))) translate(275%) rotatey(var(--ay)) rotate(calc(var(--az) - 45deg));
  background: hsl(113, calc(var(--p)*81%), calc((1 - var(--p)/3)*100%));
  animation: ay 6s ease-in-out infinite, az 3s ease-in-out infinite;
  animation-delay: calc(var(--p)*-1*3s);
  content: "";
}
.system::after {
  --p: 1 ;
}

@keyframes ay {
  50% {
    --ay: .5turn ;
  }
  100% {
    --ay: 1turn ;
  }
}
@keyframes az {
  to {
    --az: 1turn ;
  }
}
.glass {
  width: min(10em, 50vmin);
  border-radius: 50%;
  box-shadow: inset 0 3px 2px currentcolor;
  background: currentcolor;
  color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
}
</style>
