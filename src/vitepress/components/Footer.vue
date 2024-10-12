<script setup lang="ts">
import { Link } from 'destyler'
import { useConfig } from '../composables/config'

const { config } = useConfig()
</script>

<template>
  <footer
    class="
    footer text-center ml-[var(--nav-width)] text-sm
    leading-[1.7] h-24 relative mt-auto pt-[2em] pb-[3em] px-0
    text-foreground/60 border-t border-t-dotted border-t-border
    [background-size:var(--pattern-size)] [background-image:var(--pattern-bg)]"
  >
    <div>
      <Link :to="config.footer?.license?.link" class="mr-1">
        {{ config.footer?.license?.text }}
      </Link>
      <span>{{ config.footer?.copyright }}</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  animation: slowShow calc(3* var(--duration)) var(--curve) calc(.8* var(--duration)) both;
}
@keyframes slowShow {
    0% {
        opacity: 0
    }

    100% {
        opacity: 1
    }
}
</style>
