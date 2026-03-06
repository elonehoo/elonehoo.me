<script setup lang="ts">
import type { MenuItemWithLinkAndChildren } from '../composables/outline'
import { Link } from 'destyler'

const props = defineProps<{
  headers: MenuItemWithLinkAndChildren[]
  nested?: boolean
}>()
</script>

<template>
  <ul :class="nested ? 'nested' : 'root'">
    <li v-for="header in props.headers" :key="header.link">
      <Link :to="header.link" class="outline-link relative text-gray-9 hover:text-gray-12 dark:hover:text-gray-1">
        {{ header.text }}
      </Link>
      <OutlineItem
        v-if="header.children"
        class="mr-4"
        :headers="header.children"
        nested
      />
    </li>
  </ul>
</template>
