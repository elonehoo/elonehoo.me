<script setup lang="ts">
const route = useRoute()

const contentId = computed(() => getRouteParam(route.params.id))

const listKey = computed(() => `link-list:${contentId.value}`)

const { data } = await useAsyncData(
  listKey,
  () => {
    return queryCollection('content')
      .path(`/${contentId.value}`)
      .first()
  },
)

const list = computed(() => {
  return (contentId.value && data.value?.meta[contentId.value]) ?? []
})
</script>

<template>
  <div v-if="list" class="not-prose mt-10 space-y-8">
    <section v-for="(group, name) in list" :key="name" class="space-y-4">
      <OnlyTitle size="sm" :value="name" />
      <div>
        <LinkItem
          v-for="record in group"
          :key="record.name"
          :record="record"
        />
      </div>
    </section>
  </div>
</template>
