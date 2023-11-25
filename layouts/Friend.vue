<script setup lang="ts">
const friend = useContent().navigation.value?.filter((i: any) => i._path.startsWith('/friend'))[0]

useSeoMeta({
  title: friend.title,
  description: friend.subtitle === undefined ? 'Elone Hoo\'s Portfolio' : friend.subtitle,
  ogTitle: friend.title,
  ogImage: friend.image === undefined ? '/og.png' : friend.image,
  ogDescription: friend.subtitle === undefined ? 'Elone Hoo\'s Portfolio' : friend.subtitle,
  twitterTitle: friend.title,
  twitterCard: 'summary_large_image',
  twitterCreator: '@elonehoo',
  twitterDescription: friend.subtitle === undefined ? 'Elone Hoo\'s Portfolio' : friend.subtitle,
  twitterImage: friend.image === undefined ? '/og.png' : friend.image,
})

useHead({
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
