<script setup lang="ts">
import { data as notes } from '@/notes.data'
import { PageNoteItem } from '../../core'
</script>

<template>
  <PageNoteItem v-for="i in notes" :key="i.url" :item="i" />
</template>
