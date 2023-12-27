<script setup lang="ts">
const props = withDefaults(defineProps<{
  text?: string
}>(), {
  text: 'Breathing',
})
const textSplit = computed(() => props.text.split(''))

const spanRefs = ref<HTMLElement[]>([])

onMounted(() => {
  const numLetters = spanRefs.value.length

  spanRefs.value.forEach((span, i) => {
    const mappedIndex = i - (numLetters / 2)
    span.style.animationDelay = `${mappedIndex * 0.25}s`
  })
})
</script>

<template>
  <CraftBox>
    <p class="breathingBox">
      <span
        v-for="item in textSplit"
        :key="item"
        ref="spanRefs"
        class="breathingText"
      >{{ item }}</span>
    </p>
  </CraftBox>
</template>

<style scoped>
@font-face {
  font-family: "Geist";
  src: url("https://pham.codes/d/GeistVF.woff2") format("woff2");
}

.breathingBox {
  font-family: "Geist";
  font-size: 128px;
  margin: 0;

  background-color: white;
  background-image: linear-gradient(0deg, #eee 70%, black);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  filter: drop-shadow();

  --wght-min: 32;
  --wght-max: 240;
}

.breathingBox > .breathingText {
  animation: breath 1.5s alternate cubic-bezier(0.37, 0, 0.63, 1);
  animation-iteration-count: infinite;
  animation-delay: 1s;
  animation-fill-mode: both;
}

@keyframes breath {
  0% {
    font-variation-settings: "wght" var(--wght-min);
  }
  100% {
    font-variation-settings: "wght" var(--wght-max);
  }
}
</style>
