<script setup lang="ts">

</script>

<template>
  <div class="mt-[--h-margin] pt-[--h-margin]">
    <section class="page-about">
      <h1 class="text-[calc(.3vmax_+_.3vmin_+_1.5rem)] font-bold text-foreground leading-1.26">
        <span class="after:content-['~'] after:mx-2 after:text-main">elonehoo.me</span>
        <span>关于我</span>
      </h1>
      <div
        class="
        w-full flex flex-wrap border-t border-t-dotted border-t-border
        mt-[calc(var(--h-margin)_*_2)]
        pt-[--h-margin]"
      >
        <!-- desc -->
        <div
          class="
          basis-69% pt-0 pb-6 border-none m-0 shrink-2 grow
          font-400 text-left flex items-center flex-col
          "
        >
          <div
            class="
            w-full pr-[calc(2rem_+_2vw)] border-r border-r-dotted border-r-border h-full
            mb-2 text-foreground/60 leading-7 prose-doc"
          >
            <slot name="desc" />
          </div>
        </div>
        <!-- action -->
        <div
          class="
          basis-22% pt-0 pb-6 border-none m-0 shrink-2 grow
          font-400 text-left flex items-center flex-col"
        >
          <div class="pl-[calc(2rem_+_2vw)] w-full">
            <!-- desc -->
            <div class="text-foreground/55 mb-2 text-center font-400">
              目前已经发布的博客中共有：
            </div>
            <!-- data -->
            <div class="w-full">
              <AboutData />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
