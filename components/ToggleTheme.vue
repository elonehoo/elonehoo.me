<script setup lang='ts'>
import { isDark } from '~/composables'

function toggleDark() {
  isDark.value = !isDark.value
}
</script>

<template>
  <a class="select-none" title="Toggle Color Scheme" @click="toggleDark">
    <div v-show="isDark" i-ri-moon-line />
    <div v-show="!isDark" i-ri-sun-line />
  </a>
</template>
