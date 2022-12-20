<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref<boolean>(document.documentElement.classList.toggle('dark'))

const storageKey = 'vueuse-color-scheme'

typeof localStorage !== 'undefined' ? useAppearance() : () => {}

function useAppearance() {
  let userPreference = localStorage.getItem(storageKey) || 'auto'
  const query = window.matchMedia(`(prefers-color-scheme: dark)`)
  const classList = document.documentElement.classList
  const setClass = (dark: boolean) => classList[dark ? 'add' : 'remove']('dark')
  query.onchange = (e) => {
    if (userPreference === 'auto') {
      setClass((isDark.value = e.matches))
    }
  }
  const toggle = () => {
    setClass((isDark.value = !isDark))
    localStorage.setItem(
      storageKey,
      (userPreference = isDark
        ? query.matches
          ? 'auto'
          : 'dark'
        : query.matches
        ? 'light'
        : 'auto')
    )
  }
  isDark.value = document.documentElement.classList.toggle('dark')
  return toggle
}
</script>

<template>
  <div class="header z-40">
    <a
      class="w-20 h-20 absolute lg:fixed m-6 select-none outline-none"
      href="/"
      focusable="false"
    >
      <img v-show="!isDark" src="/logo-dark.svg" alt="logo">
      <img v-show="isDark" src="/logo.svg" alt="logo">
    </a>
    <nav class="nav">
      <div class="spacer" />
      <div class="right">
        <a href="/posts" title="Blog">
          <span class="lt-md:hidden">Blog</span>
          <div i-ri-article-line md:hidden />
        </a>
        <a href="/projects" title="Projects">
          <span class="lt-md:hidden">Projects</span>
          <div i-ri-lightbulb-line class="md:hidden" />
        </a>
        <a href="https://twitter.com/elonehoo" target="_blank" title="Twitter" class="lt-md:hidden">
          <div i-feather-twitter />
        </a>
        <a href="https://github.com/elonehoo" target="_blank" title="GitHub">
          <div i-uil-github-alt />
        </a>
        <a href="/feed.xml" target="_blank" title="RSS" class="lt-md:hidden">
          <div i-la-rss-square style="font-size:1.25rem; margin: 0 -0.125rem;" />
        </a>
        <a title="Toggle Color Scheme" @click="useAppearance()" >
          <div  class="i-uil-sun dark:i-uil-moon" />
        </a>
      </div>
    </nav>
  </div>
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
  padding: 2rem;
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
</style>
