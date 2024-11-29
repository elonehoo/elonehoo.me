<script setup lang="ts">
import { useData } from 'vitepress'
import DocLayout from './Doc.vue'
import HomeLayout from './Home.vue'
import PageLayout from './Page.vue'

const { frontmatter } = useData()
</script>

<template>
  <HomeLayout v-if="frontmatter.home" />
  <PageLayout v-else-if="frontmatter.page" />
  <DocLayout v-else />
</template>
