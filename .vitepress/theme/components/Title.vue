<script setup lang="ts">
import { useData } from 'vitepress'
import { formatDate } from '../utils'

const { frontmatter } = useData()
</script>

<template>
  <div class="m-auto mb-8">
    <h1>{{ frontmatter.title }}</h1>
    <p class="opacity-50 !-mt-6 slide-enter-50">
      {{ formatDate(frontmatter.date, true) }}
      <span>
        ·
        {{ frontmatter.duration }}
      </span>
    </p>
  </div>
</template>
