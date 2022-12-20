<script setup lang="ts">
import { computed } from 'vue'
import NavBar from './NavBar.vue'
import { useRoute } from 'vitepress'
import Home from './Home.vue'
import ListPosts from './ListPosts.vue'
import Blog from './Blog.vue'
import Footer from './Footer.vue'
import ListProject from './ListProject.vue'

const route = useRoute()

const isIndex = computed(() =>
  route.path.replace(/index.html$/, '')==='/' ? 'me' :
  route.path.replace(/index.html$/, '') === '/posts.html' ? 'posts' :
  route.path.replace(/index.html$/, '') === '/projects.html' ? 'projects' :
  'other'
)

</script>

<template>
  <div class="antialiased text-gray-700 dark:bg-#050505 dark:text-gray-200">
    <nav-bar />
    <main id="main" class="px-7 py-10">
      <home v-if="isIndex === 'me'" />
      <list-posts v-else-if="isIndex === 'posts'"/>
      <list-project v-else-if="isIndex === 'projects'" />
      <blog v-else />
    </main>
    <Footer />
  </div>
</template>
