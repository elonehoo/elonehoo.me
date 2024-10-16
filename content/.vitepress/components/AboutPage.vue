<script setup lang="ts">

</script>

<template>
  <div class="mt-[--h-margin] pt-[--h-margin]">
    <section class="relative">
      <div>
        <h1 class="text-[calc(.3vmax_+_.3vmin_+_1.5rem)] font-bold text-foreground leading-1.26">
          <span class="after:content-['~'] after:mx-2 after:text-main">elonehoo.me</span>
          <span>关于我</span>
        </h1>
        <slot />
      </div>
    </section>
  </div>
</template>
