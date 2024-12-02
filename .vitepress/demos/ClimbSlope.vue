<script setup lang="ts">

</script>

<template>
  <CraftBox>
    <div class="climb-slope" />
  </CraftBox>
</template>

<style scoped>
.climb-slope {
  --at-apply: relative text-base w-[5.5em] h-[5.5em] before:content-[''] before:absolute before:-translate-x-2/4 before:-translate-y-2/4 before:rotate-45 before:h-full before:w-1 before:left-2/4 before:top-2/4 after:content-[''] after:absolute after:w-[1em] after:h-[1em] after:bg-[orange] after:animate-[rollingRock_2.5s_cubic-bezier(.79,0,0.47,0.97)_infinite] after:rounded-[15%] after:left-[0.2em] after:bottom-[0.18em];
}
.climb-slope:before {
  background: #000;
}
.dark .climb-slope:before {
  background: #fff;
}

@keyframes rollingRock {
  0% {
    transform: translate(0, -1em) rotate(-45deg)
  }

  5% {
    transform: translate(0, -1em) rotate(-50deg)
  }

  20% {
    transform: translate(1em, -2em) rotate(47deg)
  }

  25% {
    transform: translate(1em, -2em) rotate(45deg)
  }

  30% {
    transform: translate(1em, -2em) rotate(40deg)
  }

  45% {
    transform: translate(2em, -3em) rotate(137deg)
  }

  50% {
    transform: translate(2em, -3em) rotate(135deg)
  }

  55% {
    transform: translate(2em, -3em) rotate(130deg)
  }

  70% {
    transform: translate(3em, -4em) rotate(217deg)
  }

  75% {
    transform: translate(3em, -4em) rotate(220deg)
  }

  100% {
    transform: translate(0, -1em) rotate(-225deg)
  }
}
</style>
