<script setup lang="ts">
import { useData } from 'vitepress'
import { Icones } from '../../core'

const { isDark } = useData()

const theme = useStorage('theme', 'dark')

onMounted(() => {
  watch(theme, (v) => {
    document.documentElement.setAttribute('class', v)
    isDark.value = v === 'dark'
  }, {
    immediate: true,
  })
})

function toggleDark() {
  isDark.value = !isDark.value
  theme.value = isDark.value ? 'dark' : 'light'
}

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
