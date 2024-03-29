<script setup lang="ts">
import { ref } from 'vue'
import type { CSSProperties } from 'nuxt/dist/app/compat/capi'

const props = withDefaults(defineProps<{
  duration?: number
  maxWidth?: number
}>(), {
  duration: 500,
  maxWidth: 1000,
})

const el = ref<HTMLElement>()
const isPreviewActive = ref(false)
const isTransitioning = refAutoReset(false, props.duration)
const { width: windowWidth, height: windowHeight } = useWindowSize({
  includeScrollbar: false,
})

onKeyStroke('Escape', (e) => {
  e.preventDefault()
  isPreviewActive.value = false
})

const computedStyle = ref<CSSProperties>({
  position: 'absolute',
  zIndex: '999',
  width: '1000px',
  height: '666px',
})

const initialScrollPosition = ref(0)
function handleScroll() {
  const diff = Math.abs(initialScrollPosition.value - window.scrollY)
  if (diff > 10)
    isPreviewActive.value = false
}

function applyStying() {
  if (!isPreviewActive.value || !el.value)
    return

  const { top, left, width, height } = el.value.getBoundingClientRect()

  const scaleX
        = Math.max(width, windowWidth.value) / width
  const scaleY
        = Math.max(height, windowHeight.value) / height
  const maxScaleX = props.maxWidth / width
  const scale = Math.min(Math.min(scaleX, maxScaleX), scaleY)

  const translateX = (-left + (windowWidth.value - width) / 2) / scale
  const translateY = (-top + (windowHeight.value - height) / 2) / scale
  const transform = `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`

  computedStyle.value.top = `${top + window.scrollY}px`
  computedStyle.value.left = `${left}px`
  computedStyle.value.width = `${width}px`
  computedStyle.value.transform = transform
  computedStyle.value.cursor = 'zoom-out'
}

function clearStyling() {
  computedStyle.value.transform = 'scale(1)'
  computedStyle.value.cursor = 'zoom-in'
}

watch(isPreviewActive, (n) => {
  // add scroll event listener
  if (n) {
    nextTick(() => {
      applyStying()
      initialScrollPosition.value = window.scrollY
      document.addEventListener('scroll', handleScroll)
    })
  }
  else {
    clearStyling()
    initialScrollPosition.value = 0
    isTransitioning.value = true
    document.removeEventListener('scroll', handleScroll)
  }
})

watch(windowWidth, () => {
  applyStying()
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div
    ref="el"
    :style="{
      opacity: isPreviewActive || isTransitioning ? '0' : '1',
      cursor: 'zoom-in',
    }"
    v-bind="$attrs"
    role="button"
    tabindex="0"
    @click="isPreviewActive = !isPreviewActive"
    @keydown.enter="isPreviewActive = !isPreviewActive"
  >
    <slot name="default" />
  </div>

  <!-- Zoom element -->
  <Teleport to="body">
    <div
      v-if="isPreviewActive || isTransitioning"
      v-bind="$attrs"
      class="fixed cursor-zoom-out top-0 left-0 min-w-screen min-h-screen bg-white bg-op-50 dark:bg-black dark:bg-op-50"
      @click="isPreviewActive = !isPreviewActive"
    >
      <slot name="dialog" />
    </div>
  </Teleport>
  <Teleport to="body">
    <div
      v-if="isPreviewActive || isTransitioning"
      v-bind="$attrs"
      :style="computedStyle"
      @click="isPreviewActive = !isPreviewActive"
    >
      <slot name="preview" />
    </div>
  </Teleport>
</template>
