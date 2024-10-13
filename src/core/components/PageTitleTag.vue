<script setup lang="ts">
import { InfoRoot } from 'destyler'

const props = defineProps<{
  title?: string
}>()
</script>

<template>
  <!-- title tag -->
  <div class="z-102 sticky pointer-events-none top-[calc(0.7rem_-_2px)] text-xs flex w-full justify-between items-center select-none">
    <InfoRoot class="bg-dark border rounded-sm border-b-0.2rem border-b-main text-light px-0.35rem py-0.2rem">
      elonehoo.me
      <code>
        -
      </code>
      <em>{{ props.title }}</em>
    </InfoRoot>
  </div>
</template>
