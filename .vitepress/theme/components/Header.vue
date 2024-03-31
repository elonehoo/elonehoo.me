<script setup lang="ts">
import { useData } from 'vitepress'

const { site, isDark } = useData()

const { nav = [] } = site.value?.themeConfig

const theme = useStorage('theme', 'dark')

watch(theme, (v) => {
  document.documentElement.setAttribute('class', v)
  isDark.value = v === 'dark'
}, {
  immediate: true,
})

function toggleDark(e: MouseEvent) {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!isAppearanceTransition) {
    isDark.value = !isDark.value
    theme.value = isDark.value ? 'dark' : 'light'
    return
  }
  const x = e.clientX
  const y = e.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    theme.value = isDark.value ? 'dark' : 'light'
    await nextTick()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDark.value
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: isDark.value
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}
</script>

<template>
  <header class="flex justify-between p8 <md:py6">
    <div class="flex items-center">
      <a class="op-60 hover:op-100! transition-200 ease " href="/">
        <img v-if="isDark" class="w10 h10 op-90!" src="/logo/dark.svg" alt="logo">
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
      <a cursor="pointer" class="[align-self:center] text-inherit cursor-pointer opacity-60 hover:op-100 no-underline transition-opacity duration-[0.2s] ease-[ease] [outline:none]" @click="(e) => toggleDark(e)">
        <div class="w-[1.23rem] h-[1.23rem] i-ri-sun-line dark:i-ri-moon-line" />
      </a>
    </nav>
  </header>
</template>
