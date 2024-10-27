<script setup lang="ts">
</script>

<template>
  <article class="mt-[--h-margin] pt-[--h-margin] px-[calc(var(--h-margin)*2)]">
    <div class="border-r-none block h-auto">
      <Title class="pl-0!">
        <slot name="title" />
      </Title>
      <slot />
    </div>
  </article>
</template>
