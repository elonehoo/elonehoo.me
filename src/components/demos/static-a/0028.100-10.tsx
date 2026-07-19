import './0028.100-10.css'

export default function HoleDemo() {
  return (
    <div className="demo0028-hole" aria-label="Pulsing concentric rings">
      {Array.from({ length: 10 }, (_, index) => (
        <i key={index} style={{ animationDelay: `${(index + 1) * 0.3}s` }} />
      ))}
    </div>
  )
}
