import { useId } from 'react'

import './0012.craft-tab-bar.css'

const iconPaths = [
  'M13.93,1H20.8A4.21,4.21,0,0,1,25,5.2V20.8A4.21,4.21,0,0,1,20.8,25H5.2A4.21,4.21,0,0,1,1,20.8V5.2A4.21,4.21,0,0,1,5.2,1h.47',
  'M17,1a12.33,12.33,0,0,1,8,11.65A12.18,12.18,0,0,1,13,25,12.18,12.18,0,0,1,1,12.65,12.33,12.33,0,0,1,9,1',
  'M7.91,2.08a11.15,11.15,0,0,0-5.73,9.81v6a7.83,7.83,0,0,1-1,2.92A1.47,1.47,0,0,0,2.43,23H23.57a1.47,1.47,0,0,0,1.26-2.16,7.83,7.83,0,0,1-1-2.92v-6A11.06,11.06,0,0,0,15.18,1',
  'M17,1a12.33,12.33,0,0,1,8,11.65A12.18,12.18,0,0,1,13,25,12.18,12.18,0,0,1,1,12.65,12.33,12.33,0,0,1,9,1',
]

export default function CraftTabBarDemo() {
  const instanceId = useId().replaceAll(':', '')
  const radioName = `demo0012-tabs-${instanceId}`

  return (
    <div className="demo0012-tabs">
      {iconPaths.map((path, index) => {
        const number = index + 1
        const inputId = `${radioName}-${number}`
        const symbolId = `${radioName}-icon-${number}`
        const clipId = `${radioName}-clip-${number}`

        return (
          <div className="demo0012-tab" key={inputId}>
            <input id={inputId} type="radio" name={radioName} defaultChecked={index === 0} />
            <label htmlFor={inputId}>
              <svg aria-hidden="true" viewBox="0 0 26 26">
                <use href={`#${symbolId}`} className="demo0012-icon" />
              </svg>
              <span className="demo0012-wave" style={{ clipPath: `url(#${clipId})` }} />
            </label>
            <svg className="demo0012-definitions" aria-hidden="true">
              <defs>
                <symbol id={symbolId} viewBox="0 0 26 26">
                  <path d={path} />
                  {index === 0 && (
                    <>
                      <line x1="16" y1="10" x2="18" y2="10" />
                      <line x1="8" y1="10" x2="12" y2="10" />
                      <line x1="8" y1="15" x2="18" y2="15" />
                    </>
                  )}
                  {index === 1 && <polygon points="15 14.33 11 17 11 11.67 15 9 15 14.33" />}
                  {index === 2 && (
                    <>
                      <path d="M15,23a2,2,0,0,1-4,0" />
                      <path d="M16,5.51A6.53,6.53,0,0,1,19.65,9.4" />
                    </>
                  )}
                  {index === 3 && <path d="M18,18.26a8,8,0,0,1-10.09-.1" />}
                </symbol>
                <clipPath id={clipId}>
                  <path d={path} />
                </clipPath>
              </defs>
            </svg>
          </div>
        )
      })}
    </div>
  )
}
