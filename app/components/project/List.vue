<script setup lang="ts">
const { data } = await useAsyncData(() => {
  return queryCollection('content')
    .path('/projects')
    .first()
})

const list = computed(() => data.value?.meta.projects)
</script>

<template>
  <div v-if="list" class="not-prose mt-10 space-y-8">
    <section v-for="(group, name) in list" :key="name" class="space-y-4">
      <OnlyTitle size="sm" :value="name" />
      <div>
        <ProjectItem
          v-for="record in group"
          :key="record.name"
          :record="record"
        />
      </div>
    </section>
  </div>
</template>
