<script setup lang="ts">
import { PageTitleTag } from '../../core'
import { useActiveAnchor, useOutlineHeaders } from '../composables/outline'

const headers = useOutlineHeaders()

const container = ref()
const marker = ref()

useActiveAnchor(container, marker)
</script>

<template>
  <div>
    <PageTitleTag title="本页目录" />

    {{ headers }}
  </div>
</template>
