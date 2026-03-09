<script setup lang="ts">

</script>

<template>
  <CraftBox class="h-80!">
    <div class="assembly follow_one" style="--n: 12">
      <div
        v-for="i in 12"
        :key="i"
        class="dot follow_one"
        :style="`--i: ${12 - i}`"
      />
    </div>
  </CraftBox>
</template>

<style scoped>
.follow_one, :after {
  --pos: ;
  --off: ;
  --k: calc(1 - var(--j));
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform-style: preserve-3d;
  animation: r 2s linear infinite;
}
.assembly {
  --j: 0;
  box-sizing: border-box;
  margin: -6.125em;
  border: solid 0.6875em #333;
  width: 12.25em;
  height: 12.25em;
  box-shadow: 0 0 0 0.4296875em #f8f8f8, inset 0 0 0 0.4296875em #f8f8f8;
  animation-duration: calc(.5*var(--n)*2s);
}
.dark .assembly {
  border: solid 0.6875em #ddd;
  box-shadow: 0 0 0 0.4296875em #1c1c1c, inset 0 0 0 0.4296875em #1c1c1c;
}
.dot {
  --j: 1;
  --pos: rotate(calc(var(--i)*1turn/var(--n))) translate(7.78125em);
  --off: translate(2.75em);
  transform: var(--pos) rotate3d(0, var(--j), var(--k), 0deg) var(--off);
  animation-direction: reverse;
  animation-delay: calc(var(--i)*-2s/var(--n));
}
.dot:after {
  margin: -0.6875em;
  width: 1.375em;
  height: 1.375em;
  box-shadow: 0 0 0 0.4296875em #f8f8f8;
  background: #333;
  animation-delay: inherit;
  content: '';
}
.dark .dot:after {
  box-shadow: 0 0 0 0.4296875em #1c1c1c;
  background: #ddd;
}
@keyframes r {
  0% {
   transform: var(--pos) rotate3d(0, var(--j), var(--k), 1turn) var(--off);
 }
}
</style>
