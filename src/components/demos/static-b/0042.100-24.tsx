import './0042.100-24.css'

export default function Demo004210024() {
  return (
    <div className="demo-b-0042__spinner" role="status" aria-label="Loading">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className={`demo-b-0042__square demo-b-0042__square--${index + 1}`} />
      ))}
    </div>
  )
}
