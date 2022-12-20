<script setup lang="ts">
import { data as posts } from './post.data'


const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isSameYear = (a: Date | string | number, b: Date | string | number) => a && b && getYear(a) === getYear(b)


</script>

<template>
  <div class="prose m-auto">
    <ul >
      <template v-if="!posts.length">
        <div class="py2 op50">
          <Content />
        </div>
      </template>
      <template v-for="post,idx in posts" :key="post.href">
        <div v-if="!isSameYear(post.date.time, posts[idx - 1]?.date.time)" class="relative h20 pointer-events-none">
          <span class="text-8em op10 absolute left--3rem top--2rem font-bold">{{ getYear(post.date.time) }}</span>
        </div>
        <a :href="post.href" class="item block font-normal mb-6 mt-2 no-underline">
          <li class="no-underline">
            <div class="title text-lg leading-1.2em">
              <span align-middle>{{ post.title }}</span>
            </div>
            <div class="time opacity-50 text-sm">
              {{ post.date?.string }}
              <span v-if="post.duration" op80>· {{ post.duration }}</span>
            </div>
          </li>
        </a>
      </template>
    </ul>
  </div>
</template>
