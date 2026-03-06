<script setup lang="ts">
const clipboard = ref<boolean>(false)

function switchClass() {
  clipboard.value = true
  setTimeout(() => {
    clipboard.value = false
  }, 2000)
}
</script>

<template>
  <CraftBox>
    <div class="flex justify-center items-center">
      <div
        class="clipboard w-8 h-8 p-2 scale-200 rounded-md cursor-pointer [transition:background_0.2s_ease] hover:[background:rgba(0,0,0,0.1)] dark:hover:[background:rgba(255,255,255,0.1)]"
        :class="[clipboard ? 'copied' : '']"
        @click="switchClass"
      >
        <svg
          class="op-90 [transition:opacity_0.2s_ease] hover:op-100"
          viewBox="0 0 16 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="[stroke-width:1.5] stroke-black fill-white dark:stroke-white dark:fill-black [stroke-linecap:round] [stroke-linejoin:round]"
            d="M3 12.75V4.25C3 3.42157 3.67157 2.75 4.5 2.75H12C12.8284 2.75 13.5 3.42157 13.5 4.25V12.75C13.5 13.5784 12.8284 14.25 12 14.25H4.5C3.67157 14.25 3 13.5784 3 12.75Z"
          />
          <path
            d="M3 12.75V4.25C3 3.42157 3.67157 2.75 4.5 2.75H12C12.8284 2.75 13.5 3.42157 13.5 4.25V12.75C13.5 13.5784 12.8284 14.25 12 14.25H4.5C3.67157 14.25 3 13.5784 3 12.75Z"
            class="[stroke-width:1.5] stroke-black fill-white dark:stroke-white dark:fill-black [stroke-linecap:round] [stroke-linejoin:round] origin-center"
            :class="[clipboard ? '[animation:copiedPage_2s_ease_forwards]' : '']"
          />
          <path
            d="M6.25 9.75L7.75 11.25L10.25 7.75"
            class="[stroke-width:1.5] fill-white dark:fill-black [stroke-linecap:round] [stroke-linejoin:round] origin-center stroke-#83F5AD [stroke-dasharray:8] [stroke-dashoffset:8] check"
            :class="[clipboard ? '[transition:all_.5s_ease] [animation:copiedPage_2s_ease_forwards]' : '']"
          />
          <path
            class="[stroke-width:1.5] stroke-black fill-white dark:stroke-white dark:fill-black [stroke-linecap:round] [stroke-linejoin:round]"
            d="M7 1.75001C6.72386 1.75001 6.5 1.97387 6.5 2.25001V3.5C6.5 4.4665 7.2835 5.25 8.25 5.25C9.2165 5.25 10 4.4665 10 3.5V2.25C10 1.97386 9.77614 1.75 9.5 1.75L7 1.75001Z"
          />
        </svg>
      </div>
    </div>
  </CraftBox>
</template>

<style>
@keyframes copiedPage {
  0% {
    transform: rotate(0) translateY(0);
    opacity: 1;
  }
  50% {
    transform: rotate(0) translateY(0);
    opacity: 1;
  }
  100% {
    transform: rotate(10deg) translateY(16px);
    opacity: 0;
  }
}
</style>

<style>
.clipboard.copied svg path.check {
  stroke-dasharray: 16;
}
</style>
