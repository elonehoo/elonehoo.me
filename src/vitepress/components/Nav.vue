<script setup lang="ts">
import { Link } from 'destyler'
import { useConfig } from '../composables/config'
import NavGroup from './NavGroup.vue'
import NavItem from './NavItem.vue'

const { config } = useConfig()
</script>

<template>
  <aside class="nav-aside px-6 py-2 h-full w-[--nav-width] border-r border-r-dotted border-r-border text-foreground/60 fixed overflow-auto text-sm">
    <div>
      <!-- logo -->
      <div class="w-full my-[1em] pt-[2em] pb-[1em]">
        <Link to="/" class="block w-full h-full text-center">
          <!-- <Logo class="w-130px h-110px" /> -->
          logo
        </Link>
      </div>
      <!-- nav -->
      <nav class="select-none mb-[3em]">
        <ul class="flex flex-col m-0 p-0 [list-style:none]">
          <!-- item -->
          <template v-for="nav in config.nav" :key="nav.text">
            <NavItem v-if="'link' in nav" :item="nav" />
            <NavGroup v-else :item="nav" />
          </template>
        </ul>
      </nav>
    </div>
  </aside>
  <div class="hidden mobile-header">
    <Link to="/" class="mobile-title">
      <em>elonehoo.me</em>
    </Link>
  </div>
</template>

<style scoped>
.nav-aside {
  scrollbar-width: none;
  transition: background-color var(--duration) var(--curve), border-color var(--duration) var(--curve), filter var(--duration) var(--curve);
}

@media (max-width: 900px) {
  .mobile-header {
    --at-apply:
      w-full h-10 fixed z-[9999] [transition:var(--transition)]
      flex justify-between items-center left-0 -top-px;
    background: hsl(var(--main));
  }
}

@media (max-width: 1070px) {
  .nav-aside {
    --at-apply: text-xs;
  }
}

@media (max-width: 900px) {
  .nav-aside {
    transition: var(--transition-out);
    --at-apply:
      select-none block w-[101vw] h-screen
      z-[199] text-base p-0 left-0 top-0
      [translate:35%] [scale:0.8];
  }
}
@media (max-width: 900px) {
  .nav-aside {
    --at-apply: fixed pointer-events-none opacity-0;
    contain: layout;
  }
}

@media (max-width: 900px) {
  .mobile-title {
    --at-apply:
      flex-auto h-full text-left flex justify-start
      items-center no-underline mr-12;
  }
}

@media (max-width: 900px) {
    .mobile-title em {
      --at-apply:
        font-bold text-primary-foreground text-[1.1rem] relative;
    }
}
</style>
