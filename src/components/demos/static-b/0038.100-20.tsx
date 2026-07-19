import { useId } from 'react'
import './0038.100-20.css'

const polygons = [
  '64 49 66.322 58.992 71.071 56.929 69.008 61.678 79 64 69.008 66.322 71.071 71.071 66.322 69.008 64 79 61.678 69.008 56.929 71.071 58.992 66.322 49 64 58.992 61.678 56.929 56.929 61.678 58.992 64 49',
  '64 34 68.644 53.983 78.142 49.858 74.017 59.356 94 64 74.017 68.644 78.142 78.142 68.644 74.017 64 94 59.356 74.017 49.858 78.142 53.983 68.644 34 64 53.983 59.356 49.858 49.858 59.356 53.983 64 34',
  '64 19 70.966 48.975 85.213 42.787 79.025 57.034 109 64 79.025 70.966 85.213 85.213 70.966 79.025 64 109 57.034 79.025 42.787 85.213 48.975 70.966 19 64 48.975 57.034 42.787 42.787 57.034 48.975 64 19',
  '64 4 73.287 43.966 92.284 35.716 84.034 54.713 124 64 84.034 73.287 92.284 92.284 73.287 84.034 64 124 54.713 84.034 35.716 92.284 43.966 73.287 4 64 43.966 54.713 35.716 35.716 54.713 43.966 64 4',
]

const dashArrays = ['31 93', '62 186', '93 279', '124 372']

function AnimatedPolygons() {
  return polygons.map((points, index) => (
    <polygon
      key={points}
      className={`demo-b-0038__stroke demo-b-0038__stroke--${index + 1}`}
      strokeDasharray={dashArrays[index]}
      points={points}
    />
  ))
}

export default function Demo003810020() {
  const id = useId().replaceAll(':', '')
  const glowId = `${id}-star-glow`
  const gradientId = `${id}-star-gradient`
  const maskId = `${id}-star-mask`

  return (
    <svg
      className="demo-b-0038__star"
      width="128"
      height="128"
      viewBox="0 0 128 128"
      role="img"
      aria-label="Animated four-layer star"
    >
      <defs>
        <filter id={glowId}>
          <feGaussianBlur result="coloredBlur" stdDeviation="1.5" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
        <mask id={maskId}>
          <rect x="0" y="0" width="128" height="128" fill={`url(#${gradientId})`} />
        </mask>
      </defs>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <g stroke="hsla(223,90%,50%,0.2)">
          {polygons.map(points => <polygon key={points} points={points} />)}
        </g>
        <g filter={`url(#${glowId})`}>
          <g stroke="hsl(223,90%,50%)">
            <AnimatedPolygons />
          </g>
          <g stroke="hsl(283,90%,50%)" mask={`url(#${maskId})`}>
            <AnimatedPolygons />
          </g>
        </g>
      </g>
    </svg>
  )
}
