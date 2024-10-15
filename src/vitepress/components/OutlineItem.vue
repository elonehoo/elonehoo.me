<script setup lang="ts">
import type { MenuItemWithLinkAndChildren } from '../composables/outline'
import { Link } from 'destyler'
import { decode } from 'tiny-decode'

const props = defineProps<{
  headers: MenuItemWithLinkAndChildren[]
  nested?: boolean
}>()

function onClick({ target: el }: Event) {
  const id = `#${(el as HTMLAnchorElement).href!.split('#')[1]}`
  const heading = document.querySelector<HTMLAnchorElement>(
    decodeURIComponent(id),
  )
  heading?.focus()
}
</script>

<template>
  <ul :class="props.nested ? 'nested' : 'root'">
    <li v-for="{ children, link, text, hidden } in props.headers" :key="link">
      <Link
        v-show="!hidden"
        class="
        text-foreground/60 hover:text-foreground leading-7 text-sm
        hover:border-b hover:border-b-solid hover:border-b-main text-ellipsis "
        :to="link"
        @click="onClick"
      >
        {{ decode(text) }}
      </Link>
      <template v-if="children?.length">
        <OutlineItem :headers="children" :nested="true" />
      </template>
    </li>
  </ul>
</template>

<style scoped>
.root {
  --at-apply: relative z-1;
}

.nested {
  --at-apply: pl-4;
}
</style>
