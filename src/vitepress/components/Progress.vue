<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// 阅读进度百分比
const progress = ref(0)

// 计算滚动进度
function calculateScrollProgress(): void {
  const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrollPosition = window.scrollY || document.documentElement.scrollTop

  if (documentHeight > 0) {
    progress.value = Math.min(Math.round((scrollPosition / documentHeight) * 100), 100)
  }
  else {
    progress.value = 0
  }
}

// 节流函数，避免频繁计算影响性能
function throttle<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: number | null = null
  return (...args: Parameters<T>) => {
    if (!timeout) {
      timeout = window.setTimeout(() => {
        func(...args)
        timeout = null
      }, wait)
    }
  }
}

const handleScroll = throttle(calculateScrollProgress, 50)

onMounted(() => {
  // 初始计算一次
  calculateScrollProgress()
  // 添加滚动事件监听器
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  // 移除滚动事件监听器，防止内存泄漏
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="fixed right-0 top-0 w-1 h-full bg-gray-100/10 z-100">
    <div
      class="w-full transition-height duration-100 ease-out bg-action/50"
      :style="{ height: `${progress}%` }"
    />
  </div>
</template>
