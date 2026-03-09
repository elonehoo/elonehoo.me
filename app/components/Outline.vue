<script setup lang="ts">
const { config } = useAppConfig()
</script>

<template>
  <div class="op-0 lg:op-100 lg:fixed lg:top-12 lg:right-12">
    <AsideItem
      v-for="social in config.socialLinks"
      :key="social.link"
      :link="social.link"
      :icon="social.icon"
    >
      {{ social.icon }}
    </AsideItem>
  </div>
</template>
