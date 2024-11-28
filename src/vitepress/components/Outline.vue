<script setup lang="ts">
import { AsideItem } from '../../core'
import { useConfig } from '../composables/config'

const { config } = useConfig()
</script>

<template>
  <AsideItem
    v-for="social in config.socialLinks"
    :key="social.link"
    :link="social.link"
    :icon="social.icon"
  >
    {{ social.icon }}
  </AsideItem>
</template>
