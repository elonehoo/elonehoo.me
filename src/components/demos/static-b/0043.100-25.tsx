import { useId } from 'react'
import './0043.100-25.css'

export default function Demo004310025() {
  const filterId = `${useId().replaceAll(':', '')}-globe-shadow`

  return (
    <div className="demo-b-0043">
      <div className="demo-b-0043__tooltip">
        <div className="demo-b-0043__bubble">
          <svg fill="none" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <circle strokeLinejoin="round" r="9" cy="12" cx="12" />
            <path strokeLinejoin="round" d="M12 3S8.5 6 8.5 12 12 21 12 21M12 3s3.5 3 3.5 9S12 21 12 21M3 12h18M19.5 7.5h-15" />
            <g filter={`url(#${filterId})`}>
              <path strokeLinejoin="round" d="M19.5 16.5h-15" />
            </g>
            <defs>
              <filter id={filterId} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="3" width="17" y="16" x="3.5">
                <feFlood result="BackgroundImageFix" floodOpacity="0" />
                <feColorMatrix result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" type="matrix" in="SourceAlpha" />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" type="matrix" />
                <feBlend result="shadow" in2="BackgroundImageFix" mode="normal" />
                <feBlend result="shape" in2="shadow" in="SourceGraphic" mode="normal" />
              </filter>
            </defs>
          </svg>
          <span>elonehoo.me</span>
        </div>
        <span className="demo-b-0043__bubble-arrow" />
        <span className="demo-b-0043__tooltip-cover">
          <span />
        </span>
      </div>

      <div className="demo-b-0043__button">
        <svg fill="none" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            d="M15.4306 7.70172C7.55045 7.99826 3.43929 15.232 2.17021 19.3956C2.07701 19.7014 2.31139 20 2.63107 20C2.82491 20 3.0008 19.8828 3.08334 19.7074C6.04179 13.4211 12.7066 12.3152 15.514 12.5639C15.7583 12.5856 15.9333 12.7956 15.9333 13.0409V15.1247C15.9333 15.5667 16.4648 15.7913 16.7818 15.4833L20.6976 11.6784C20.8723 11.5087 20.8993 11.2378 20.7615 11.037L16.8456 5.32965C16.5677 4.92457 15.9333 5.12126 15.9333 5.61253V7.19231C15.9333 7.46845 15.7065 7.69133 15.4306 7.70172Z"
          />
        </svg>
        <span>Check My Website</span>
      </div>
    </div>
  )
}
