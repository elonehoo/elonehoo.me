<script setup lang="ts">
const props = defineProps<{
  items: Record<string, any[]>
}>()
</script>

<template>
  <article class="mt-[--h-margin] pt-[--h-margin] px-[calc(var(--h-margin)*2)]">
    <div class="border-r-none block h-auto">
      <Title class="pl-0!">
        常用的工具
      </Title>

      <div class="wrapper flex flex-wrap flex-row pt-[calc(var(--h-margin)_*_2)] mb-4em">
        <!--  -->
        <BookmarksList
          v-for="(key, index) in Object.keys(props.items)"
          :key="key"
          :class="index === 0 ? 'mt-0' : 'mt-[calc(var(--h-margin)_*_1.5)]'"
          :title="key"
          :items="props.items[key]"
        />
      </div>
    </div>
  </article>
</template>
