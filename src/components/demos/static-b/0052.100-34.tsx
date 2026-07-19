import { useId } from 'react'
import './0052.100-34.css'

export default function Demo005210034() {
  const groupId = `${useId().replaceAll(':', '')}-line`

  return (
    <div className="demo-b-0052" role="group" aria-label="Select a line">
      {Array.from({ length: 15 }, (_, index) => (
        <label key={index} className="demo-b-0052__line">
          <input type="radio" name={groupId} aria-label={`Line ${index + 1}`} />
          <span />
        </label>
      ))}
    </div>
  )
}
