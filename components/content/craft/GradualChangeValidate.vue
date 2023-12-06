<script setup lang="ts">
import { useReward } from 'vue-feliciter'
import color from 'public/color.json'

const { reward } = useReward('full-page', 'confetti', { startVelocity: 10, spread: 180, elementCount: 100 })

const solutionColors = ref<{
  ahead: string
  behind: string
  angle: string
}>({
  ahead: '#ffffff',
  behind: '#ffffff',
  angle: '0',
})

const gradesColors = ref<{
  ahead: string
  behind: string
  angle: string
}>({
  ahead: '#',
  behind: '#',
  angle: '0',
})

onMounted(() => {
  randomColor()
})

function randomColor() {
  // random two color
  solutionColors.value.ahead = color[Math.floor(Math.random() * color.length)].value
  solutionColors.value.behind = color[Math.floor(Math.random() * color.length)].value
  // random 0 - 360
  solutionColors.value.angle = Math.floor(Math.random() * 360).toString()
  console.info(solutionColors.value)
}

function handleValidate() {
  if (gradesColors.value.ahead === solutionColors.value.ahead && gradesColors.value.behind === solutionColors.value.behind && gradesColors.value.angle === solutionColors.value.angle)
    reward()
}
</script>

<template>
  <div id="full-page" />
  <CraftBox>
    <div class="w-440px h-280px bg-#fbfbfc dark:bg-#1e1e1e rounded-xl box-shadow flex flex-col p-5">
      <div class="text-2xl dark:text-light text-dark font-bold">
        <span class="mr-4">Surety Validate</span>
        <span class="cursor-pointer" @click="randomColor()"><Icon name="carbon:rotate-360" /></span>
      </div>
      <div class="mt-6 h-50px rounded-xl" :style="`background: linear-gradient(${solutionColors.angle}deg, ${solutionColors.ahead}, ${solutionColors.behind})`" />
      <div class="mt-4 text-base">
        Please enter the gradient color and angle above
      </div>
      <div class="flex justify-center items-center">
        <div class="flex flex-col justify-center items-center">
          <input v-model="gradesColors.ahead" class="w-30 input-green">
          <div>HEX</div>
        </div>
        <div class="flex flex-col justify-center items-center ml-2">
          <input v-model="gradesColors.behind" class="w-30 input-green">
          <div>HEX</div>
        </div>
        <div class="flex flex-col justify-center items-center ml-2">
          <div class="flex justify-center items-center">
            <Icon name="carbon:radio-button" class="mr-1 text-2xl" />
            <input v-model="gradesColors.angle" class="w-30 input-green">
          </div>
          <div>DEG</div>
        </div>
      </div>
      <div class="mt-2">
        <button
          class="btn-sincere-green w-full flex justify-center items-center h-40px!"
          @click="handleValidate()"
        >
          Validate
        </button>
      </div>
    </div>
  </CraftBox>
</template>

<style scoped>
#full-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.box-shadow{
  box-shadow: 0px 10px 80px 0px rgba(0,0,0,.2);
}
.dark .box-shadow{
  box-shadow: 0px 16px 80px 0px rgba(0,0,0,.8);
}
</style>
