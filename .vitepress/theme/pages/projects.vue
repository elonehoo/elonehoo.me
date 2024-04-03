<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()

function slug(name: string) {
  return name.toLowerCase().replace(/[\s\\\/]+/g, '-')
}
</script>

<template>
  <div aria-label="document-driven-page">
    <div class="m-auto mb-8 slide-enter-50">
      <h1 class="page-title text-center">
        Projects
      </h1>
      <p class="text-center opacity-50 !-mt-6 italic">
        List of projects that I am proud of
      </p>
    </div>
    <article class="m-0 md:m-auto max-w-full!">
      <div aria-label="slide-enter-content">
        <div v-for="key, cidx in Object.keys(frontmatter.projects)" :key="key" class="slide-enter" :style="{ '--enter-stage': cidx + 1, '--enter-step': '120ms' }">
          <div
            :id="slug(key)"
            class="select-none relative h20 pointer-events-none slide-enter"
            :style="{
              '--enter-stage': cidx - 2,
              '--enter-step': '60ms',
            }"
          >
            <span class="text-5em color-transparent absolute left--1rem top-0rem font-bold text-stroke-1.5 text-stroke-hex-aaa op30">{{ key }}</span>
          </div>
          <div
            class="project-grid py-2 max-w-500 w-max mx-auto"
            grid="~ cols-1 md:cols-2 gap-4 lg:cols-3"
          >
            <a
              v-for="item, idx in frontmatter.projects[key]"
              :key="idx"
              class="item relative flex items-center border-none!"
              :href="item.link"
              target="_blank"
              :title="item.name"
            >
              <div v-if="item.icon" class="pt-2 pr-5">
                <IconJumpIde v-if="item.icon === 'jump-ide'" class="text-4xl opacity-50" />
                <IconReactivityVue v-else-if="item.icon === 'reactivity-vue'" class="text-4xl opacity-50" />
                <IconDestyler v-else-if="item.icon === 'destyler'" class="text-4xl opacity-50" />
                <IconLivraison v-else-if="item.icon === 'livraison'" class="text-4xl opacity-50" />
                <IconAnimatedUnocss v-else-if="item.icon === 'animatedUnocss'" class="text-4xl opacity-50" />
                <div v-else class="text-4xl opacity-50" :class="item.icon || 'i-carbon-unknown'" />
              </div>
              <div class="flex-auto">
                <div class="text-normal">{{ item.name }}</div>
                <div class="desc text-sm opacity-50 font-normal">{{ item.desc }}</div>
              </div>
            </a>
          </div>
        </div>
        <div :style="{ '--enter-stage': Object.keys(frontmatter.projects).length, '--enter-step': '120ms' }" class="slide-enter markdown pb5 text-center mx-auto mt10 max-w-65ch">
          <p op75>
            <em>
              Thanks for getting intersted in my works! If like them or find them useful, consider
              &nbsp;<a
                href="https://github.com/elonehoo"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >follow me</a>&nbsp;to support me keeping them sustainable. Cheers! :)
            </em>
          </p>
          <a op="50" class="text-center" href="https://github.com/elonehoo?tab=repositories" target="_blank">All projects sort by Stars</a>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.project-grid a.item {
  background: transparent;
  font-size: 1.1rem;
  width: 350px;
  max-width: 100%;
  padding: 0.5rem 0.875rem 0.875rem;
  border-radius: 6px;
}

.project-grid a.item:hover {
  background: #88888811;
}
</style>
