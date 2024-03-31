<script setup lang="ts">
const props = withDefaults(defineProps<{
  targetNumber?: number
}>(), {
  targetNumber: 4000,
})

const counter = ref<any | null>(null)

function startCounter() {
  counter.value.animate([{ '--num': 0 }, { '--num': props.targetNumber }], {
    duration: 1000,
    easing: 'ease-out',
    fill: 'forwards',
  })
}

onMounted(() => {
  startCounter()
})
</script>

<template>
  <CraftBox>
    <div>
      <div class="p-4 flex flex-col justify-center items-center overflow-hidden">
        <span ref="counter" class="flex tabular-nums text-slate-900 dark:text-white text-5xl font-extrabold mb-2 [counter-set:_num_var(--num)] before:content-[counter(num)] ">
          <span class="sr-only">{{ targetNumber }}</span>+
        </span>
      </div>
      <div class="flex flex-col justify-center items-center">
        <button
          class="rounded-md bg-white dark:bg-dark-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-dark-900 relative font-mono"
          @click="startCounter"
        >
          Start Counter
        </button>
        <p class="text-xs mt-2 text-gray-900 dark:text-white">
          or start the counter when this component is in the viewport
        </p>
      </div>
    </div>
  </CraftBox>
</template>

<style scoped>
@property --num {
  syntax: "<integer>";
  initial-value: 0;
  inherits: false;
}

@keyframes counter {
  from {
    --num: 0;
  }

  to {
    --num: v-bind(props.targetNumber);
  }
}
</style>
