<script setup lang="ts">
import { useRoute } from 'vitepress'

const inactiveStyle = 'opacity-20 hover:opacity-50'
const activeStyle = 'opacity-100 underline'

const route = useRoute()
</script>

<template>
  <div class="prose m-auto mb-8 select-none animate-none! op100!">
    <div mb-0 flex="~ col gap-1 sm:row sm:gap-3 wrap" text-3xl>
      <a href="/posts" class="!border-none cursor-pointer" :class="route.path === '/posts' ? activeStyle : inactiveStyle">
        Blog
      </a>
      <a href="/talks" class="!border-none cursor-pointer" :class="route.path === '/talks' ? activeStyle : inactiveStyle">
        Talks
      </a>
      <a href="/notes" class="!border-none cursor-pointer" :class="route.path === '/notes' ? activeStyle : inactiveStyle">
        Notes
      </a>
    </div>
  </div>
</template>
