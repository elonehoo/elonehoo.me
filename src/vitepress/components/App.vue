<script setup lang="ts">
import { useData } from 'vitepress'
import { Background, CustomAside, CustomContent } from '../../core'
import Outline from './Outline.vue'
import Toc from './Toc.vue'
import VPFooter from './VPFooter.vue'

const { frontmatter } = useData()
</script>

<template>
  <Background>
    <CustomContent>
      <slot />
      <VPFooter />
    </CustomContent>
    <CustomAside>
      <Outline v-if="frontmatter.page" />
      <Toc v-else />
    </CustomAside>
  </Background>
</template>
