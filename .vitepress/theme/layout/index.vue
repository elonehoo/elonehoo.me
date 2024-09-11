<script lang="ts" setup>
import BackTop from '../components/BackTop.vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import Main from '../components/Main.vue'
</script>

<template>
  <div class="me layout-me">
    <Header />
    <Main>
      <Footer />
    </Main>
    <BackTop />
  </div>
</template>

<style scoped>
.layout-me {
  @apply min-h-100vh;
}
</style>
