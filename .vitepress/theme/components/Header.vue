<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { isDark, toggleDark } from '../composables/useDark'
import Icon from './Icon.vue'

const { site } = useData()

const { nav = [] } = site.value?.themeConfig

const themeIcon = ref<'sun' | 'moon'>('sun')
const toggleDarkFunc = toggleDark

watch(isDark, (v) => {
  themeIcon.value = v ? 'sun' : 'moon'
})
</script>

<template>
  <header class="header">
    <div class="flex items-center">
      <a href="/">
        <img v-if="themeIcon === 'sun'" class="logo" src="/logo/dark.svg" alt="logo">
        <img v-else-if="themeIcon === 'moon'" class="logo" src="/logo/light.svg" alt="logo">
        <img v-else class="logo" src="/logo/light.svg" alt="logo">
      </a>
    </div>
    <nav class="nav">
      <a v-for="n in nav" :key="n.link" :href="n.link" :title="n.text">
        <Icon v-if="n.icon" :icon="n.icon" />
        <template v-else>
          {{ n.text }}
        </template>
      </a>
      <a cursor="pointer" @click="toggleDarkFunc">
        <Icon :icon="{ name: themeIcon }" />
      </a>
    </nav>
  </header>
</template>

<style scoped>
.header {
  @apply flex justify-between p8 <md:py6;
}
.header a {
  @apply op-60 hover:op-100! transition-200 ease;
}

.logo {
  @apply w10 h10 op-90!;
}

.nav {
  @apply grid grid-flow-col gap-3 md:gap-5;
}

.nav a {
  align-self: center;
}
</style>
