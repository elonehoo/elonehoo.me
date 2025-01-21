<script setup lang="ts">
const props = defineProps<{
  show: boolean
  text: string
}>()
</script>

<template>
  <Transition name="toast">
    <div
      v-if="props.show"
      class="fixed bottom-8 right-8 bg-green-900 text-white px-4 py-2 rounded-lg shadow-lg"
    >
      {{ props.text }}
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
