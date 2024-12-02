<script setup lang="ts">
import type { MenuItemWithLinkAndChildren } from '../composables/outline'
import { Link } from 'destyler'

const props = defineProps<{
  headers: MenuItemWithLinkAndChildren[]
}>()
</script>

<template>
  <ul>
    <li v-for="header in props.headers" :key="header.link">
      <Link :to="header.link" class="relative text-gray-11 hover:text-gray-1">
        {{ header.text }}
      </Link>
      <OutlineItem v-if="header.children" class="mr-4" :headers="header.children" />
    </li>
  </ul>
</template>
