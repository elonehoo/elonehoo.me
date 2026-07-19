import { useId } from 'react'

import './0033.100-15.css'

export default function RadioSwitchDemo() {
  const instanceId = useId().replaceAll(':', '')
  const name = `demo0033-switch-${instanceId}`
  const yesId = `${name}-yes`
  const noId = `${name}-no`

  return (
    <form className="demo0033-form">
      <input className="demo0033-yes-input" id={yesId} type="radio" name={name} defaultChecked />
      <input className="demo0033-no-input" id={noId} type="radio" name={name} />
      <div className="demo0033-switch">
        <label className="demo0033-yes-label" htmlFor={yesId}>Yes</label>
        <label className="demo0033-no-label" htmlFor={noId}>No</label>
        <span />
      </div>
    </form>
  )
}
