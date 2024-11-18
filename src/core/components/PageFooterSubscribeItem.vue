<script setup lang="ts">
import type { SubscribeLink } from '../types/subscribeLink'
import { Link } from 'destyler'
import Follow from './icones/Follow.vue'

import Signal from './icones/Signal.vue'

const props = defineProps<{
  item: SubscribeLink
}>()

const icones = {
  Follow,
  RSS: Signal,
}
</script>

<template>
  <li>
    <Link
      :to="props.item.link"
      target="_blank"
      class="
      page-footer-item
      flex items-center mb-0.5em cursor-pointer text-foreground/60
      underline decoration-dotted hover:decoration-solid
      hover:decoration-main
      "
    >
      <component :is="icones[props.item.icon]" class="w-[1.2em] h-[1.2em] mr-[0.3em]" />
      <span>
        {{ props.item.icon }}
      </span>
    </Link>
  </li>
</template>

<style scoped>
.page-footer-item {
  transition: var(--transition-out);
  --c-border: hsl(var(--foreground) / 0.6);
}

.page-footer-item:hover {
  transition: var(--transition);
  --c-border: hsl(var(--main));
}
@media (max-width: 1070px) {
  .page-footer-item  {
      display: inline-flex;
      margin-right: 1em;
  }
}
</style>
