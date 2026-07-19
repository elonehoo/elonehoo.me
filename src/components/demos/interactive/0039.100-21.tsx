import type { CSSProperties } from 'react'

function splitLetters(text: string) {
  const occurrences = new Map<string, number>()
  let position = 0
  return Array.from(text, (char) => {
    const occurrence = (occurrences.get(char) ?? 0) + 1
    occurrences.set(char, occurrence)
    return { char, key: `${char}-${occurrence}`, position: position++ }
  })
}

export default function BreathingText({ text = 'Breathing' }: { text?: string }) {
  return (
    <p className="demo-breathing" aria-label={text}>
      {splitLetters(text).map(letter => (
        <span
          key={letter.key}
          aria-hidden="true"
          style={{ animationDelay: `${(letter.position - text.length / 2) * 0.25}s` } as CSSProperties}
        >
          {letter.char}
        </span>
      ))}
      <style>
        {`
        @font-face { font-family:"Demo Geist"; src:url("https://pham.codes/d/GeistVF.woff2") format("woff2"); font-display:swap; }
        .demo-breathing { margin:0; font-family:"Demo Geist",system-ui,sans-serif; font-size:clamp(42px,10vw,58px); line-height:1; background:linear-gradient(0deg,#111 70%,#fff); background-clip:text; -webkit-background-clip:text; color:transparent; }
        .dark .demo-breathing { background-image:linear-gradient(0deg,#eee 70%,#000); }
        .demo-breathing>span { animation:demo-breath 1.5s alternate cubic-bezier(.37,0,.63,1) infinite both; }
        @keyframes demo-breath { from { font-variation-settings:"wght" 32; } to { font-variation-settings:"wght" 240; } }
      `}
      </style>
    </p>
  )
}
