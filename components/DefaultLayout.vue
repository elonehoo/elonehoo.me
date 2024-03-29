<script setup lang='ts'>
import { useStorage } from '@vueuse/core'
import { formatDate } from '~/composables'

const router = useRouter()
const route = useRoute()
const content = ref<HTMLDivElement>()

const { data } = await useAsyncData(`content-${route.path}`, () => {
  return queryContent().where({ _path: route.path }).findOne()
})

onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      document.querySelector(decodeURIComponent(location.hash))
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const handleAnchors = (
    event: MouseEvent & { target: HTMLElement },
  ) => {
    const link = event.target.closest('a')
    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== '_blank'
      && link.rel !== 'external'
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin)
        return
      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash)
        navigate()
      }
      else {
        router.push({ path: pathname, hash })
      }
    }
  }
  useEventListener(window, 'hashchange', navigate)
  useEventListener(content.value!, 'click', handleAnchors, { passive: false })
  navigate()
  setTimeout(navigate, 500)
})

const markdownAltClass = useStorage('markdown-alt-class', false)

const markdown = ref<any | null>(null)

onKeyStroke(['F', 'f'], () => {
  if (data.value?._dir === 'posts')
    markdownAltClass.value = !markdownAltClass.value
}, { dedupe: true })

const titleCenter = computed(() => {
  return ['demos', 'gallery', 'list-projects', 'friend'].includes(data.value?.layout)
})

const postsNavBar = computed(() => {
  return ['list-posts', 'list-notes', 'list-talks'].includes(data.value?.layout)
})

const dir = computed(() => {
  return ['posts', 'craft', 'notes', 'talks', 'demos'].includes(data.value?._dir)
})
</script>

<template>
  <template v-if="postsNavBar">
    <SubNavBar />
  </template>
  <template v-else>
    <div v-if="data?.navigation.display ?? data?.navigation.title" class="prose m-auto mb-8 slide-enter-50">
      <h1 class="mb-0" :class="[titleCenter ? 'text-center' : '']">
        {{ data?.navigation.display ?? data?.navigation.title }}
      </h1>
      <p v-if="data?.navigation.date && dir" class="opacity-50 !-mt-2">
        {{ formatDate(data!.navigation.date) }} <span v-if="data?.navigation.duration">· {{ data?.navigation.duration }}</span>
      </p>
      <p v-if="!(data?._dir === 'posts') && data?.navigation.subtitle" :class="[titleCenter ? 'text-center' : '']" class="opacity-50 !-mt-6 italic">
        {{ data?.navigation.subtitle }}
      </p>
    </div>
  </template>
  <article ref="content" class="prose m-0 md:m-auto" :class="[titleCenter ? 'md:max-w-90%! max-w-full!' : '']">
    <Toc v-if="data?._dir === 'posts' && data?.body.toc.links.length !== 0" :class="data?.navigation.tocAlwaysOn ? 'toc-always-on' : ''" :list="data?.body.toc.links" />
    <div ref="markdown" class="slide-enter-content" :class="{ alt: markdownAltClass && data?._dir === 'posts' }">
      <slot />
    </div>
  </article>
  <div v-if="route.path !== '/'" class="prose m-auto mt-8 mb-8 slide-enter animate-delay-500 print:hidden">
    <br>
    <router-link
      :to="route.path.split('/').slice(0, -1).join('/') || '/'"
      class="font-mono no-underline opacity-50 hover:opacity-75"
    >
      > cd ..
    </router-link>
  </div>
</template>
