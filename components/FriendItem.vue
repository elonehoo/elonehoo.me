<script setup lang="ts">
const props = defineProps<{
  avatar?: string
  name?: string
  desc?: string
  github?: string
  twitter?: string
  blog?: string
}>()
</script>

<template>
  <div class="rounded-xl overflow-hidden relative text-center p-4 group items-center flex flex-col max-w-16rem hover:shadow-2xl transition-all duration-500 shadow-xl dark:shadow-dark-900/90">
    <div class="text-gray-500 group-hover:scale-105 transition-all">
      <img class="w-16! h-16! rounded-full!" :src="props.avatar">
    </div>
    <div class="group-hover:pb-10 transition-all duration-500 delay-200">
      <h1 class="font-semibold! text-lg!">
        {{ props.name }}
      </h1>
      <p v-if="props.desc" class="text-sm!">
        {{ props.desc }}
      </p>
    </div>
    <div class="flex items-center transition-all duration-500 delay-200 group-hover:bottom-3 -bottom-full absolute gap-2 justify-evenly w-full">
      <div class="flex gap-3 text-2xl bg-gray-300 text-black dark:bg-dark-700 dark:text-white p-2 transition-all duration-500 delay-200 rounded-full shadow-sm">
        <a
          v-if="props.github"
          class="hover:scale-110 transition-all duration-500 delay-200 no-underline! cursor-pointer"
          :href="props.github"
          target="_blank"
        >
          <Icon name="ri:github-fill" />
        </a>
        <a
          v-if="props.twitter"
          class="hover:scale-110 transition-all duration-500 delay-200 no-underline! cursor-pointer"
          :href="props.twitter"
          target="_blank"
        >
          <Icon name="ri:twitter-x-fill" />
        </a>
        <a
          v-if="props.blog"
          class="hover:scale-110 transition-all duration-500 delay-200 no-underline! cursor-pointer"
          :href="props.blog"
          target="_blank"
        >
          <Icon name="ri:blogger-fill" />
        </a>
      </div>
    </div>
  </div>
</template>
