<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

defineOptions({
  name: 'TocItem',
})

const props = defineProps<{
  headers: TocLink[]
  activeId?: string
  nested?: boolean
}>()

const LEADING_HASH_RE = /^#/

function normalizeId(id: string) {
  return decodeURIComponent(id.replace(LEADING_HASH_RE, ''))
}

function getLink(id: string) {
  return `#${normalizeId(id)}`
}

function isActive(header: TocLink) {
  return normalizeId(header.id) === props.activeId
}

function hasActiveChild(children?: TocLink[]): boolean {
  if (!children?.length)
    return false

  return children.some(child => isActive(child) || hasActiveChild(child.children))
}
</script>

<template>
  <ul :class="nested ? 'nested' : 'root'">
    <li v-for="header in props.headers" :key="header.id">
      <NuxtLink
        :to="getLink(header.id)"
        class="outline-link relative"
        :class="[
          isActive(header)
            ? 'text-gray-12 dark:text-gray-1'
            : hasActiveChild(header.children)
              ? 'text-gray-11'
              : 'text-gray-9 hover:text-gray-12 dark:hover:text-gray-1',
        ]"
      >
        {{ header.text }}
      </NuxtLink>
      <TocItem
        v-if="header.children?.length"
        class="mr-4"
        :headers="header.children"
        :active-id="activeId"
        nested
      />
    </li>
  </ul>
</template>
