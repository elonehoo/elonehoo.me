<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

const LEADING_HASH_RE = /^#/

const route = useRoute()
const pagePath = computed(() => route.path)
const activeId = ref('')
const observer = shallowRef<IntersectionObserver>()

const { data } = await useAsyncData(
  'page-toc',
  () => {
    return queryCollection('content')
      .path(pagePath.value)
      .first()
  },
  {
    watch: [pagePath],
  },
)

const toc = computed<TocLink[]>(() => {
  return data.value?.body?.toc?.links ?? []
})

const headingIds = computed(() => {
  const ids: string[] = []

  const collect = (links: TocLink[]) => {
    for (const link of links) {
      ids.push(link.id)

      if (link.children?.length)
        collect(link.children)
    }
  }

  collect(toc.value)

  return ids
})

function syncActiveId(hash = route.hash) {
  activeId.value = decodeURIComponent(hash.replace(LEADING_HASH_RE, ''))
}

function disconnectObserver() {
  observer.value?.disconnect()
  observer.value = undefined
}

async function observeHeadings(ids: string[]) {
  if (!import.meta.client || !ids.length)
    return

  await nextTick()

  const headings = ids
    .map(id => document.getElementById(id))
    .filter((element): element is HTMLElement => Boolean(element))

  if (!headings.length)
    return

  const nextObserver = new IntersectionObserver((entries) => {
    const current = entries
      .filter(entry => entry.isIntersecting)
      .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0]

    if (current)
      activeId.value = current.target.id
  }, {
    rootMargin: '0px 0px -70% 0px',
    threshold: [0, 1],
  })

  for (const heading of headings)
    nextObserver.observe(heading)

  observer.value = nextObserver
}

watch(headingIds, async (ids, _, onCleanup) => {
  disconnectObserver()

  if (!ids.length) {
    syncActiveId('')
    return
  }

  syncActiveId()
  await observeHeadings(ids)

  onCleanup(() => {
    disconnectObserver()
  })
}, { immediate: true, flush: 'post' })

onMounted(() => {
  syncActiveId()
})

onBeforeUnmount(() => {
  disconnectObserver()
})
</script>

<template>
  <div
    v-if="toc.length"
    class="op-0 lg:op-100 lg:fixed lg:top-12 lg:right-12"
  >
    <span class="text-gray-11">Toc</span>
    <TocItem
      :headers="toc"
      :active-id="activeId"
    />
  </div>
</template>
