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
  --at-apply:
    text-foreground text-[10vw] absolute bottom-[-0.20em]
    font-bold opacity-[0.06] leading-none left-[1em]
    select-none pointer-events-none;

  content: "elonehoo.me";
  animation: footer-show 1s ease-in-out;
  animation-timeline: scroll(root);
}

.home-page .section {
  --at-apply: flex p-0 flex-[0_0_auto];
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
    --at-apply: flex-wrap justify-stretch;
  }
  .home-page .section~.section {
    --at-apply: ml-0;
  }
  .home-page .section {
    --at-apply: flex-[1_0_aut];
  }
  .section.quote {
    --at-apply: basis-full;
    padding: var(--h-margin) 0;
    margin-bottom: calc(var(--h-margin)* 1);
    border-bottom: var(--standard-border);
  }
  .section.sub, .section.follow {
    --at-apply: basis-7/10 flex-col;
    & li {
      --at-apply: inline;
    }
    & .title {
      --at-apply: text-left mt-[0.2em] mr-[1em];
    }
  }
  .section.follow {
    --at-apply: basis-3/10 flex-col;
    & li {
      --at-apply: inline;
    }
    & .title {
      --at-apply: text-left mt-[0.2em] mr-[1em];
    }
  }
  .section.extra {
    --at-apply:
      basis-full
      pt-[var(--h-margin)] mt-[var(--h-margin)]
      [border-top:var(--standard-border)];
    &>.inner {
      --at-apply: max-w-[unset];
    }
  }
}

@media (max-width: 1200px) {
  .section.extra {
    --at-apply: flex-col;
  }
  .extra>.inner {
    --at-apply: max-w-[13em];

  }
}

@media (max-width: 1300px) {
  .extra>.inner {
    --at-apply: max-w-[16em];
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
      --at-apply: hidden;
    }
    .section.extra {
      --at-apply: mt-0 border-none;
    }
}
</style>
