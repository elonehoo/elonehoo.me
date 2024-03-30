<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'
import NotFound from '../pages/not-found.vue'
import Posts from '../pages/posts.vue'
import Talks from '../pages/talks.vue'
import Note from '../pages/notes.vue'
import Card from '../pages/card.vue'
import Projects from '../pages/projects.vue'
import Pager from '../components/Pager.vue'

const PageLayout = { Posts, Card, Talks, Note, Projects }

const { page, frontmatter } = useData()
const route = useRoute()

const Layout = computed(() => PageLayout[frontmatter.value.layout])
const hidePager = computed(() => frontmatter.value.layout === 'home' || route.path === '/')
</script>

<template>
  <main
    class="px8 md:px16 py6 md:py10 of-x-hidden m-auto"
    :class="[
      frontmatter.full ? 'max-w-300' : 'max-w-65ch',
    ]"
  >
    <article class="article">
      <NotFound v-if="page.isNotFound" />
      <template v-else-if="Layout">
        <component :is="Layout" :key="route.path" />
      </template>
      <Content v-else class="slide-enter-content prose" />
      <Pager v-if="!hidePager" :key="route.path" />
    </article>
    <slot :key="route.path" />
  </main>
</template>
