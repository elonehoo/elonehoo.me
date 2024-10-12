<script setup lang="ts">
import { useConfig } from '~/vitepress/composables/config'
import PageFooterSocialItem from './PageFooterSocialItem.vue'
import PageFooterSubscribeItem from './PageFooterSubscribeItem.vue'

const { config } = useConfig()
</script>

<template>
  <div class="home-page">
    <div class="section flex-auto! flex! items-center! p-0!">
      <div class="home-page-title font-bold text-2xl relative text-foreground">
        {{ config.footer?.page?.briefly }}
      </div>
    </div>
    <!-- social -->
    <div class="section">
      <div class="font-bold text-foreground leading-[1.1] text-right mr-[1em] mt-[0.2em]">
        关注
      </div>
      <div class=" mt-[0.2em] leading-[1.5]">
        <ul class="list-outside list-none ml-0 m-0 p-0 [counter-reset:item]">
          <PageFooterSocialItem v-for="item in config.socialLinks" :key="item.link" :item="item" />
        </ul>
      </div>
    </div>
    <!-- follow -->
    <div class="section">
      <div class="font-bold text-foreground leading-[1.1] text-right mr-[1em] mt-[0.2em]">
        订阅
      </div>
      <div class=" mt-[0.2em] leading-[1.5]">
        <ul class="list-outside list-none ml-0 m-0 p-0 [counter-reset:item]">
          <PageFooterSubscribeItem v-for="item in config.subscribeLinks" :key="item.link" :item="item" />
        </ul>
      </div>
    </div>
    <!-- desc -->
    <div class="section">
      <div class="max-w-21em font-bold relative">
        {{ config.footer?.page?.slogan?.content }}
        <em class="float-right font-normal mt-[1em] not-italic text-foreground/60">—— {{ config.footer?.page?.slogan?.author }}</em>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  --at-apply:
    text-sm leading-[1.6] text-foreground border-t border-t-dotted border-t-border
    flex justify-between relative ml-[--nav-width];
  padding: calc(var(--h-margin)* 1.5) calc(var(--h-margin)* 1.5) var(--h-margin) calc(var(--h-margin)* 2);
}

.home-page::before {
  --at-apply: text-foreground text-[10vw] absolute bottom-[-0.20em] font-bold opacity-[0.06] leading-none left-[1em];
  content: "elonehoo.me";
  animation: footer-show 1s ease-in-out;
  animation-timeline: scroll(root);
  user-select: none;
  pointer-events: none;
}

.home-page .section {
  --at-apply: flex p-0;
    flex: 0 0 auto;
}

.home-page .section~.section {
  margin-left: calc(var(--h-margin)* 2);
}

.home-page-title::before {
  --at-apply: absolute top-[0.1em] left-[-0.2em] text-foreground op-10 font-normal text-[4.5em];
  content: "“";
  font-family: Georgia, 'Times New Roman', Times, serif;
}

@keyframes footer-show {
  0% {
    opacity: 0
  }
  67% {
    opacity: 0;
    translate: .5em 0;
    letter-spacing: .1em
  }
  100% {
    opacity: .06;
    translate: none;
    letter-spacing: 0
  }
}
</style>
