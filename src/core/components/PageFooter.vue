<script setup lang="ts">
import { Link } from 'destyler'
</script>

<template>
  <div class="home-page">
    <div class="section flex-auto flex items-center p-0">
      <div class="home-page-title font-bold text-2xl relative text-foreground">
        一个热爱开源，但是工作效率很低的码农
      </div>
    </div>
    <div class="section">
      <!-- follow -->
      <div class="font-bold text-foreground leading-[1.1] text-right mr-[1em] mt-[0.2em]">
        订阅
      </div>
      <div class="leading-none">
        <ul class="list-outside list-none ml-0 m-0 p-0 [counter-reset:item]">
          <li>
            <Link
              class="
              flex items-center border-b border-b-dotted border-b-border mb-0.5em cursor-pointer text-foreground/60"
            >
              RSS
            </Link>
          </li>
        </ul>
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
  --at-apply: text-foreground text-[10vw] absolute bottom-[-0.25em] font-bold opacity-[0.06] leading-none left-[1em];
  content: "elonehoo.me";
  animation: footer-show 1s ease-in-out;
  animation-timeline: scroll(root);
  user-select: none;
  pointer-events: none;
}

.home-page .section {
    display: flex;
    padding: 0;
    flex: 0 0 auto;
}

.home-page .section~.section {
  margin-left: calc(var(--h-margin)* 2);
}

.home-page-title::before {
  --at-apply: absolute top-[-0.55em] left-[-0.2em] text-foreground op-0.1 font-normal text-[4.5em] z-[-1];
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
