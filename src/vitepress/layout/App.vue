<script setup lang="ts">
import { useData } from 'vitepress'
import { Background, CustomAside, CustomContent } from '../../core'
import Outline from '../components/Outline.vue'
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
      <Outline v-if="frontmatter.page || frontmatter.home || page.isNotFound" />
      <Toc v-else />
    </CustomAside>
  </Background>
</template>
