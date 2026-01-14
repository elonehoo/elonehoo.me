<script setup lang="ts">
import { useAppearance } from '../../core'

const { theme } = useAppearance()

// 挂绳状态
const isPulling = ref(false)
const pullDistance = ref(0)
const currentPull = ref(0)
const isReleasing = ref(false)
const hasTriggered = ref(false)

// 绳子长度
const ROPE_LENGTH = 200 // 绳子自然长度
const SHORT_LENGTH = 15 // 收缩后的长度
// 不再限制最大拉动距离，由屏幕高度决定
const TRIGGER_THRESHOLD = 150 // 触发阈值
const SPRING_STIFFNESS = 0.06 // 弹簧刚度（更柔和）
const DAMPING = 0.85 // 阻尼系数

// 双击相关
let lastMouseDownTime = 0
const DOUBLE_CLICK_DELAY = 300 // 双击检测延迟（毫秒）

// 是否处于收缩状态
const isRetracted = ref(false)

// 物理引擎相关
const velocity = ref(0)
let animationFrameId: number | null = null

// 绳子摆动角度（模拟真实绳子的物理摆动）
const swingAngle = ref(0)
const swingVelocity = ref(0)

// 绳子水平偏移（随鼠标移动）
const ropeOffsetX = ref(0)

// 屏幕尺寸（用于动态调整SVG大小）
const screenHeight = ref(window.innerHeight)
const screenWidth = ref(window.innerWidth)

// 判断是否为移动设备（屏幕宽度小于 768px）
const isMobile = computed(() => screenWidth.value < 768)

// 绳子和卡片位置配置（根据屏幕尺寸动态调整）
const anchorXOffset = computed(() => isMobile.value ? 40 : 240)
const anchorYOffset = computed(() => isMobile.value ? 0 : 0)

// 绳子颜色
const ropeColor = computed(() => {
  if (hasTriggered.value)
    return '#4ade80'
  return 'hsl(var(--theme-action))'
})

// 绳子宽度（随拉伸变细）
const ropeWidth = computed(() => {
  const baseWidth = 6
  const stretch = pullDistance.value / ROPE_LENGTH
  return Math.max(2, baseWidth - stretch * 2)
})

// 绳子路径 - 使用单条三次贝塞尔曲线
const ropePath = computed(() => {
  // 锚点位置（可配置）
  const anchorX = screenWidth.value - anchorXOffset.value
  const anchorY = anchorYOffset.value

  // 手柄终点位置
  const endX = anchorX + ropeOffsetX.value
  const endY = anchorY + pullDistance.value

  // 计算重力下垂
  const horizontalDist = Math.abs(endX - anchorX)
  const sag = 25 + horizontalDist * 0.4 + pullDistance.value / 25

  // 使用单条三次贝塞尔曲线
  // 控制点1：从锚点出发，向下并向终点方向
  const cp1X = anchorX + (endX - anchorX) * 0.25
  const cp1Y = anchorY + pullDistance.value * 0.25 + sag * 0.5

  // 控制点2：接近终点，向上并向起点方向
  const cp2X = anchorX + (endX - anchorX) * 0.75
  const cp2Y = anchorY + pullDistance.value * 0.75 + sag * 0.5

  return `M ${anchorX.toFixed(2)} ${anchorY.toFixed(2)} C ${cp1X.toFixed(2)} ${cp1Y.toFixed(2)}, ${cp2X.toFixed(2)} ${cp2Y.toFixed(2)}, ${endX.toFixed(2)} ${endY.toFixed(2)}`
})

// 手柄位置
const handlePosition = computed(() => {
  const anchorX = screenWidth.value - anchorXOffset.value
  const anchorY = anchorYOffset.value
  const x = anchorX + ropeOffsetX.value + Math.sin(swingAngle.value) * 30
  const y = anchorY + pullDistance.value
  return { x, y }
})

// 鼠标/触摸位置
const startY = ref(0)
const startX = ref(0)

