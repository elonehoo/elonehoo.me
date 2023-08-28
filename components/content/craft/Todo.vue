<script setup lang="ts">
const todoList = ref<{
  value: string
  label: string
}[]>([
  {
    value: '1',
    label: 'Bread',
  },
  {
    value: '2',
    label: 'Cheese',
  },
  {
    value: '3',
    label: 'Coffee',
  },
])

const selected = ref<string[]>(['1'])
</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="relative grid grid-cols-[30px_auto] items-center">
      <template v-for="todo in todoList" :key="todo.value">
        <input
          :id="todo.label"
          v-model="selected"
          type="checkbox"
          :value="todo.value"
          class="
          appearance-none relative w-15px h-15px [outline:none] border-0 mr-15px ml-0 my-0 cursor-pointer grid items-center
          before:content-[''] before:absolute before:h-2px! before:top-auto before:[background:#000000] dark:before:[background:#ffffff] before:rounded-sm
          after:content-[''] after:absolute after:h-2px! after:top-auto after:[background:#000000] dark:after:[background:#ffffff] after:rounded-sm
          before:w-0 before:right-6/10 before:[transform-origin:right_bottom]
          after:w-0 after:left-4/10 after:[transform-origin:left_bottom]
        "
          :class="[selected.includes(todo.value)
            ? 'before:[animation:check-01_0.4s_ease_forwards]! after:[animation:check-02_0.4s_ease_forwards]!' : '',
          ]"
        >
        <label
          :for="todo.label"
          class="box
        text-#000 dark:text-#fff relative cursor-pointer grid items-center w-fit [transition:color_0.3s_ease]
        before:h-0.5 before:w-2 before:left--27px before:[transition:background_0.3s_ease]
        before:[background:#000000] dark:before:[background:#fff] before:rounded-sm before:absolute before:content-['']
        after:absolute after:content-[''] after:h-1 after:w-1 after:top-2 after:left-[-25px] after:rounded-1/2
        "
          :class="[selected.includes(todo.value)
            ? `
          color-#c3c8de! color-op-70! [animation:move_0.3s_ease_0.1s_forwards]
          before:[background:#c3c8de]! before:[animation:slice_0.4s_ease_forwards]
          after:[animation:firework_0.5s_ease_forwards_0.1s]
          ` : '',
          ]"
        >
          {{ todo.label }}
        </label>
      </template>
    </div>
  </div>
</template>

<style>
.box{
  --firework-color: #000;
}
.dark .box{
  --firework-color: #fff;
}
 @keyframes move {
  50% {
   padding-left: 8px;
   padding-right: 0px;
 }
  100% {
   padding-right: 4px;
 }
}
 @keyframes slice {
  60% {
   width: 100%;
   left: 4px;
 }
  100% {
   width: 100%;
   left: -2px;
   padding-left: 0;
 }
}
 @keyframes check-01 {
  0% {
   width: 4px;
   top: auto;
   transform: rotate(0);
 }
  50% {
   width: 0px;
   top: auto;
   transform: rotate(0);
 }
  51% {
   width: 0px;
   top: 8px;
   transform: rotate(45deg);
 }
  100% {
   width: 5px;
   top: 8px;
   transform: rotate(45deg);
 }
}
 @keyframes check-02 {
  0% {
   width: 4px;
   top: auto;
   transform: rotate(0);
 }
  50% {
   width: 0px;
   top: auto;
   transform: rotate(0);
 }
  51% {
   width: 0px;
   top: 8px;
   transform: rotate(-45deg);
 }
  100% {
   width: 10px;
   top: 8px;
   transform: rotate(-45deg);
 }
}

@keyframes firework {
  0% {
   opacity: 1;
   box-shadow: 0 0 0 -2px var(--firework-color), 0 0 0 -2px var(--firework-color), 0 0 0 -2px var(--firework-color), 0 0 0 -2px var(--firework-color), 0 0 0 -2px var(--firework-color), 0 0 0 -2px var(--firework-color);
 }
  30% {
   opacity: 1;
 }
  100% {
   opacity: 0;
   box-shadow: 0 -15px 0 0px var(--firework-color), 14px -8px 0 0px var(--firework-color), 14px 8px 0 0px var(--firework-color), 0 15px 0 0px var(--firework-color), -14px 8px 0 0px var(--firework-color), -14px -8px 0 0px var(--firework-color);
 }
}
</style>
