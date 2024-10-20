<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="mt-[--h-margin] pt-[--h-margin]">
    <section class="page-about">
      <h1 class="text-[calc(.3vmax_+_.3vmin_+_1.5rem)] font-bold text-foreground leading-1.26 pl-[calc(var(--h-margin)*2)]">
        <span class="after:content-['~'] after:mx-2 after:text-main">elonehoo.me</span>
        <span>{{ props.title }}</span>
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
          font-400 text-left flex items-center flex-col pl-[calc(var(--h-margin)*2)]
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
        <!-- slash -->
        <div class="single-host font-3 border-y border-y-dotted border-y-border p-0 block m-0 basis-full font-400 text-left shrink-2 grow-1">
          <div
            class="
            pt-9.6 pb-4.8 pl-[calc(var(--h-margin)*2)] pr-[--h-margin]
            [background-image:var(--pattern-bg)] prose-doc text-foreground/60 leading-7"
          >
            <div class="font-bold text-4.8 leading-[1.1] text-foreground inline-block mb-2">
              斜杠属性
            </div>
            <!-- desc -->
            <slot name="slash" />
          </div>
        </div>
        <!-- equipment -->
        <div class="single-host-2 single-host font-3 border-y border-y-dotted border-y-border p-0 block m-0 basis-1/3 font-400 text-left shrink-2 grow-1">
          <div
            class="
            pt-9.6 pb-4.8 pl-[calc(var(--h-margin)*2)] pr-[--h-margin]
            [background-image:var(--pattern-bg)] prose-doc text-foreground/60 leading-7"
          >
            <div class="font-bold text-4.8 leading-[1.1] text-foreground inline-block mb-2">
              设备
            </div>
            <!-- desc -->
            <slot name="equipment" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.single-host {
  transition: var(--transition);
  animation: right-in calc(2 * var(--duration)) var(--curve) both;
}

.single-host-2 {
  animation-delay: calc(0.5 * var(--duration));
}

.single-host-3 {
  animation-delay: calc(1 * var(--duration));
}

@keyframes right-in {
    0% {
        translate: 3vw 0;
        opacity: 0
    }

    100% {
        translate: none;
        opacity: 1
    }
}
</style>
