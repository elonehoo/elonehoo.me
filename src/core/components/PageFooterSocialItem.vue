<script setup lang="ts">
import type { SocialLink } from '../types/socialLink'
import { Link } from 'destyler'

import GitHub from './icones/GitHub.vue'
import Instagram from './icones/Instagram.vue'
import Mastodon from './icones/Mastodon.vue'
import Twitter from './icones/Twitter.vue'

const props = defineProps<{
  item: SocialLink
}>()

const icones = {
  GitHub,
  Twitter,
  Instagram,
  Mastodon,
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
      decoration-border hover:decoration-main
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
</style>
