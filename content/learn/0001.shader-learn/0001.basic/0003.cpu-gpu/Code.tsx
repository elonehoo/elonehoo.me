import { useEffect, useState } from 'react'
import { filesBesideMarkdown } from '#/learn-preview'
import { useLearnLesson } from '#/components/learn-lesson'
import { LessonCode } from '#/components/LessonCode'

type CpuStats = {
  index: number
  pointer: [number, number] | null
  rgb: [number, number, number] | null
  total: number
}

function useCpuStats() {
  const [stats, setStats] = useState<CpuStats>({ index: 0, pointer: null, rgb: null, total: 144 })

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.data?.type !== 'learn-cpu')
        return
      setStats({
        index: event.data.index,
        pointer: event.data.pointer,
        rgb: event.data.rgb,
        total: event.data.total,
      })
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return stats
}

function CpuReadout({ side }: { side: 'cpu' | 'gpu' }) {
  const stats = useCpuStats()
  if (side === 'gpu') {
    return <p className="learn-cpu-count"><span>同时调用</span> <output>{stats.total}</output> <span>次</span></p>
  }
  return <p className="learn-cpu-count"><span>i =</span> <output>{stats.index}</output> <span>/ {stats.total}</span></p>
}

function CpuFacts() {
  const stats = useCpuStats()
  const rgb = stats.rgb?.map(channel => channel.toFixed(2)).join(', ')
  return (
    <dl className="learn-cpu-facts">
      <div>
        <dt>当前格子</dt>
        <dd>{stats.pointer && rgb ? `(${stats.pointer[0]}, ${stats.pointer[1]}) → RGB (${rgb})` : '把指针移到格子上'}</dd>
      </div>
    </dl>
  )
}

function clampCells(value: number) {
  return Math.min(24, Math.max(4, Math.round(value)))
}

function clampSpeed(value: number) {
  return Math.min(120, Math.max(4, Math.round(value)))
}

function readCells(source: string, cells: number) {
  const values = [...source.matchAll(/vUv \* (\d+\.\d+)|cell\.y \* (\d+\.\d+)|\/ (\d+\.\d+),/g)]
    .map(match => Number(match[1] ?? match[2] ?? match[3]))
  const total = source.match(/float total = (\d+\.\d+) \* (\d+\.\d+)/)
  if (total)
    values.push(Number(total[1]), Number(total[2]))
  const next = values.find(value => Math.round(value) !== cells)
  return next == null ? cells : clampCells(next)
}

function readSpeed(source: string, speed: number) {
  const match = source.match(/uTime \* (\d+\.\d+)/)
  return match ? clampSpeed(Number(match[1])) : speed
}

function SourceSwitch({ file }: { file: string }) {
  const lesson = useLearnLesson()
  const mode = lesson?.mode ?? 0
  const setMode = lesson?.setMode ?? (() => {})
  const disk = filesBesideMarkdown(file).code
  const source = mode === 0 ? disk['cpu.c'] || '' : disk['shader.glsl'] || ''

  return (
    <div className="learn-cpu">
      <div className="learn-cpu-switch">
        <button type="button" aria-pressed={mode === 0} onClick={() => setMode(0)}>C · CPU 逐个</button>
        <button type="button" aria-pressed={mode === 1} onClick={() => setMode(1)}>GLSL · GPU 同时</button>
      </div>
      <LessonCode code={source} lang={mode === 0 ? 'c' : 'glsl'} />
    </div>
  )
}

function Comparison() {
  const lesson = useLearnLesson()
  const cells = lesson?.cells ?? 12
  const speed = lesson?.speed ?? 24
  const mode = lesson?.mode ?? 0
  const setCells = lesson?.setCells ?? (() => {})
  const setSpeed = lesson?.setSpeed ?? (() => {})
  const setMode = lesson?.setMode ?? (() => {})

  function changeControls(source: string) {
    const namedCells = source.match(/int cells = (\d+)/)
    const namedSpeed = source.match(/int speed = (\d+)/)
    if (namedCells || namedSpeed) {
      if (namedCells)
        setCells(clampCells(Number(namedCells[1])))
      if (namedSpeed)
        setSpeed(clampSpeed(Number(namedSpeed[1])))
      return
    }
    setCells(readCells(source, cells))
    setSpeed(readSpeed(source, speed))
  }

  const editable = (value: string) => value === String(cells) || value === String(speed)
  const c = `int cells = ${cells};
int speed = ${speed};
for (int y = 0; y < cells; y++)
  for (int x = 0; x < cells; x++)
    image[y][x] = shade(x, y);`
  const glsl = `void main() {
  gl_FragColor = shade(vUv);
}`

  return (
    <div className="learn-cpu">
      <div className="learn-cpu-columns">
        <section className={mode === 0 ? 'is-active' : ''}>
          <button type="button" aria-pressed={mode === 0} onClick={() => setMode(0)}>C · CPU 逐个</button>
          <LessonCode code={c} editable={editable} lang="c" onChange={changeControls} />
          <CpuReadout side="cpu" />
        </section>
        <section className={mode === 1 ? 'is-active' : ''}>
          <button type="button" aria-pressed={mode === 1} onClick={() => setMode(1)}>GLSL · GPU 同时</button>
          <LessonCode code={glsl} lang="glsl" />
          <CpuReadout side="gpu" />
        </section>
      </div>
      <CpuFacts />
    </div>
  )
}

export default function Lesson({ file = '', show }: { file?: string, show?: string }) {
  if (show === 'source')
    return <SourceSwitch file={file} />
  return <Comparison />
}
