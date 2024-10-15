<script setup lang="ts">
import { useRouter } from 'vitepress'

const router = useRouter()

function goBack() {
  router.go('-1')
}
</script>

<template>
  <div>
    <slot />
  </div>
</template>
