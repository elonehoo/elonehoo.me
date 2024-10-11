<script setup lang="ts">
import Content from './Content.vue'
import Mask from './Mask.vue'
import Nav from './Nav.vue'
</script>

<template>
  <div class="h-screen bg-background mx-12px">
    <Mask />
    <Nav />
    <Content />
  </div>
</template>
