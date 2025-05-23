<script setup lang="ts">
import type { Vector } from './utils/vector'
import HexToggle from './components/HexToggle.vue'
import HexTurns from './components/HexTurns.vue'
import { noop, range, shuffle } from './utils'
import { initCanvas } from './utils/canvas'
import { get, pick, r30, r60 } from './utils/vector'

const el = ref<HTMLCanvasElement | null>(null)

const f = {
  run: noop,
}

const showHexagon = ref(false)
const patterns = ['*?', 'p0', 'p1', 'p2', 'p3']
const mode = ref(pick(patterns))

watch([showHexagon, mode], () => f.run())

onMounted(() => {
  const canvas = el.value!
  const { ctx } = initCanvas(canvas, 300, 300)
  const SQRT_3 = Math.sqrt(3)

  const drawHexagon = (x: number, y: number, size: number) => {
    const points: [number, number][] = Array.from({ length: 6 })
      .fill(0)
      .map((_, i) => [
        x + size * Math.cos(i % 6 * 2 * Math.PI / 6),
        y + size * Math.sin(i * 2 * Math.PI / 6),
      ])

    const midPoints: [number, number][] = points
      .map((_, i) => {
        const [x1, y1] = points[i]
        const [x2, y2] = points[(i + 1) % 6]
        return [(x1 + x2) / 2, (y1 + y2) / 2]
      })

    ctx.strokeStyle = '#9da3ae'
    ctx.lineWidth = 1

    if (showHexagon.value) {
      ctx.beginPath()
      ctx.moveTo(...points[0])
      points.forEach(([x, y]) => ctx.lineTo(x, y))
      ctx.stroke()
    }

    function drawArc1(offset: number) {
      ctx.beginPath()
      ctx.arc(...get(points, offset), size / 2, r60 * (2 + offset), r60 * (4 + offset))
      ctx.stroke()
    }
    function drawArc2(offset: number) {
      const point: Vector = [
        x + size * Math.cos(offset * r60 + r30) * SQRT_3,
        y + size * Math.sin(offset * r60 + r30) * SQRT_3,
      ]

      ctx.beginPath()
      ctx.arc(...point, size * 1.5, r60 * (offset + 3), r60 * (offset + 4))
      ctx.stroke()
    }
    function drawLineThrough(offset: number) {
      ctx.beginPath()
      ctx.moveTo(...get(midPoints, offset))
      ctx.lineTo(...get(midPoints, offset + 3))
      ctx.stroke()
    }

    const _mode = mode.value === '*?'
      ? pick(patterns.slice(1))
      : mode.value

    if (_mode === 'p1') {
      const offset = Math.round(Math.random() * 5)
      drawArc1(offset)
      drawArc1(offset + 3)
      drawLineThrough(offset + 1)
    }
    else if (_mode === 'p2') {
      const offset = Math.round(Math.random() * 5)
      drawArc2(offset)
      drawArc2(offset + 1)
      drawArc1(offset + 4)
    }
    else if (_mode === 'p3') {
      const offset = Math.round(Math.random() * 5)
      drawArc2(offset + 2)
      drawArc2(offset + 5)
      drawLineThrough(offset + 5)
    }
    else {
      const shuffled = shuffle(range(6))

      for (let i = 0; i < 3; i++) {
        const a = shuffled[i * 2]
        const b = shuffled[i * 2 + 1]
        ctx.beginPath()
        ctx.moveTo(...midPoints[a])
        ctx.lineTo(...midPoints[b])
        ctx.stroke()
      }
    }
    // ctx.beginPath()
    // ctx.moveTo(...midPoints[0])
    // midPoints.forEach(([x, y]) => ctx.lineTo(x, y))
    // ctx.stroke()

    // const color = Math.round(Math.random() * 16).toString(16)
    // ctx.fillStyle = `#${color}${color}${color}`
    // ctx.fill()
  }

  f.run = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const size = 30
    const initX = -1
    const initY = 18 - size * SQRT_3

    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 20; y++) {
        const xOffset = (y % 2) ? size * 1.5 : 0
        drawHexagon(
          initX + x * size * 3 + xOffset,
          initY + y * size * SQRT_3 * 0.5,
          size,
        )
      }
    }
  }

  f.run()
})
</script>

<template>
  <div class="py-1 flex justify-end">
    <HexTurns v-model="mode" class="inline-block mr-2" :options="patterns" />
    <HexToggle v-model="showHexagon" class="inline-block mr-2">
      hex
    </HexToggle>
  </div>
  <CraftBox>
    <paper>
      <div class="overflow-hidden">
        <canvas ref="el" @click="f.run()" />
      </div>
    </paper>
  </CraftBox>
</template>
