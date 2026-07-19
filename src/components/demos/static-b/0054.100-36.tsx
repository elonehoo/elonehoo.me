import { useId } from 'react'
import './0054.100-36.css'

export default function Demo005410036() {
  const id = useId().replaceAll(':', '')
  const pagePathId = `${id}-page-path`
  const pageClipId = `${id}-page-clip`

  return (
    <svg className="demo-b-0054" viewBox="0 0 224 160" role="img" aria-label="Animated browser page loading">
      <rect className="demo-b-0054__canvas" x="0" y="0" width="100%" height="100%" />
      <g className="demo-b-0054__animated">
        <g>
          <defs>
            <path id={pagePathId} d="M0 19h224v141H0z" />
          </defs>
          <clipPath id={pageClipId}>
            <use href={`#${pagePathId}`} overflow="visible" />
          </clipPath>
          <g className="demo-b-0054__page" clipPath={`url(#${pageClipId})`}>
            <g className="demo-b-0054__title demo-b-0054__ink-fill">
              <path d="M17.5 49V33.7h8.6c3 0 4.8 1.4 4.8 3.8 0 1.5-.7 2.7-1.9 3.3 1.8.5 2.7 1.8 2.7 3.9 0 2.8-1.8 4.3-5 4.3h-9.2zm2.3-8.8h6.3c1.5 0 2.4-.9 2.4-2.4s-1-2.4-2.7-2.4h-6v4.8zm0 7.1h6.4c2 0 3.1-.9 3.1-2.7 0-1.7-.9-2.6-2.7-2.6h-6.8v5.3zM33.5 43.6c0-3.4 2.6-5.6 6.4-5.6 3.8 0 6.4 2.2 6.4 5.6 0 3.4-2.7 5.6-6.4 5.6s-6.4-2.2-6.4-5.6zm10.7 0c0-2.4-1.8-3.8-4.3-3.8s-4.3 1.5-4.3 3.8 1.8 3.9 4.3 3.9c2.5-.1 4.3-1.6 4.3-3.9zM59.5 42.1V49h-2.1v-6.1c0-2.2-1.1-3.3-3-3.3-2.2 0-3.6 1.3-3.6 4V49h-2.1V38.2h2.1v2c.7-1.4 2.2-2.2 4.1-2.2 2.8 0 4.6 1.4 4.6 4.1zM60.2 53.4v-1.7c.4.1.8.2 1.1.2.7 0 1.1-.4 1.1-1.4V38.2h2.1V51c0 1.7-.8 2.6-2.4 2.6-.7.1-1.3 0-1.9-.2zM62 36.2v-2.6h2.7v2.6H62zM66.7 43.6c0-3.4 2.6-5.6 6.4-5.6 3.8 0 6.4 2.2 6.4 5.6 0 3.4-2.7 5.6-6.4 5.6s-6.4-2.2-6.4-5.6zm10.8 0c0-2.4-1.8-3.8-4.3-3.8s-4.3 1.5-4.3 3.8 1.8 3.9 4.3 3.9c2.5-.1 4.3-1.6 4.3-3.9zM90.4 38.2h2.1V49h-2.1v-1.8c-.8 1.4-2.3 2-4 2-2.9 0-4.7-1.5-4.7-4.4v-6.6h2.1v6.2c0 2.1 1.1 3.1 3.1 3.1 2.5 0 3.5-1.5 3.5-4v-5.3zM103.6 38.5l-1 1.7c-.4-.2-1.1-.3-1.6-.3-1.8 0-3.5 1-3.5 3.4V49h-2.1V38.2h2.2V40c.8-1.3 2.4-2 3.9-2 .7 0 1.4.1 2.1.5z" />
            </g>

            <path className="demo-b-0054__menu demo-b-0054__ink-stroke" fill="none" d="M198 41.5h7M198 44.5h7M198 47.5h7" />
            <path className="demo-b-0054__visual demo-b-0054__ink-stroke" d="M14.5 64.5h116v65h-116z" />

            <g className="demo-b-0054__text">
              <g className="demo-b-0054__ink-fill">
                <path d="M144 82V71.5h1.6V76h6.2v-4.5h1.6V82h-1.6v-4.6h-6.2V82H144zM162.8 77.4V82h-1.2l-.2-1.4c-.6 1-1.8 1.5-3.1 1.5-2 0-3.2-.8-3.2-2.3 0-1.5 1.1-2.2 3-2.2h3.2v-.2c0-1.2-.5-1.9-2.2-1.9-1.1 0-2.1.3-3 1l-.5-1c1.1-.7 2.3-1.1 3.7-1.1 2.2.1 3.5 1.1 3.5 3zm-1.6 1.3-2.8-.1c-1.1 0-1.8.3-1.8 1.2 0 .8.7 1.3 1.8 1.3 1.8 0 2.8-1 2.8-2.4zM172 77.3V82h-1.5v-4.1c0-1.5-.7-2.3-2.1-2.3-1.5 0-2.4.9-2.4 2.7V82h-1.5V71.5h1.5V76c.5-1 1.5-1.5 2.8-1.5 2 0 3.2.9 3.2 2.8zM181.2 77.4V82H180l-.2-1.4c-.6 1-1.8 1.5-3.1 1.5-2 0-3.2-.8-3.2-2.3 0-1.5 1.1-2.2 3-2.2h3.2v-.2c0-1.2-.5-1.9-2.2-1.9-1.1 0-2.1.3-3 1l-.5-1c1.1-.7 2.3-1.1 3.7-1.1 2.2.1 3.5 1.1 3.5 3zm-1.6 1.3-2.8-.1c-1.1 0-1.8.3-1.8 1.2 0 .8.7 1.3 1.8 1.3 1.8 0 2.8-1 2.8-2.4z" />
              </g>
              <path fill="none" className="demo-b-0054__ink-stroke" d="M142.5 89.5H205M142.5 95.5H205M142.5 101.5H205M142.5 107.5h25" />
              <path className="demo-b-0054__ink-stroke" d="M143.5 114.5h33v10h-33z" />
              <path fill="none" className="demo-b-0054__ink-stroke" d="M155.5 119.5h10" />
            </g>

            <g className="demo-b-0054__grid">
              <path className="demo-b-0054__cell demo-b-0054__ink-stroke" d="M14.5 141.5h38v18h-38z" />
              <path className="demo-b-0054__cell demo-b-0054__ink-stroke" d="M90.5 141.5h38v18h-38z" />
              <path className="demo-b-0054__cell demo-b-0054__ink-stroke" d="M166.5 141.5h38v18h-38z" />
            </g>
          </g>
        </g>

        <g className="demo-b-0054__browser">
          <path fill="none" className="demo-b-0054__ink-stroke" strokeWidth="2" d="M1 1h222v19H1z" />
          <path fill="none" className="demo-b-0054__ink-stroke" strokeWidth="2" d="M1 20h222v139H1z" />
          <path fill="none" className="demo-b-0054__ink-stroke" strokeWidth="2" d="M214 20h9v139h-9z" />
          <path className="demo-b-0054__action" d="M217 23h3v21h-3z" />
        </g>

        <g className="demo-b-0054__loader">
          <path className="demo-b-0054__action" d="M2.047 21.011h219.7v136.9H2.047z" />
          <path d="M2.047 21.011h219.7v136.9H2.047z" />
        </g>
      </g>
    </svg>
  )
}
