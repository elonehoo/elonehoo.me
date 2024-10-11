<script setup lang="ts">
import type { NavItemWithChildren } from '../config'
import NavItem from './NavItem.vue'

const props = defineProps<{
  item: NavItemWithChildren
}>()
</script>

<template>
  <li class="order-2 text-left font-bold text-[0.875em] pt-[2.5em] pb-[0.3em] px-0 text-main">
    <span>{{ props.item.text }}</span>
  </li>
  <NavItem v-for="item in props.item.items" :key="item.text" :item="item" />
</template>
