<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed } from 'vue'

const route = useRoute()

const prevPath = computed(() => route.path.split('/').slice(0, -1).join('/') || '/')
</script>

<template>
  <div class="pager max-w-65ch slide-enter animate-delay-600!" m="t8 b8 auto">
    <span font="mono" class="op50">&gt; </span>
    <a :href="prevPath" font="mono" op="50 hover:75">cd ..</a>
  </div>
</template>
