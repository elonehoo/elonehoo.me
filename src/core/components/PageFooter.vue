<script setup lang="ts">
import { useConfig } from '~/vitepress/composables/config'
import PageFooterSocialItem from './PageFooterSocialItem.vue'
import PageFooterSubscribeItem from './PageFooterSubscribeItem.vue'

const { config } = useConfig()
</script>

<template>
  <div class="home-page">
    <div class="section quote">
      <div class="home-page-title font-bold text-2xl relative text-foreground">
        {{ config.footer?.page?.briefly }}
      </div>
    </div>
    <!-- social -->
    <div class="section sub">
      <div class="title font-bold text-foreground leading-[1.1] text-right mr-[1em] mt-[0.2em]">
        关注
      </div>
      <div class=" mt-[0.2em] leading-[1.5]">
        <ul class="list-outside list-none ml-0 m-0 p-0 [counter-reset:item]">
          <PageFooterSocialItem v-for="item in config.socialLinks" :key="item.link" :item="item" />
        </ul>
      </div>
    </div>
    <!-- follow -->
    <div class="section follow">
      <div class="title font-bold text-foreground leading-[1.1] text-right mr-[1em] mt-[0.2em]">
        订阅
      </div>
      <div class=" mt-[0.2em] leading-[1.5]">
        <ul class="list-outside list-none ml-0 m-0 p-0 [counter-reset:item]">
          <PageFooterSubscribeItem v-for="item in config.subscribeLinks" :key="item.link" :item="item" />
        </ul>
      </div>
    </div>
    <!-- desc -->
    <div class="section extra">
      <div class="max-w-21em font-bold relative inner">
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

.section.quote {
  --at-apply: flex-auto flex items-center p-0;
}

.home-page .section~.section {
  margin-left: calc(var(--h-margin)* 2);
}

.home-page-title::before {
  --at-apply: absolute top-[0.1em] left-[-0.2em] text-foreground op-10 font-normal text-[4.5em];
  content: "“";
  font-family: Georgia, 'Times New Roman', Times, serif;
}

@media (max-width: 1070px) {
  .home-page {
      flex-wrap: wrap;
      justify-content: stretch;
  }
  .home-page .section~.section {
      margin-left: 0;
  }
  .home-page .section {
    flex: 1 0 auto;
  }
  .section.quote {
    flex-basis: 100%;
    padding: var(--h-margin) 0;
    margin-bottom: calc(var(--h-margin)* 1);
    border-bottom: var(--standard-border);
  }
  .section.sub, .section.follow {
    flex-basis: 70%;
    flex-direction: column;
    & li {
      display: inline;
    }
    & .title {
        text-align: left;
        margin: .2em 0 1em;
    }
  }
  .section.follow {
    flex-basis: 30%;
    flex-direction: column;
    & li {
      display: inline;
    }
    & .title {
        text-align: left;
        margin: .2em 0 1em;
    }
  }
  .section.extra {
    flex-basis: 100%;
    padding-top: var(--h-margin);
    margin-top: var(--h-margin);
    border-top: var(--standard-border);
    &>.inner {
      max-width: unset;
    }
  }
}

@media (max-width: 1200px) {
  .section.extra {
    flex-direction: column;
  }
  .extra>.inner {
    max-width: 13em;
  }
}

@media (max-width: 1300px) {
  .extra>.inner {
    max-width: 16em;
  }
}

@media (max-width: 900px) {
    .home-page {
        padding: calc(var(--h-margin)* 1.5) calc(var(--h-margin)* 1.2) calc(var(--h-margin)* 2);
    }
    .home-page::before {
      content: "";
    }
    .section.sub, .section.follow {
        display: none;
    }
    .section.extra {
      margin-top: 0;
      border: none;
    }
}
</style>
