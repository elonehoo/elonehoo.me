import './0035.100-17.css'

export default function WiggleDemo() {
  return (
    <div className="demo0035-wiggle" aria-label="Wiggling concentric squares">
      {Array.from({ length: 15 }, (_, index) => {
        const number = index + 1
        return (
          <b
            key={number}
            style={{
              animationDelay: `${50 * number}ms`,
              boxShadow: `0 0 ${number}px var(--demo0035-color)`,
              filter: `blur(${number * 0.15}px)`,
              height: `${number * 10}px`,
              left: `${-number * 5}px`,
              top: `${-number * 5}px`,
              width: `${number * 10}px`,
            }}
          />
        )
      })}
    </div>
  )
}
