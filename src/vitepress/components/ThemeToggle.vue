<script setup lang="ts">
import { Icones, useAppearance } from '../../core'

const { toggleDark, isDark } = useAppearance()

const iconName = computed(() => {
  return isDark.value
    ? {
        text: '亮色模式',
        value: 'sun',
      }
    : {
        text: '暗色模式',
        value: 'moon',
      }
})
</script>

<template>
  <div
    class="
    flex items-center gap-x-0.5 w-fit text-gray-8 dark:text-gray-11 text-sm
    hover:bg-action hover:text-gray-1! dark:hover:text-gray-12! px-1.5 py-1 rounded-sm
    font-medium border border-gray-6 dark:border-gray-12 hover:border-action
    cursor-pointer after:bg-transparent!"
    @click="toggleDark"
  >
    {{ iconName.text }}
    <Icones :name="iconName.value" class="w-3 h-3" />
  </div>
</template>
