<script setup lang="ts">
import { useRoute } from 'vitepress';

const route = useRoute()

console.log(route.path)
</script>

<template>
  <div>
    <div v-if="route.path !== '/'" class="prose m-auto mt-8 mb-8">
      <a
        :href="route.path.split('/').slice(0, -1).join('/') || '/'"
        class="font-mono no-underline opacity-50 hover:opacity-75"
      >
        cd ..
      </a>
    </div>
    <div class="mt-10 mb-6 prose m-auto opacity-50 flex">
      <span class="text-sm">
        <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" style="color:inherit">
          CC BY-NC-SA 4.0
        </a>
        2022-PRESENT © Elone Hoo</span>
      <div class="flex-auto" />
    </div>
  </div>
</template>
