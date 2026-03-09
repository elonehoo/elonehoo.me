<script setup lang="ts">
defineOptions({
  name: 'Theme.Background',
})

const colorMode = useColorMode()

async function toggleColorMode(event: MouseEvent) {
  const nextMode = colorMode.value === 'dark' ? 'light' : 'dark'

  if (!import.meta.client) {
    colorMode.preference = nextMode
    return
  }

  const root = document.documentElement
  const x = event.clientX
  const y = event.clientY
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  root.style.setProperty('--theme-transition-x', `${x}px`)
  root.style.setProperty('--theme-transition-y', `${y}px`)
  root.style.setProperty('--theme-transition-radius', `${radius}px`)
  root.dataset.themeSwitch = nextMode

  const transition = document.startViewTransition?.(async () => {
    colorMode.preference = nextMode
    await nextTick()
  })

  if (!transition) {
    colorMode.preference = nextMode
    delete root.dataset.themeSwitch
    return
  }

  transition.finished.finally(() => {
    delete root.dataset.themeSwitch
  })
}
</script>

<template>
  <div
    class="p-4 py-10 background md:p-12 min-h-screen z--10"
    @dblclick="toggleColorMode"
  >
    <div class="justify-between md:flex animate-in fade-in duration-500">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.background {
  background-image: linear-gradient(90deg, #ffffff, rgba(255, 255, 255, .63)), url(/assets/noise.svg), linear-gradient(hsl(var(--theme-action)) 1px, transparent 0), linear-gradient(90deg, hsl(var(--theme-action)) 1px, #fff 0);
  background-size: auto, auto, 20px 20px, 20px 20px;
}

.dark .background {
  background-image: linear-gradient(90deg, #101010, rgba(0, 0, 0, .83)), url(/assets/noise.svg), linear-gradient(hsl(var(--theme-action)) 1px, transparent 0), linear-gradient(90deg, hsl(var(--theme-action)) 1px, #000 0);
  background-size: auto, auto, 20px 20px, 20px 20px;
}
</style>
