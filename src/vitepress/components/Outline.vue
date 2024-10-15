<script setup lang="ts">
import { PageTitleTag } from '../../core'
import { useActiveAnchor, useOutlineHeaders } from '../composables/outline'
import OutlineItem from './OutlineItem.vue'

const headers = useOutlineHeaders()

const container = ref()
const marker = ref()

useActiveAnchor(container, marker)
</script>

<template>
  <div>
    <PageTitleTag title="本页目录" />

    <div ref="container" class="mt-4">
      <div ref="marker">
        <nav>
          <OutlineItem :headers="headers" />
        </nav>
      </div>
    </div>
  </div>
</template>
