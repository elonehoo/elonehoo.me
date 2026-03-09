<script setup lang="ts">
const route = useRoute()

const { data } = await useAsyncData(() => {
  return queryCollection('content')
    .where('path', 'LIKE', `%/${route.params.id}`)
    .first()
})

const list = computed(() => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  return (id && data.value?.meta[id]) ?? []
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
