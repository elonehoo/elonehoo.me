<script setup lang="ts">
interface Toc {
  id: string
  text: string
  depth: number
  children?: Toc[]
}

const { list } = defineProps<{
  list: Toc[]
}>()
</script>

<template>
  <div>
    <div class="table-of-contents">
      <div class="table-of-contents-anchor">
        <div class="i-carbon-list" />
      </div>
      <TocItem :toc-list="list" />
    </div>
  </div>
</template>
