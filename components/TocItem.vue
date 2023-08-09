<script setup lang="ts">
interface Toc {
  id: string
  text: string
  depth: number
  children?: Toc[]
}

const { tocList } = defineProps<{
  tocList: Toc[]
}>()
</script>

<template>
  <ul>
    <li v-for="toc in tocList" :key="toc.id">
      <a :href="`#${toc.id}`">{{ toc.text }}</a>
      <template v-if="toc.children !== undefined">
        <TocItem :toc-list="toc.children" />
      </template>
    </li>
  </ul>
</template>
