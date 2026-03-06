<script setup lang="ts">
import { onMounted, ref } from 'vue'

const percent = ref(0)

onMounted(() => {
  window.onscroll = () => {
    const scrollEl = document.documentElement
    const scrollTop = window.pageYOffset || scrollEl.scrollTop || document.body.scrollTop
    const curScrollPer = scrollTop / (scrollEl.getBoundingClientRect().height - scrollEl.clientHeight) * 100
    percent.value = Number(curScrollPer.toFixed(2))
  }
})
</script>

<template>
  <div
    class="fixed right-0 top-0 h-full w-1 z-10"
  >
    <div
      class="bg-action transition-all duration-300 w-full"
      :style="{ height: `${percent}%` }"
    />
  </div>
</template>
