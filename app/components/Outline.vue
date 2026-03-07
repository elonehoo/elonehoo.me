<script setup lang="ts">
const { config } = useAppConfig()
</script>

<template>
  <AsideItem
    v-for="social in config.socialLinks"
    :key="social.link"
    :link="social.link"
    :icon="social.icon"
  >
    {{ social.icon }}
  </AsideItem>
</template>
