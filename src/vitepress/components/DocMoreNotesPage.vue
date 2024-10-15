<script setup lang="ts">
import { PageNoteItem } from '../../core'
import { data as notes } from '../../core/data/notes.data'
</script>

<template>
  <PageNoteItem v-for="i in notes" :key="i.url" :item="i" />
</template>
