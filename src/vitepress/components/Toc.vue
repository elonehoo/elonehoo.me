<script setup lang="ts">
import { useOutlineHeaders } from '../composables/outline'
import OutlineItem from './OutlineItem.vue'

const headers = useOutlineHeaders()
</script>

<template>
  <div
    v-if="headers.length !== 0"
    class="fixed op-0 md:op-100"
  >
    <span class="text-gray-11">Toc</span>
    <OutlineItem
      :headers="headers"
    />
  </div>
</template>
