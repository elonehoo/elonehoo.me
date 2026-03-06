<script setup lang="ts">
import { BackTop } from '../../core'
import { useOutlineHeaders } from '../composables/outline'
import OutlineItem from './OutlineItem.vue'

const headers = useOutlineHeaders()
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
    <div class="flex justify-end mt-4">
      <BackTop />
    </div>
  </div>
</template>
