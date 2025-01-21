<script setup lang="ts">
import { AsideItem, Toast } from '../../core'
import { useConfig } from '../composables/config'
import CopyToast from './CopyToast.vue'

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
    }, 1000)
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
