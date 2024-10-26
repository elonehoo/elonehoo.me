<script setup lang="ts">
const props = defineProps<{
  title: string
  items: any[]
}>()
</script>

<template>
  <div class="w-full">
    <!-- title -->
    <h2
      class="title
      mb-0.8em pt-0.3em leading-[1.2] op-100
      text-5 font-400 text-main text-left
      sticky top-3 w-full flex-[1_0_100%]"
    >
      <div>
        {{ props.title }}
        <span class="count">{{ props.items.length }} 个项目</span>
      </div>
    </h2>
    <div class="flex flex-wrap flex-row">
      <ProjectsItem v-for="item in props.items" :key="item.title" :item="item" />
    </div>
  </div>
</template>

<style scoped>
.title{
  transition: var(--transition);
}
.count {
  color: #989898;
  &::before {
    content: "▪︎";
    margin: 0 .5em;
    font-size: .9em;
    color: #d5d5d5;
  }
}
</style>
