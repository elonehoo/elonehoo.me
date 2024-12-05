<script setup lang="ts">
import { useData } from 'vitepress'
import { Icones } from '../../core'

const { isDark } = useData()

const iconName = computed(() => {
  return isDark.value ? 'sun' : 'moon'
})
</script>

<template>
  <div class="mb-4">
    <Icones
      :name="iconName"
      class="w-4 h-4 text-dark dark:text-light"
    />
  </div>
</template>
