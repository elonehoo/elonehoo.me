<script setup lang="ts">
import { Link } from 'destyler'

const props = defineProps<{
  title: string
  desc: string
  to?: string
}>()
</script>

<template>
  <div class="page-item">
    <Link class="page-item-footer-more" :to="props.to">
      {{ props.title }}
      <em class="page-item-footer-more-desc">
        {{ props.desc }}
      </em>
    </Link>
  </div>
</template>

<style scoped>
.page-item{
  --at-apply: h-auto overflow-hidden pt-[--h-margin] text-sm text-left;
}

@media (max-width: 900px) {
    .page-item {
        padding: 2.5rem 0 3rem;
        text-align: center;
    }
}

.page-item-footer-more {
  --at-apply:
  relative origin-[0_50%] bg-dark text-light
  no-underline inline-block font-bold px-[0.7em] py-[0.4em]
  border border-2px border-solid border-border rounded-md
  cursor-pointer leading-[1.2] touch-manipulation;
  backface-visibility: hidden;
  font-family: inherit;
  outline: none;
  scale: 1.008;
  transition: var(--transition-out);
}

.page-item-footer-more::after {
  --at-apply: ml-0.3em;
  content: "→";
}

.page-item-footer-more:hover{
  --at-apply: text-light bg-main border border-2px border-solid border-main ;
  transition: var(--transition);
  text-decoration: none;
  scale: 1.04;
  outline: none;
  filter: brightness(1.1);
}

.page-item-footer-more-desc{
  --at-apply:
  absolute text-foreground/60 op-0 top-25% overflow-visible
  w-auto block w-15em text-xs font-normal text-left left-110%;
  transition: var(--transition-out);
  translate: -3em 0;

  .page-item-footer-more:hover & {
    opacity: 1;
    translate: 0 0;
    transition: var(--transition);
  }
}
</style>
