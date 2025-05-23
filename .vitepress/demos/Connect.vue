<script setup lang="ts">
import { timestamp, useRafFn } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { random } from './utils'
import { initCanvas } from './utils/canvas'
import { toHex } from './utils/colors'
import { distance } from './utils/vector'

const el = ref<HTMLCanvasElement | null>(null)

const { round, max } = Math

const timeout = 2000
const D = 100

onMounted(async () => {
  const canvas = el.value!
  const { ctx } = initCanvas(canvas, 300, 300)
  const { width, height } = canvas

  let points: [number, number, number][] = []

  function getFade(t = 0, ts = 0) {
    return 1 - (ts - t) / timeout
  }

  function updateCanvas() {
    const ts = timestamp()

    points.push([
      random(500, -100),
      random(500, -100),
      ts,
    ])

    ctx.clearRect(0, 0, width, height)
    ctx.lineWidth = 0.2
    points = points.filter(([x, y, t], idx) => {
      const fade = getFade(t, ts)
      if (fade < 0)
        return false

      if (idx !== 0) {
        for (let ni = 1; ni < idx; ni++) {
          const [x1, y1, t2] = points[ni - 1]
          if (distance([x1, y1], [x, y]) < D) {
            const fade2 = getFade(t2, ts)
            const color = max(0, round(fade * fade2 * 255))
            ctx.strokeStyle = `#7b7b7b${toHex(color)}`
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x, y)
            ctx.stroke()
          }
        }
      }

      return true
    })
  }

  useRafFn(updateCanvas)
})
</script>

<template>
  <CraftBox>
    <paper>
      <div class="overflow-hidden">
        <canvas ref="el" width="450" height="400" />
      </div>
    </paper>
  </CraftBox>
</template>
