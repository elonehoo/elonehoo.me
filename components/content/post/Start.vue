<script setup lang="ts">
const props = defineProps<{
  value: number
}>()

const startNumber = ref<number>(5)

// 取出 props.value 中的小数部分,同时只取出小数点后一位,并转换为浮点数
const startValue = computed(() => {
  const decimal = (props.value % 1).toFixed(1)
  const integer = Math.floor(props.value)

  return {
    decimal,
    integer,
  }
})
</script>

<template>
  <span class="flex items-center justify-start">
    <span class="flex items-center justify-start">
      <div
        v-for="i in startNumber"
        :key="i" class="i-ri:star-s-fill"
        :class="i <= startValue.integer ? 'bg-yellow' : i === startValue.integer + 1 ? `bg-gradient-to-r from-yellow to-transparent to-99%` : ''"
      />
    </span>
    <span class="ml-2">{{ props.value }}</span>
  </span>
</template>
