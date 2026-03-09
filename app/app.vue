<script setup lang="ts">
const route = useRoute()

const showBack = computed(() => route.path !== '/')

const outline = computed(() => {
  const outline = route.meta.outline
  return outline || false
})

useSeoMeta({
  title: 'Elone Hoo',
})
</script>

<template>
  <div id="page-top">
    <Background>
      <CustomContent>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
        <div v-if="showBack" class="mt-10 flex justify-between items-center">
          <Back />
          <Top />
        </div>
        <Footer />
      </CustomContent>
      <CustomAside>
        <Outline v-if="outline" />
        <template v-else>
          <Toc />
        </template>
      </CustomAside>
    </Background>
  </div>
</template>
