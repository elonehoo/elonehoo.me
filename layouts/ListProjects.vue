<script setup lang="ts">
import defaultVue from './default.vue'

const projects = useContent().navigation.value?.filter((i: any) => i._path.startsWith('/projects'))[0].projects

useHead({
  meta: [
    { property: 'og:title', content: 'Elone Hoo' },
    { property: 'og:image', content: '/og.png' },
    { property: 'og:description', content: 'Elone Hoo\'s Project' },
    { name: 'description', content: 'Elone Hoo\'s Project' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: '@elonehoo' },
    { name: 'twitter:title', content: 'Project' },
    { name: 'twitter:description', content: 'Elone Hoo\'s Project' },
    { name: 'twitter:image', content: '/og.png' },
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
    <template v-for="key in Object.keys(projects)" :key="key">
      <h4 class="mt-10 font-bold">
        {{ key }}
      </h4>
      <div class="project-grid py-2 -mx-3 gap-2">
        <a
          v-for="item, idx in projects[key]"
          :key="idx"
          class="item relative flex items-center"
          :href="item.link"
          target="_blank"
          :class="!item.link ? 'opacity-0 pointer-events-none h-0 -mt-8 -mb-4' : ''"
          :title="item.name"
        >
          <div v-if="item.icon" class="pt-2 pr-5">
            <IconJumpIde v-if="item.icon === 'jump-ide'" class="text-4xl opacity-50" />
            <IconReactivityVue v-else-if="item.icon === 'reactivity-vue'" class="text-4xl opacity-50" />
            <Icon v-else class="text-3xl opacity-50" :name="item.icon || 'carbon:unknown'" />
          </div>
          <div class="flex-auto">
            <div cla ss="text-normal">{{ item.name }}</div>
            <div class="desc text-sm opacity-50 font-normal" v-html="item.desc" />
          </div>
        </a>
      </div>
    </template>
    <div class="markdown pb5">
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
    </div>

    <a href="https://github.com/elonehoo?tab=repositories" target="_blank">All projects sort by Stars</a>
  </defaultVue>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.project-grid a.item {
  padding: 0.8em 1em;
  background: transparent;
  font-size: 1.1rem;
}

.project-grid a.item:hover {
  background: #88888808;
}
</style>
