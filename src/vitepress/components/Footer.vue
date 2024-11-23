<script setup lang="ts">
import { Link } from 'destyler'
import { useConfig } from '../composables/config'

const { config } = useConfig()
</script>

<template>
  <footer
    class="footer"
  >
    <div>
      <Link
        :to="config.footer?.license?.link"
        class="
        mr-1 cursor-pointer underline decoration-dotted
        hover:text-main!
        "
      >
        {{ config.footer?.license?.text }}
      </Link>
      <span>{{ config.footer?.copyright }}</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  --at-apply:
    text-center ml-[var(--nav-width)] text-sm
    leading-[1.7] h-24 relative mt-auto pt-[2em] pb-[3em] px-0
    text-foreground/60 border-t border-t-dotted border-t-border
    [background-size:var(--pattern-size)] [background-image:var(--pattern-bg)];
  animation: slowShow calc(3* var(--duration)) var(--curve) calc(.8* var(--duration)) both;
}
@media (max-width: 900px) {
    .footer {
      --at-apply: block mt-4;
    }
}
</style>
