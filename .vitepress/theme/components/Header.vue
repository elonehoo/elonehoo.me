<script setup lang="ts">
import { ref, watch } from 'vue'
import { useData } from 'vitepress'
import { isDark, toggleDark } from '../composables/useDark'

const { site } = useData()

const { nav = [] } = site.value?.themeConfig

const themeIcon = ref<'sun' | 'moon'>('sun')
const toggleDarkFunc = toggleDark

watch(isDark, (v) => {
  themeIcon.value = v ? 'sun' : 'moon'
})
</script>

<template>
  <header class="flex justify-between p8 <md:py6">
    <div class="flex items-center">
      <a class="op-60 hover:op-100! transition-200 ease " href="/">
        <img v-if="themeIcon === 'sun'" class="w10 h10 op-90!" src="/logo/dark.svg" alt="logo">
        <img v-else-if="themeIcon === 'moon'" class="w10 h10 op-90!" src="/logo/light.svg" alt="logo">
        <img v-else class="w10 h10 op-90!" src="/logo/light.svg" alt="logo">
      </a>
    </div>
    <nav class="grid grid-flow-col gap-3 flex justify-center items-center">
      <template v-for="n in nav" :key="n.link">
        <a
          :href="n.link"
          :title="n.text"
          class="[align-self:center] text-inherit cursor-pointer opacity-60 hover:op-100 no-underline transition-opacity duration-[0.2s] ease-[ease] [outline:none]"
          :class="[n.autoShow ? '' : 'lt-md:hidden']"
        >
          <div v-if="n.icon !== undefined && n.icon.show === true" :class="n.icon.name" />
          <span v-else class="lt-md:hidden">{{ n.text }}</span>
          <div v-if="n.icon !== undefined && n.icon.show === false" class="md:hidden" :class="n.icon.name" />
        </a>
      </template>
      <a cursor="pointer" class="[align-self:center] text-inherit cursor-pointer opacity-60 hover:op-100 no-underline transition-opacity duration-[0.2s] ease-[ease] [outline:none]" @click="toggleDarkFunc">
        <div class="w-[1.23rem] h-[1.23rem] i-ri-sun-line dark:i-ri-moon-line" />
      </a>
    </nav>
  </header>
</template>
