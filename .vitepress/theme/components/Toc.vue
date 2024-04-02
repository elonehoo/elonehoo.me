<script setup lang="ts">
import { onContentUpdated } from 'vitepress'
import { getHeaders } from '~/theme/composables/outline'

const headers = shallowRef<any[]>([])

onContentUpdated(() => {
  headers.value = getHeaders()
})
</script>

<template>
  <div>
    <div v-if="headers.length !== 0" class="table-of-contents">
      <div class="table-of-contents-anchor">
        <div class="i-ri-menu-2-fill" />
      </div>
      <TocItem :headers="headers" />
    </div>
  </div>
</template>

<style>
.table-of-contents {
  position: fixed;
  top: 90px;
  bottom: 0;
  font-size: 0.8em;
  left: 20px;
  z-index: 200;
  overflow: hidden;
  --uno: hidden lg-flex flex-col w-100px lg-w-200px xl-w-300px;
}

.table-of-contents-anchor {
  --uno: mx2 w-7 h-7 text-lg flex items-center justify-center bg-base rounded
    text-hex-8887 border border-base shadow md: border-transparent md:
    shadow-none transition duration-400;
}

.table-of-contents > ul {
  text-overflow: ellipsis;
  height: 100%;
  overflow-y: auto;
  @apply: rounded op0 mt-1 pb-5 transition duration-700 before:content-none!;
}

*:hover > .table-of-contents > .table-of-contents-anchor,
.toc-always-on .table-of-contents > .table-of-contents-anchor {
  @apply: text-inherit;
}

.toc-always-on .table-of-contents > ul {
  opacity: 0.6;
}

*:hover > .table-of-contents > ul {
  opacity: 0.75;
}

.table-of-contents ul > li::before {
  display: none;
}

.table-of-contents ul > li {
  padding-left: 0.8rem;
  line-height: 1.5em;
  margin-top: 0.5em;
}

.table-of-contents ul > li > a {
  @apply: op75 hover-op100 transition;
}
</style>
