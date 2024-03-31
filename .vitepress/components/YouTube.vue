<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import YouTubePlayer from 'youtube-player'

const props = withDefaults(defineProps<{
  id?: string
  src: string
  width?: number
  height?: number
}>(), {
  src: '',
  width: 650,
  height: 400,
})

const emit = defineEmits(['ended', 'play', 'pause'])

function getVideoId() {
  try {
    return new URL(props.src).searchParams.get('v') || ''
  }
  catch (error) {
    return ''
  }
}
let player: any = null
function initPlayer() {
  try {
    player = YouTubePlayer(`youtube-${props.id}`, {
      videoId: getVideoId(),
      width: props.width,
      height: props.height,
      playerVars: {
        playsinline: 1,
      },
    })
  }
  catch (error) {
  }
}

function loadPlayer() {
  try {
    player.loadVideoById(getVideoId())
  }
  catch (error) {
  }
}

const play = () => player && player.playVideo()
const pause = () => player && player.pauseVideo()

// -1（未开始）0（已结束）1（正在播放）2（已暂停）3（正在缓冲）5（视频已插入）
let stateChangeListener: any
function addStateChange() {
  stateChangeListener = player && player.on('stateChange', (event: any) => {
    if (event.data === 0)
      emit('ended')
    if (event.data === 1)
      emit('play')
    if (event.data === 2)
      emit('pause')
  })
}
function removeStateChange() {
  if (stateChangeListener && player)
    player.off(stateChangeListener)
}

watch(
  () => props.src,
  () => loadPlayer(),
)

defineExpose({ play, pause, removeStateChange })

onMounted(() => {
  initPlayer()
  loadPlayer()
  addStateChange()
})

onBeforeUnmount(() => {
  player && player.destroy()
})
</script>

<template>
  <div class="youtube-video">
    <div :id="`youtube-${id}`" />
  </div>
</template>

<style scoped>
.youtube-video {
  width: 100%;
  overflow: hidden;
}
</style>
