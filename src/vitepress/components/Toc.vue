<script setup lang="ts">
import { useOutlineHeaders } from '../composables/outline'
import OutlineItem from './OutlineItem.vue'

const headers = useOutlineHeaders()

function scrollTop() {
  document.documentElement.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <div
    v-if="headers.length !== 0"
    class="fixed op-0 lg:op-100"
  >
    <span class="text-gray-11">Toc</span>
    <OutlineItem
      :headers="headers"
    />
    <span class="text-gray-11 cursor-pointer" @click="scrollTop">
      Back to top
    </span>
  </div>
</template>
