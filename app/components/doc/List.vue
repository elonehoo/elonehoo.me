<script setup lang="ts">
const route = useRoute()

const contentId = computed(() => getRouteParam(route.params.id))

const listKey = computed(() => `doc-list:${contentId.value}`)

const { data } = await useAsyncData(
  listKey,
  () => {
    return queryCollection('content')
      .where('path', 'LIKE', `/${contentId.value}/%`)
      .all()
  },
)

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
