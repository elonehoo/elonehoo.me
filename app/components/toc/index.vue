<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

const route = useRoute()
const activeId = ref('')

const { data } = await useAsyncData(
  'page-toc',
  () => {
    return queryCollection('content')
      .where('path', '=', route.path)
      .first()
  },
  {
    watch: [() => route.path],
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

watch(() => route.hash, (hash) => {
  activeId.value = decodeURIComponent(hash.replace(/^#/, ''))
}, { immediate: true })

watch(headingIds, async (ids, _, onCleanup) => {
  if (!import.meta.client || !ids.length)
    return

  await nextTick()

  const headings = ids
    .map(id => document.getElementById(id))
    .filter((element): element is HTMLElement => Boolean(element))

  if (!headings.length)
    return

  const observer = new IntersectionObserver((entries) => {
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
    observer.observe(heading)

  onCleanup(() => {
    observer.disconnect()
  })
}, { immediate: true })
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
