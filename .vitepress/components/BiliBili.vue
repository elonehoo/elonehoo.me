<script setup lang="ts">
import { calcHeight } from '../theme/utils/calc'
import { isBrowser } from '../theme/utils/isBrowser'

const props = defineProps<{
  aid: string
  page?: number
  isWide?: boolean
  highQuality?: boolean
  hasDanmaku?: boolean
  aspectWidth?: number
  aspectHeight?: number
  width?: string | number
  height?: string | number
  iframeClass?: string

}>()

const aid = props.aid
const page = props.page || 1
const isWide = props.isWide || true
const highQuality = props.highQuality || true
const hasDanmaku = props.hasDanmaku || true

const defaultAspectWidth = isBrowser ? 4 : 16
const defaultAspectHeight = isBrowser ? 3 : 9
const aspectWidth = props.aspectWidth || defaultAspectWidth
const aspectHeight = props.aspectHeight || defaultAspectHeight
const width = props.width || 650
const height = calcHeight(width, props.height, aspectWidth, aspectHeight)

const iframeClassImp = props.iframeClass || ''
const highQualityValue = highQuality ? 1 : 0
const wideValue = isWide ? 1 : 0
const danmakuValue = hasDanmaku ? 1 : 0

const bilibiliUrl = '//player.bilibili.com/player.html'

const iframeSrc = `${bilibiliUrl}?aid=${aid}&page=${page}&high_quality=${highQualityValue}&as_wide=${wideValue}&danmaku=${danmakuValue}`
</script>

<template>
  <iframe
    :width="width"
    :height="height"
    :src="iframeSrc"
    :allowFullScreen="true"
    :class="{ iframeClassImp }"
  />
</template>
