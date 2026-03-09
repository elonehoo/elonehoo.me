<script setup lang="ts">
const route = useRoute()

const { data } = await useAsyncData(() => {
  return queryCollection('content')
    .where('path', 'LIKE', `%/${route.params.id}/%`)
    .all()
})

const list = computed(() => groupByTime(data.value ?? [], post => post.date))
</script>

<template>
  <div v-if="list.length" class="not-prose mt-10 space-y-8">
    <section v-for="group in list" :key="group.key" class="space-y-4">
      <OnlyTitle :value="group.key" />
      <div>
        <DocItem
          v-for="record in group.records"
          :key="record.path"
          :record="record"
        />
      </div>
    </section>
  </div>
</template>
