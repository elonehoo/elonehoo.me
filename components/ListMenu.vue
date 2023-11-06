<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  showYear?: boolean
}>(), {
  showYear: false,
})

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

const routers = navigation.value
  ?.filter(i => i._path.startsWith(`/${props.name}`))[0]
  .children
  ?.sort((a, b) => +new Date(b.date) - +new Date(a.date))
  .filter(i => !i._path.endsWith('.html'))
  .map(i => ({
    path: i._path,
    title: i.title,
    date: i.date,
    lang: i.lang,
    duration: i.duration,
    recording: i.recording,
    upcoming: i.upcoming,
  }))

// const posts = computed(() => routers.filter(i => !englishOnly.value || i.lang !== 'zh'))
const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isSameYear = (a: Date | string | number, b: Date | string | number) => a && b && getYear(a) === getYear(b)
</script>

<template>
  <ul>
    <template v-if="!routers?.length">
      <div py2 op50>
        { nothing here yet }
      </div>
    </template>

    <template v-for="route, idx in routers" :key="route.path">
      <div v-if="props.showYear && !isSameYear(route.date, routers![idx - 1]?.date)" relative h20 pointer-events-none class="slide-enter" style="--enter-stage: -2; --enter-step: 60ms;">
        <span text-8em op10 absolute left--3rem top--2rem font-bold>{{ getYear(route.date) }}</span>
      </div>
      <div class="slide-enter" :style="`--enter-stage: ${idx}; --enter-step: 60ms;`">
        <nuxt-link
          class="item block font-normal mb-6 mt-2 no-underline "
          :to="route.path"
        >
          <li class="no-underline">
            <div class="title text-lg leading-1.2em">
              <span
                v-if="route.lang === 'zh' && !route.upcoming"
                align-middle
                class="text-xs border border-current rounded px-1 pb-0.2 md:ml--10.5 mr2"
              >中文</span>
              <span
                v-if="route.upcoming"
                align-middle
                class="text-xs border rounded px-1 pb-0.2 md:ml--19 mr2 bg-lime/10 border-lime text-lime"
              >upcoming</span>
              <span align-middle>{{ route.title }}</span>
              <span
                v-if="route.recording"
                align-middle mx1 text-red5
                i-ri-movie-line
                title="Has recording playback"
              />
            </div>
            <div class="time opacity-50 text-sm">
              {{ formatDate(route.date) }}
              <span v-if="route.duration" op80>· {{ route.duration }}</span>
            </div>
          </li>
        </nuxt-link>
      </div>
    </template>
  </ul>
</template>
