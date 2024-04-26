<script setup lang="ts">

</script>

<template>
  <CraftBox>
    <div class="rotating-cube" />
  </CraftBox>
</template>

<style scoped>
.rotating-cube {
  @apply w-12 h-12 relative m-auto before:content-[''] before:w-12 before:h-[5px] before:absolute before:animate-[rotating-cube-shadow_0.5s_linear_infinite] before:rounded-[50%] before:left-0 before:top-[60px] after:content-[''] after:w-full after:h-full after:absolute after:rounded after:animate-[rotating-cube-jump_0.5s_linear_infinite] after:left-0 after:top-0;
}
.rotating-cube:before {
  background: #f0808050;
}
.rotating-cube:after {
  background: #f08080;
}

@keyframes rotating-cube-jump {
  15% {
    border-bottom-right-radius: 3px;
  }

  25% {
    transform: translateY(9px) rotate(22.5deg);
  }

  50% {
    transform: translateY(18px) scale(1, .9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }

  75% {
    transform: translateY(9px) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes rotating-cube-shadow {

  0%,
    100% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1.2, 1);
  }
}
</style>
