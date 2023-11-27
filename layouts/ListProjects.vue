<script setup lang="ts">
const data = useContent().navigation.value?.filter((i: any) => i._path.startsWith('/projects'))[0]

const projects = data.projects

useSeoMeta({
  title: data.title,
  description: data.subtitle === undefined ? 'Elone Hoo\'s Portfolio' : data.subtitle,
  ogTitle: data.title,
  ogImage: data.image === undefined ? '/og.png' : data.image,
  ogDescription: data.subtitle === undefined ? 'Elone Hoo\'s Portfolio' : data.subtitle,
  twitterTitle: data.title,
  twitterCard: 'summary_large_image',
  twitterCreator: '@elonehoo',
  twitterDescription: data.subtitle === undefined ? 'Elone Hoo\'s Portfolio' : data.subtitle,
  twitterImage: data.image === undefined ? '/og.png' : data.image,
})

useHead({
  title: data.title,
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
  <DefaultLayout>
    <div
      v-for="key, cidx in Object.keys(projects)"
      :key="key"
      class="slide-enter"
      :style="{ '--enter-stage': cidx + 1 }"
    >
      <h4 class="mt-15 mb-2 font-bold text-center op75">
        {{ key }}
      </h4>
      <div
        class="project-grid py-2 max-w-500 w-max mx-auto"
        grid="~ cols-1 md:cols-2 gap-4"
        :class="projects[key].length === 1 ? 'flex' : projects[key].length > 2 ? 'lg:grid-cols-3' : ''"
      >
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
            <IconDestyler v-else-if="item.icon === 'destyler'" class="text-4xl opacity-50" />
            <IconLivraison v-else-if="item.icon === 'livraison'" class="text-4xl opacity-50" />
            <IconAnimatedUnocss v-else-if="item.icon === 'animatedUnocss'" class="text-4xl opacity-50" />
            <Icon v-else class="text-3xl opacity-50" :name="item.icon || 'carbon:unknown'" />
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
  </DefaultLayout>
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
