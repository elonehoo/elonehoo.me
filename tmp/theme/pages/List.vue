<script setup lang="ts">
import { useConfig } from '~/vitepress/composables/config'

const { config } = useConfig()
</script>

<template>
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
