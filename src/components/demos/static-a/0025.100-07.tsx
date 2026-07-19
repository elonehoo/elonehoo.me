import './0025.100-07.css'

const items = [
  ['Mobile apps', 'indigo'],
  ['Websites', 'rose'],
  ['Admin dashboards', 'yellow'],
  ['Landing pages', 'teal'],
  ['Illustrations', 'pink'],
  ['Icons', 'sky'],
] as const

export default function TextSlideDemo() {
  return (
    <p className="demo0025-sentence">
      We can work to develop the best
      {' '}
      <span className="demo0025-window">
        <span className="demo0025-list">
          {items.map(([text, color]) => (
            <span className={`demo0025-item demo0025-${color}`} key={text}>{text}</span>
          ))}
        </span>
      </span>
    </p>
  )
}
