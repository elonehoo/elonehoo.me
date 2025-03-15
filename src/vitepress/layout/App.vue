<script setup lang="ts">
import { useData } from 'vitepress'
import { Background, CustomAside, CustomContent } from '../../core'
import Outline from '../components/Outline.vue'
import Progress from '../components/Progress.vue'
import Toc from '../components/Toc.vue'
import VPFooter from '../components/VPFooter.vue'

const { frontmatter, page } = useData()
</script>

<template>
  <Background>
    <CustomContent>
      <slot />
      <VPFooter />
    </CustomContent>
    <CustomAside>
      <!-- Show Outline component for home page, 404 page, or pages with frontmatter.page -->
      <Outline v-if="frontmatter.page || frontmatter.home || page.isNotFound" />
      <!-- Show Table of Contents for other pages -->
      <template v-else>
        <Toc />
        <Progress />
      </template>
    </CustomAside>
  </Background>
</template>
