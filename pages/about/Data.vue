<script setup lang="ts">
import { data as DemoDataList } from '@/demos.data'
import { data as GalleryDataList } from '@/gallerys.data'
import { data as NoteDataList } from '@/notes.data'
import { data as PostDataList } from '@/posts.data'
import { data as TalkDataList } from '@/talks.data'
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
  <div class="text-center inline-flex items-center mx-2 leading-[1]">
    <strong class="text-foreground text-2.5em font-bold ">{{ DemoDataList.length }}</strong>
    <em class="text-3.4 leading-[1.15] ml-0.5em font-400 text-foreground/60">个设计小样</em>
  </div>
  <div class="text-center inline-flex items-center mx-2 leading-[1]">
    <strong class="text-foreground text-2.5em font-bold ">{{ GalleryDataList.length }}</strong>
    <em class="text-3.4 leading-[1.15] ml-0.5em font-400 text-foreground/60">期主题照片</em>
  </div>
  <div class="text-center inline-flex items-center mx-2 leading-[1]">
    <strong class="text-foreground text-2.5em font-bold ">{{ TalkDataList.length }}</strong>
    <em class="text-3.4 leading-[1.15] ml-0.5em font-400 text-foreground/60">个主题分享</em>
  </div>
</template>
