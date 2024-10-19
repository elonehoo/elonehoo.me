<script setup lang="ts">
import { data as NoteDataList } from '~/core/data/notes.data'
import { data as PostDataList } from '~/core/data/posts.data'
</script>

<template>
  <div class="text-center inline-flex items-center mx-2 leading-[1]">
    <strong class="text-foreground text-2.5em font-bold ">{{ PostDataList.length }}</strong>
    <em class="text-3.4 leading-[1.15] ml-0.5em font-400 text-foreground/60">篇博客</em>
  </div>
  <div class="text-center inline-flex items-center mx-2 leading-[1]">
    <strong class="text-foreground text-2.5em font-bold ">{{ NoteDataList.length }}</strong>
    <em class="text-3.4 leading-[1.15] ml-0.5em font-400 text-foreground/60">篇随笔</em>
  </div>
</template>
