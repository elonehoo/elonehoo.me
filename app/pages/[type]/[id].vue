<script setup lang="ts">
import dayjs from 'dayjs'

definePageMeta({
  layout: 'default',
  outline: false,
})

const route = useRoute()

const { data } = await useAsyncData(() => {
  return queryCollection('content')
    .where('path', 'LIKE', `%${route.params.id}%`)
    .first()
})

useSeoMeta({
  title: `${data.value?.seo.title} - Elone Hoo`,
  description: data.value?.seo.description,
})
</script>

<template>
  <div>
    <h1
      class="
      font-medium flex items-center gap-x-1.5 text-18px pt-2 mt-4
      before:content-['#'] before:text-action
      before:flex before:justify-center before:items-center
    "
    >
      <slot>
        {{ data?.title }}
      </slot>
    </h1>
    <div class="op-50 flex mt-1">
      <span>{{ dayjs(data?.date).format('M月D日') }}</span>
      <span class="mx-1">•</span>
      <span>{{ data?.duration }}</span>
    </div>
    <ContentRenderer
      v-if="data"
      :value="data"
      class="prose-md"
    />
  </div>
</template>
