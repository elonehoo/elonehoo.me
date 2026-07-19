import type { CSSProperties } from 'react'
import './0040.100-22.css'

const dotCount = 12

export default function Demo004010022() {
  return (
    <div className="demo-b-0040__stage" role="img" aria-label="Twelve dots orbiting a ring">
      <div
        className="demo-b-0040__assembly demo-b-0040__orbit"
        style={{ '--demo-b-0040-count': dotCount } as CSSProperties}
      >
        {Array.from({ length: dotCount }, (_, index) => (
          <div
            key={index}
            className="demo-b-0040__dot demo-b-0040__orbit"
            style={{ '--demo-b-0040-index': dotCount - index - 1 } as CSSProperties}
          />
        ))}
      </div>
    </div>
  )
}
