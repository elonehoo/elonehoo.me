<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const progress = ref(0)
let sentinels: HTMLDivElement[] = []
let observer: IntersectionObserver | null = null

onMounted(() => {
  // 创建哨兵元素
  createSentinels()

  // 创建 Intersection Observer
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLElement
        const index = Number.parseInt(target.dataset.index || '0')
        progress.value = Math.min(index * 10, 100)
      }
    })
  }, {
    root: null, // 使用视口作为根元素
    rootMargin: '0px',
    threshold: 0.1, // 当元素10%可见时触发
  })

  // 观察所有哨兵元素
  sentinels.forEach((sentinel) => {
    observer?.observe(sentinel)
  })
})

onUnmounted(() => {
  // 停止观察并清理哨兵元素
  if (observer) {
    observer.disconnect()
  }

  sentinels.forEach((sentinel) => {
    if (sentinel.parentNode) {
      sentinel.parentNode.removeChild(sentinel)
    }
  })
})

// 创建哨兵元素，在文档中均匀分布
function createSentinels() {
  const container = document.querySelector('main') || document.body
  const containerHeight = container.scrollHeight

  // 创建11个哨兵元素，对应0%到100%的进度
  for (let i = 0; i <= 10; i++) {
    const sentinel = document.createElement('div')
    sentinel.className = 'progress-sentinel'
    sentinel.dataset.index = String(i)

    // 设置样式使其不可见但可被观察
    Object.assign(sentinel.style, {
      position: 'absolute',
      top: `${i * (containerHeight / 10)}px`,
      left: '0',
      width: '100%',
      height: '1px',
      pointerEvents: 'none',
      opacity: '0',
      zIndex: '-1',
    })

    container.appendChild(sentinel)
    sentinels.push(sentinel)
  }
}
</script>

<template>
  <ClientOnly>
    <div class="fixed right-0 top-0 w-1 h-full bg-gray-100/10 z-100">
      <div
        class="w-full transition-height duration-300 ease-out bg-action/50"
        :style="{ height: `${progress}%` }"
      />
    </div>
  </ClientOnly>
</template>
