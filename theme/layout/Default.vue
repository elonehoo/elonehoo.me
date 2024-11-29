<script setup lang="ts">
import { useData } from 'vitepress'
import HomeLayout from './Home.vue'
import PageLayout from './Page.vue'

const { frontmatter } = useData()
</script>

<template>
  <HomeLayout v-if="frontmatter.home" />
  <PageLayout v-else />
</template>
