<script setup lang="ts">
import { isDark } from '~/composables'

const { y: scroll } = useWindowScroll()

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div class="blur w-full ml-0 md:ml-24 fixed top--2 float-right" />
  <header class="header z-40">
    <NuxtLink
      class="w-15 h-15 absolute lg:fixed mt-8 ml-4 select-none outline-none"
      to="/"
      focusable="false"
    >
      <img v-show="isDark" src="/logo-dark.svg" alt="logo">
      <img v-show="!isDark" src="/logo.svg" alt="logo">
    </NuxtLink>
    <button
      title="Scroll to top"
      fixed right-3 bottom-3 w-10 h-10 hover:op100 rounded-full
      hover-bg-hex-8883 transition duration-300 z-100 print:hidden
      :class="scroll > 300 ? 'op30' : 'op0! pointer-events-none'"
      @click="toTop()"
    >
      <div i-ri-arrow-up-line />
    </button>
    <nav class="nav px-8">
      <div class="spacer" />
      <div class="right">
        <NuxtLink to="/posts" title="Blog">
          <span class="lt-md:hidden">Blog</span>
          <div i-ri-article-line md:hidden />
        </NuxtLink>
        <NuxtLink class="lt-md:hidden" to="/talks" title="Talks">
          <span>Talks</span>
        </NuxtLink>
        <NuxtLink to="/projects" title="Projects">
          <span class="lt-md:hidden">Projects</span>
          <div i-ri-lightbulb-line class="md:hidden" />
        </NuxtLink>
        <!-- <NuxtLink to="/talks" class="lt-md:hidden" title="Talks">
          Talks
        </NuxtLink> -->
        <!-- <NuxtLink to="/podcasts" class="lt-md:hidden" title="Podcasts">
          Podcasts
        </NuxtLink>
        <NuxtLink to="/streams" class="lt-md:hidden" title="Streams">
          Streams
        </NuxtLink> -->
        <NuxtLink to="/demos" title="demos">
          <span class="lt-md:hidden">Demos</span>
          <div i-ri-screenshot-line class="md:hidden" />
        </NuxtLink>
        <NuxtLink to="/gallery" title="Gallery">
          <span class="lt-md:hidden">Gallery</span>
          <div i-ri-gallery-line class="md:hidden" />
        </NuxtLink>
        <NuxtLink to="/bookmarks" title="Bookmarks">
          <div i-ri-bookmark-line />
        </NuxtLink>
        <NuxtLink to="/friend" title="Friend">
          <div i-ri-group-line />
        </NuxtLink>
        <NuxtLink class="lt-md:hidden" to="/notes" title="Notes">
          <div i-ri-sticky-note-line />
        </NuxtLink>
        <a href="https://twitter.com/elonehoo" target="_blank" title="Twitter" class="lt-md:hidden">
          <div i-ri-twitter-x-fill />
        </a>
        <a href="https://github.com/elonehoo" target="_blank" title="GitHub" class="lt-md:hidden">
          <div i-uil-github-alt />
        </a>
        <a href="/rss.xml" target="_blank" title="RSS" class="lt-md:hidden">
          <div i-la-rss-square style="font-size:1.25rem; margin: 0 -0.125rem;" />
        </a>
        <toggle-theme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}
.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}
.nav {
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}
.nav > * {
  margin: auto;
}
.nav img {
  margin-bottom: 0;
}
.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}
.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}
.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}
.nav .right > * {
  margin: auto;
}

.dark .blur{
  mask-image: linear-gradient(to bottom,#000 25%,transparent);
}
.blur {
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  pointer-events: none;
  position: sticky;
  height: 2rem;
  z-index: 1;
  backdrop-filter: blur(5px);
  opacity: 1;
  mask-image: linear-gradient(to bottom,#fff 25%,transparent);
}
.blur:after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom,#fff,#fff);
}

.dark .blur:after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom,#000,#000);
}
</style>
