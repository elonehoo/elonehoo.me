<script setup lang="ts">
import ThemeToggle from '~/vitepress/components/ThemeToggle.vue'
import { useConfig } from '~/vitepress/composables/config'

const { config } = useConfig()
</script>

<template>
  <div class="flex gap-x-3 mt-6 items-center">
    <ThemeToggle />
  </div>
  <div v-for="nav in config.nav" :key="nav.text" class="flex gap-x-3 mt-6 items-center">
    <LinkButton
      v-for="item in nav.items"
      :key="item.link"
      :link="item.link"
    >
      {{ item.text }}
    </LinkButton>
  </div>
</template>