// 监听窗口大小变化
function updateScreenSize() {
  screenHeight.value = window.innerHeight
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
  // 初始绳子位置，始终为 200
  pullDistance.value = ROPE_LENGTH
  currentPull.value = pullDistance.value
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})

// 开始拉动
function startPull(e: MouseEvent | TouchEvent) {
  e.preventDefault()
  isPulling.value = true
  hasTriggered.value = false
  isReleasing.value = false
  velocity.value = 0
  swingVelocity.value = 0
  swingAngle.value = 0
  ropeOffsetX.value = 0

  // 获取当前鼠标/触摸位置作为起始点
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX

  // 记录起始位置为当前鼠标位置，这样拖拽时卡片会跟随鼠标
  startY.value = clientY
  startX.value = clientX

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }

  document.addEventListener('mousemove', onPull)
  document.addEventListener('mouseup', endPull)
  document.addEventListener('touchmove', onPull, { passive: false })
  document.addEventListener('touchend', endPull)
}

// 拉动中
function onPull(e: MouseEvent | TouchEvent) {
  if (!isPulling.value || isReleasing.value)
    return

  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX

  // 计算鼠标移动的距离
  const deltaY = clientY - startY.value
  const deltaX = clientX - startX.value

  // 获取初始的绳子长度（在开始拖拽时）
  const initialPull = isRetracted.value ? SHORT_LENGTH : ROPE_LENGTH

  // 新的拉动距离 = 初始长度 + 鼠标移动的垂直距离
  pullDistance.value = Math.max(35, initialPull + deltaY)
  ropeOffsetX.value = deltaX

  // 计算摆动角度（限制最大角度）
  const targetAngle = Math.atan2(deltaX, Math.max(100, pullDistance.value)) * 0.4
  // 限制摆动角度在合理范围内
  swingAngle.value = Math.max(-0.5, Math.min(0.5, targetAngle))

  // 计算速度并更新位置
  velocity.value = (pullDistance.value - currentPull.value) * 0.5
  currentPull.value = pullDistance.value

  // 检查是否达到触发阈值（标记状态，但不立即切换）
  if (pullDistance.value >= TRIGGER_THRESHOLD && !hasTriggered.value) {
    hasTriggered.value = true
  }
}

// 结束拉动
function endPull() {
  if (!isPulling.value)
    return

  isPulling.value = false
  isReleasing.value = true

  document.removeEventListener('mousemove', onPull)
  document.removeEventListener('mouseup', endPull)
  document.removeEventListener('touchmove', onPull)
  document.removeEventListener('touchend', endPull)

  // 如果达到了触发阈值，松手时切换主题
  if (hasTriggered.value) {
    triggerToggle()
  }

  // 拖拽后松手，始终回到展开状态（200px）
  isRetracted.value = false

  // 启动回弹动画
  startReboundAnimation()
}

// 回弹物理动画
function startReboundAnimation() {
  // 根据 isRetracted 状态决定目标位置
  const targetPull = isRetracted.value ? SHORT_LENGTH : ROPE_LENGTH
  const targetSwing = 0

  function animate() {
    // 弹簧力 - 位移
    const displacementY = currentPull.value - targetPull
    const displacementSwing = swingAngle.value - targetSwing

    // 弹簧力
    const springForceY = -SPRING_STIFFNESS * displacementY
    const springForceSwing = -SPRING_STIFFNESS * displacementSwing

    // 重力对摆动的影响
    const gravityRestoring = -0.015 * Math.sin(swingAngle.value)

    // 应用速度和阻尼
    velocity.value += springForceY
    velocity.value *= DAMPING

    swingVelocity.value += springForceSwing + gravityRestoring
    swingVelocity.value *= DAMPING

    // 更新位置
    currentPull.value += velocity.value
    pullDistance.value = currentPull.value

    // 水平位置逐渐回到中心
    ropeOffsetX.value += (0 - ropeOffsetX.value) * 0.08 + swingVelocity.value * 15
    ropeOffsetX.value *= 0.92

    swingAngle.value += swingVelocity.value

    // 检查是否停止
    const isSettled = (
      Math.abs(velocity.value) < 0.1
      && Math.abs(swingVelocity.value) < 0.001
      && Math.abs(pullDistance.value - targetPull) < 1
      && Math.abs(ropeOffsetX.value) < 1
    )

    if (isSettled) {
      pullDistance.value = targetPull
      ropeOffsetX.value = 0
      swingAngle.value = 0
      isReleasing.value = false

      // 重置
      setTimeout(() => {
        if (!isPulling.value) {
          hasTriggered.value = false
        }
      }, 500)

      animationFrameId = null
      return
    }

    animationFrameId = requestAnimationFrame(animate)
  }

  currentPull.value = pullDistance.value
  animate()
}

