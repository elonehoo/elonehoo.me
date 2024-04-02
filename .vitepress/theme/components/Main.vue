<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'
import NotFound from '../pages/not-found.vue'
import Posts from '../pages/posts.vue'
import Talks from '../pages/talks.vue'
import Note from '../pages/notes.vue'
import Projects from '../pages/projects.vue'
import Demos from '../pages/demos.vue'
import Gallery from '../pages/gallery.vue'
import Pager from '../components/Pager.vue'

const PageLayout = { Posts, Talks, Note, Projects, Demos, Gallery }

const { page, frontmatter } = useData()
const route = useRoute()

const Layout = computed(() => PageLayout[frontmatter.value.layout])
const hidePager = computed(() => frontmatter.value.layout === 'home' || route.path === '/')

const markdownAltClass = useStorage('markdown-alt-class', false)

onKeyStroke(['F', 'f'], () => {
  if (frontmatter.value.read)
    markdownAltClass.value = !markdownAltClass.value
}, { dedupe: true })
</script>

<template>
  <main
    class="Doc px8 md:px16 py6 md:py10 of-x-hidden"
  >
    <Contexts v-if="frontmatter.anime" />
    {{ markdownAltClass }}
    <article
      class="article prose m-auto"
      :class="[
        frontmatter.full ? frontmatter.allFull ? 'md:max-w-90%! max-w-full!' : 'max-w-300' : 'max-w-65ch',
      ]"
    >
      <Toc />
      <NotFound v-if="page.isNotFound" />
      <template v-else-if="Layout">
        <component :is="Layout" :key="route.path" />
      </template>
      <Content
        v-else
        class="slide-enter-content prose m-auto"
        :class="{ alt: markdownAltClass }"
      />
      <Pager v-if="!hidePager" :key="route.path" />
      <slot :key="route.path" />
    </article>
  </main>
</template>
