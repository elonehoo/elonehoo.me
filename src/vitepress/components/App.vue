<script setup lang="ts">
import { useData } from 'vitepress'
import { PageFooter } from '../../core'
import Content from './Content.vue'
import Footer from './Footer.vue'
import Mask from './Mask.vue'
import Nav from './Nav.vue'

const { frontmatter } = useData()
</script>

<template>
  <div class="h-screen bg-background mx-12px">
    <Mask />
    <Nav />
    <Content />
    <PageFooter v-if="!!frontmatter.page" />
    <Footer />
  </div>
</template>