// 触发切换
function triggerToggle() {
  if ('vibrate' in navigator) {
    navigator.vibrate([30, 50, 30])
  }
  // 直接切换 theme，让 watch 更新 isDark
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

// 处理单击/触摸开始拖拽，同时检测双击
function handleCardDown(e: MouseEvent | TouchEvent) {
  e.preventDefault()
  e.stopPropagation()

  const now = Date.now()

  // 检测双击：短时间内再次按下
  if (now - lastMouseDownTime < DOUBLE_CLICK_DELAY) {
    // 双击 - 切换收缩状态
    lastMouseDownTime = 0
    isRetracted.value = !isRetracted.value
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
    // 停止当前的拖拽（如果有）
    if (isPulling.value) {
      isPulling.value = false
      document.removeEventListener('mousemove', onPull)
      document.removeEventListener('mouseup', endPull)
      document.removeEventListener('touchmove', onPull)
      document.removeEventListener('touchend', endPull)
    }
    // 取消当前的动画帧（如果有）
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
    // 重置速度和状态
    velocity.value = 0
    swingVelocity.value = 0
    ropeOffsetX.value = 0
    swingAngle.value = 0
    // 启动回弹动画
    isReleasing.value = true
    startReboundAnimation()
    return
  }

  // 记录按下时间
  lastMouseDownTime = now

  // 立即开始拖拽
  startPull(e)
}
</script>

<template>
  <div class="pull-cord-fixed">
    <svg
      class="cord-svg"
      :width="screenWidth"
      :height="screenHeight"
    >

      <!-- 绳子主体 -->
      <path
        :d="ropePath"
        :stroke="ropeColor"
        :stroke-width="ropeWidth - 1"
        fill="none"
        stroke-linecap="round"
        class="rope"
      />

      <!-- 手柄卡片 -->
      <g
        :transform="`translate(${handlePosition.x}, ${handlePosition.y})`"
        class="handle-group"
        @mousedown="handleCardDown"
        @touchstart="handleCardDown"
      >
        <!-- 卡片主体 -->
        <rect
          x="-26"
          y="-18"
          width="56"
          height="56"
          rx="12"
          fill="hsl(var(--theme-action))"
          stroke="rgba(0,0,0,0.2)"
          stroke-width="1.5"
          class="handle-card"
        />

      </g>

    </svg>
  </div>
</template>

<style scoped>
.pull-cord-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  pointer-events: none;
}

.cord-svg {
  pointer-events: none;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.rope {
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.2));
}

.handle-card {
  transition: fill 0.2s;
}

.handle-group {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25));
  cursor: grab;
  pointer-events: auto;
}

.handle-group:active {
  cursor: grabbing;
}

.drag-overlay {
  pointer-events: auto;
  cursor: grab;
}

.drag-overlay:active {
  cursor: grabbing;
}

.hint-text {
  position: absolute;
  top: 50px;
  right: 10px;
  font-size: 12px;
  color: var(--gray-11, #71717a);
  background: rgba(255, 255, 255, 0.9);
  padding: 6px 12px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  pointer-events: none;
  transition: opacity 0.3s;
  white-space: nowrap;
}

.dark .hint-text {
  background: rgba(24, 24, 27, 0.9);
  color: var(--gray-11, #a1a1aa);
}
</style>
