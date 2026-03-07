<script setup lang="ts">
const { data } = await useAsyncData(() => {
  return queryCollection('content')
    .where('path', 'LIKE', '%/talks/%')
    .all()
})

const groupedPosts = computed(() => groupByTime(data.value ?? [], post => post.date))
</script>

<template>
  <div class="prose-md">
    <slot />
    <div v-if="groupedPosts.length" class="not-prose mt-10 space-y-8">
      <section v-for="group in groupedPosts" :key="group.key" class="space-y-4">
        <OnlyTitle :value="group.key" />
        <div>
          <PostItems
            v-for="record in group.records"
            :key="record.path"
            :record="record"
          />
        </div>
      </section>
    </div>
  </div>
</template>
