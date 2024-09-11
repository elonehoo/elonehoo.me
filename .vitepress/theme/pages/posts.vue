<script setup lang="ts">
import { computed } from 'vue'
import Empty from '../components/Empty.vue'
import SubNavBar from '../components/SubNavBar.vue'
import { formatDate, groupByTime } from '../utils'
import { data as posts } from '../utils/post.data'

const groupedList = computed(() => groupByTime(posts))
</script>

<template>
  <SubNavBar />
  <Empty v-if="!posts.length" />
  <ul v-else class="list">
    <div v-for="({ _idx, key, records }) in groupedList" :key="key">
      <div
        v-if="key" class="slide-enter" :style="{
          '--enter-stage': _idx,
          '--enter-step': '60ms',
        }"
        relative
        select-none
        h20
      >
        <span
          text-8em
          absolute
          left--1rem md:left--3rem top--2rem font-bold
          color="transparent "
          transition="all"
          duration="300"
          ease="linear"
          class="dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.15)] [-webkit-text-stroke:1px_rgba(0,0,0,0.15)]"
        >
          {{ key }}
        </span>
      </div>
      <div
        v-for="item in records"
        :key="item.link"
        class="slide-enter cursor-pointer"
        :style="{
          '--enter-stage': item._idx,
          '--enter-step': '60ms',
        }"
      >
        <a :href="item.frontmatter.redirect ? item.frontmatter.url : item.url" class="item block font-normal mb-6 mt-2 border-none!">
          <li class="no-underline my-2" flex="~ col md:row gap-2 md:items-center">
            <div class="title text-lg leading-1.2em" flex="~ gap-2 wrap">
              <span
                v-if="item.lang === 'zh' && !item.frontmatter.upcoming"
                class="text-xs bg-zinc:15 text-zinc5 rounded px-1 py-0.5 ml--12 mr2 my-auto hidden md:block align-middle flex-none"
              >
                中文
              </span>
              <span align-middle>{{ item.title }}</span>
            </div>
            <div flex="~ gap-2 items-center">
              <span
                v-if="item.frontmatter.redirect"
                class="align-middle op50 flex-none text-xs ml--1 mt--1"
                i-carbon-arrow-up-right
                title="External"
              />
              <span
                v-if="item.frontmatter.recording || item.frontmatter.video"
                class="align-middle op50 flex-none i-ri-movie-line text-red5"
                title="Provided in video"
              />
              <span class="text-sm op50 ws-nowrap">{{ formatDate(item.frontmatter.date, true) }}</span>
              <span v-if="item.frontmatter.duration" text-sm op40 ws-nowrap>· {{ item.frontmatter.duration }}</span>
              <span
                v-if="item.frontmatter.lang === 'zh'"
                align-middle flex-none
                class="text-xs bg-zinc:15 text-zinc5 rounded px-1 py-0.5 my-auto md:hidden"
              >中文</span>
            </div>
          </li>
          <div v-if="item.frontmatter.description" class="op50 text-sm hidden mt--1 md:block">
            {{ item.frontmatter.description }}
          </div>
        </a>
      </div>
    </div>
  </ul>
</template>
