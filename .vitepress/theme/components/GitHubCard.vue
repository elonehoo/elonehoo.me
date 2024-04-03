<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  to: string
  type: 'pull' | 'issue'
  status: 'open' | 'close' | 'merged'
  title: string
}>()

const icon = computed(() => {
  if (props.status === 'close')
    return 'i-octicon-git-pull-request-closed-24'

  else if (props.status === 'open')
    return props.type === 'pull' ? 'i-octicon-git-pull-request-24' : 'i-octicon-issue-opened-24'

  else if (props.status === 'merged')
    return props.type === 'pull' ? 'i-octicon-git-merge-24' : 'i-octicon-issue-opened-24'

  return ''
})

const color = computed(() => {
  if (props.status === 'close')
    return 'text-light-500!'

  else if (props.status === 'open')
    return 'text-green-500!'

  else if (props.status === 'merged')
    return 'text-purple-500!'
  return ''
})

const number = computed(() => {
  // props.to 最后一个/之后的字符串
  return props.to.split('/').pop()
})
</script>

<template>
  <div
    class="block pl-4 pr-6 py-3 cursor-pointer rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800  text-sm/6 my-5 last:mb-0 font-normal group relative prose-code:bg-white dark:prose-code:bg-gray-900 hover:border-[--color-light] dark:hover:border-[--color-dark] hover:text-[--color-light] dark:hover:text-[--color-dark] border-dashed hover:border-solid hover:text-gray-800 dark:hover:text-gray-200"
    :class="color"
  >
    <a :href="props.to" rel="noopener noreferrer" target="_blank" class="focus:outline-none" tabindex="-1">
      <span class="absolute inset-0" aria-hidden="true" />
    </a>
    <span class="w-4 h-4 mr-2 inline-flex items-center align-sub text-[--color-light] dark:text-[--color-dark]" :class="icon" />
    <span class="i-ph-arrow-up-right w-4 h-4 absolute right-2 top-2 text-gray-400 dark:text-gray-500 group-hover:text-[--color-light] dark:group-hover:text-[--color-dark]" />
    <span class="text-gray-700 dark:text-gray-300">{{ props.title }}</span>
    <span class="text-gray-700 dark:text-gray-300 text-op-50! ml-2">#{{ number }}</span>
  </div>
</template>
