<script setup lang="ts">
const props = defineProps<{
  phonetic?: string

}>()
</script>

<template>
  <span class="phonetic" :style="{ '--phonetic': `'${props.phonetic}'` }">
    <slot />
  </span>
</template>

<style scoped>
.phonetic{
  position: relative;
}

.phonetic::before {
    content: var(--phonetic);
    display: flex;
    font-weight: 300;
    font-size: .75em;
    color: hsl(var(--main));
    opacity: var(--hover-op);
    position: absolute;
    left: 0;
    top: -1.7rem;
    width: 100%;
    text-align: center;
    justify-content: center;
    transition: var(--transition-out);
    translate: 0 .5em;
    scale: .8;
}
</style>
