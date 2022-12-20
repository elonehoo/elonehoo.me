<script setup lang="ts">
import { computed } from 'vue'
import NavBar from './NavBar.vue'
import { useRoute } from 'vitepress'
import NotFount from './NotFount.vue'
import Home from './Home.vue'

const route = useRoute()

const isIndex = computed(() =>
  route.path.replace(/index.html$/, '')==='/' ? 'me' :
  route.path.replace(/index.html$/, '') === '/posts.html' ? 'blog' :
  route.path.replace(/index.html$/, '') === '/projects.html' ? 'projects' :
  'other'
)
</script>

<template>
  <div class="antialiased text-gray-700 dark:bg-#050505 dark:text-gray-200">
    <nav-bar />
    <main class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <home v-if="isIndex === 'me'" />
      <not-fount v-if="isIndex === 'other'"/>
    </main>
  </div>
</template>
