import { Fragment, useId } from 'react'

import './0024.100-06.css'

export default function BoxPickerDemo() {
  const instanceId = useId().replaceAll(':', '')
  const name = `demo0024-box-${instanceId}`

  return (
    <div className="demo0024-box-picker">
      {['A', 'B', 'C'].map((label, index) => {
        const id = `${name}-${label.toLowerCase()}`
        return (
          <Fragment key={id}>
            <input id={id} type="radio" name={name} defaultChecked={index === 1} />
            <label htmlFor={id}>{label}</label>
          </Fragment>
        )
      })}
    </div>
  )
}
