import './0029.100-11.css'

export default function SpinnerDemo() {
  return (
    <div className="demo0029-spinner" aria-label="Circular particle spinner">
      {Array.from({ length: 100 }, (_, index) => {
        const number = index + 1
        return (
          <i key={number} style={{ transform: `rotate(${number * 3.6}deg) translate3d(100px, 0, 0)` }}>
            <b style={{ animationDelay: `${number * (3 / 98)}s` }} />
          </i>
        )
      })}
    </div>
  )
}
