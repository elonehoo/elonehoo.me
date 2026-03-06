<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'Submit Form',
})

const displayText = ref(props.label)
const charset = 'abcdefghijklmnopqrstuvwxyz'

function randomChars(length: number) {
  return Array.from(
    { length },
    () => charset[Math.floor(Math.random() * charset.length)],
  ).join('')
}

async function scramble(input: string) {
  let prefix = ''
  for (let index = 0; index < input.length; index++) {
    await new Promise(resolve => setTimeout(resolve, 50))
    prefix += input.charAt(index)
    displayText.value = prefix + randomChars(input.length - prefix.length)
  }
}

function startScrambling() {
  scramble(props.label)
}

watch(
  () => props.label,
  (newValue) => {
    displayText.value = newValue
  },
)
</script>

<template>
  <CraftBox>
    <button
      type="button"
      class="rounded-md bg-white dark:bg-dark-800 px-6 py-4 text-xl font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-dark-900 relative font-mono"
      @mouseenter="startScrambling"
    >
      {{ displayText }}
    </button>
  </CraftBox>
</template>
