<script setup lang="ts">
import { AsideItem, Toast } from '../../core'
import { useConfig } from '../composables/config'

const clipboard = ref(`${window.location.href}feed.rss`)
const showToast = ref(false)

const { copied, copy } = useClipboard({
  source: clipboard,
  copiedDuring: 1000,
})

watch(copied, (newValue) => {
  if (newValue) {
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 1500)
  }
})

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
  <AsideItem
    icon="RSS"
    class="cursor-pointer"
    @click="copy(clipboard)"
  >
    RSS
  </AsideItem>
  <Toast :show="showToast" text="已复制到剪贴板!" />
</template>
