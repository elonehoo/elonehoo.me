<script setup lang="ts">
import defaultVue from './default.vue'

const friend = useContent().navigation.value?.filter((i: any) => i._path.startsWith('/friend'))[0]

useHead({
  meta: [
    { property: 'og:title', content: 'Elone Hoo' },
    { property: 'og:image', content: friend.value?.image === undefined ? '/og.png' : friend.value?.image },
    { property: 'og:description', content: 'Elone Hoo\'s Project' },
    { name: 'description', content: 'Elone Hoo\'s Project' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: '@elonehoo' },
    { name: 'twitter:title', content: 'Project' },
    { name: 'twitter:description', content: 'Elone Hoo\'s Project' },
    { name: 'twitter:image', content: friend.value?.image === undefined ? '/og.png' : friend.value?.image },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/logo-dark.svg',
    },
  ],
})
</script>

<template>
  <defaultVue>
    <div
      class="slide-enter"
      :style="{ '--enter-stage': 0 + 1 }"
    >
      <div
        class="project-grid py-2 max-w-500 w-max mx-auto"
        grid="~ cols-1 md:cols-2 gap-4"
        :class="friend.friend.length === 1 ? 'flex' : friend.friend.length > 2 ? 'lg:grid-cols-3' : ''"
      >
        <a
          v-for="item, idx in friend.friend"
          :key="idx"
          class="item relative flex items-center"
          :href="item.link"
          target="_blank"
          :class="!item.link ? 'opacity-0 pointer-events-none h-0 -mt-8 -mb-4' : ''"
          :title="item.name"
        >
          <div v-if="item.icon" class="pt-2 pr-5">
            <img :src="item.icon" class="w-1em h-1em">
          </div>
          <div class="flex-auto">
            <div cla ss="text-normal">{{ item.name }}</div>
            <div class="desc text-sm opacity-50 font-normal" v-html="item.desc" />
          </div>
        </a>
      </div>
    </div>
    <div class="markdown pb5 text-center mx-auto mt10 max-w-65ch">
      <p op75>
        <em>
          <span>Thank you so much for coming across this, </span>
          <br>
          <span>and if you would like to add your own personal website too!</span>
          <br>
          You can click <a href="https://github.com/elonehoo/elonehoo.me/issues/new" target="_blank">on this link</a>, submit an issue, and I'll add your link to it.
        </em>
      </p>
    </div>
  </defaultVue>
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
