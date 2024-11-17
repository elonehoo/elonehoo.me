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
    background: hsl(var(--main));
    width: 100%;
    height: 2.5rem;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: -1px;
    transition: var(--transition);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

@media (max-width: 1070px) {
  .nav-aside {
    font-size: .75rem;
  }
}

@media (max-width: 900px) {
  .nav-aside {
    transition: var(--transition-out);
    --at-apply: select-none block w-[101vw] h-screen z-[199] text-base p-0 left-0 top-0;
    translate: 35%;
    scale: 0.8;
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
      flex: 1 1 auto;
      height: 100%;
      text-align: left;
      margin-right: 3rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-decoration: none;
  }
}

@media (max-width: 900px) {
    .mobile-title em {
        font-weight: 700;
        color:hsl(var(--primary-foreground));
        font-size: 1.1rem;
        position: relative;
    }
}
</style>
