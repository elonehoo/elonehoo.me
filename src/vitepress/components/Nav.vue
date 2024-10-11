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
</template>

<style scoped>
.nav-aside {
  scrollbar-width: none;
  transition: background-color var(--duration) var(--curve), border-color var(--duration) var(--curve), filter var(--duration) var(--curve);
}
</style>
