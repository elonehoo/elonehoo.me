<script setup lang="ts">
import { Icones, useAppearance } from '../../core'

const { toggleDark, isDark } = useAppearance()

const iconName = computed(() => {
  return isDark.value
    ? {
        text: 'Light',
        value: 'sun',
      }
    : {
        text: 'Dark',
        value: 'moon',
      }
})
</script>

<template>
  <div class="mb-4 flex justify-center items-center text-dark dark:text-light cursor-pointer" @click="toggleDark">
    <Icones
      :name="iconName.value"
      class="w-4 h-4 text-dark dark:text-light mr-2"
    />
    {{ iconName.text }}
  </div>
</template>
