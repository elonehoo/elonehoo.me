<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { noop } from '@vueuse/shared'
import Matter from 'matter-js'

const { Bodies, Engine, Render, Runner, World } = Matter

const canvas = ref(null)

const f = {
  add: noop,
}

onMounted(async () => {
  const engine = Engine.create()
  const render = Render.create({
    element: canvas.value!,
    engine,
    options: {
      width: 400,
      height: 318,
      background: 'transparent',
      wireframes: false,
      // @ts-expect-error untyped
      pixelRatio: 'auto',
    },
  })

  const wireframe = {
    fillStyle: 'transparent',
    strokeStyle: 'gray',
    lineWidth: 1,
  }
  const ground = Bodies.rectangle(400, 200, 410, 50, {
    isStatic: true,
    render: wireframe,
  })

  World.add(engine.world, [ground])

  f.add = () => {
    const boxA = Bodies.rectangle(180, -40, 80, 80, { render: wireframe })
    World.add(engine.world, [boxA])
  }

  f.add()

  Runner.run(engine)
  Render.run(render)
})
</script>

<template>
  <CraftBox>
    <div ref="canvas" class="overflow-hidden" @click="f.add" />
  </CraftBox>
</template>
