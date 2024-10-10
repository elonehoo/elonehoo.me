<script setup lang="ts">
import { Icon, Link } from 'destyler'
</script>

<template>
  <Link
    class="
    nav-item no-underline flex items-center leading-none
    hover:text-main cursor-pointer touch-manipulation
    px-0 py-[0.8rem] border-0
    "
  >
    <Icon class="w-[1.25em] h-[1.25em] relative" name="carbon:home" />
    <span class="leading-[1.5em] h-[1.5em] pl-[0.4em] pr-[0.5em] py-0">关于我们</span>
  </Link>
</template>

<style scoped>
.nav-item {
  transition: var(--transition-out);
  --c-border: hsl(var(--foreground) / 0.6);
}

.nav-item:hover {
  transition: var(--transition);
  --c-border: hsl(var(--main));
}

.nav-item::after {
  --at-apply: grow inline-block h-px ml-[0.2em] border-b border-dotted;
  border-color: var(--c-border) !important;
  content: "";
  transition: var(--transition);
}
</style>
