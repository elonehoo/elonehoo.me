<script setup lang="ts">

</script>

<template>
  <CraftBox>
    <div class="relative flex h-full w-full flex-col items-center justify-center transition-bg">
      <div class="absolute inset-0 overflow-hidden">
        <div class="jumbo absolute -inset-[10px] opacity-50" />
      </div>
    </div>
  </CraftBox>
</template>

<style scoped>
@keyframes jumbo {
    from {
        background-position: 50% 50%, 50% 50%;
    }
    to {
        background-position: 350% 50%, 350% 50%;
    }
}

.jumbo {
    --stripes: repeating-linear-gradient(
        100deg,
        #fff 0%,
        #fff 7%,
        transparent 10%,
        transparent 12%,
        #fff 16%
    );
    --stripesDark: repeating-linear-gradient(
        100deg,
        #000 0%,
        #000 7%,
        transparent 10%,
        transparent 12%,
        #000 16%
    );
    --rainbow: repeating-linear-gradient(
        100deg,
        #60a5fa 10%,
        #e879f9 15%,
        #60a5fa 20%,
        #5eead4 25%,
        #60a5fa 30%
    );
    background-image: var(--stripes), var(--rainbow);
    background-size: 300%, 200%;
    background-position: 50% 50%, 50% 50%;

    filter: blur(10px) invert(100%);

    mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);

    pointer-events: none;
}

.jumbo::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--stripes), var(--rainbow);
    background-size: 200%, 100%;
    animation: jumbo 60s linear infinite;
    background-attachment: fixed;
    mix-blend-mode: difference;
}

.dark .jumbo {
    background-image: var(--stripesDark), var(--rainbow);
    filter: blur(10px) opacity(50%) saturate(200%);
}
.dark .jumbo::after {
    background-image: var(--stripesDark), var(--rainbow);
}
</style>
