<script setup lang="ts">
import { useData } from 'vitepress'
import DocLayout from './Doc.vue'
import HomeLayout from './Home.vue'
import NotFoundLayout from './NotFound.vue'
import PageLayout from './Page.vue'

const { frontmatter, page } = useData()
</script>

<template>
  <NotFoundLayout v-if="page.isNotFound" />
  <template v-else>
    <HomeLayout v-if="frontmatter.home" />
    <PageLayout v-else-if="frontmatter.page" />
    <DocLayout v-else />
  </template>
</template>
