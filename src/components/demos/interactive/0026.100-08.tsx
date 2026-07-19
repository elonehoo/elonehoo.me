import { useState } from 'react'

const streaks = [
  { top: '12%', delay: '-.2s' },
  { top: '29%', delay: '-.8s' },
  { top: '48%', delay: '-1.3s' },
  { top: '67%', delay: '-.5s' },
  { top: '84%', delay: '-1.7s' },
]

export default function Rocket() {
  const [fast, setFast] = useState(false)
  return (
    <div className={`demo-rocket ${fast ? 'fast' : ''}`} onMouseEnter={() => setFast(true)} onMouseLeave={() => setFast(false)}>
      <span className="ship" aria-label="Rocket">🚀</span>
      {streaks.map(streak => <span key={streak.top} className="streak" style={{ top: streak.top, animationDelay: streak.delay }} />)}
      <style>
        {`
        .demo-rocket { position:relative; width:100%; height:100%; overflow:hidden; display:flex; align-items:center; justify-content:center; }
        .demo-rocket .ship { position:relative; z-index:2; font-size:28px; transform:rotate(-45deg); animation:rocket-float 1s linear infinite; }
        .demo-rocket.fast .ship { animation:rocket-shake .12s linear infinite; }
        .demo-rocket .streak { position:absolute; left:-25%; width:22%; height:2px; background:linear-gradient(90deg,transparent,rgba(0,0,0,.55)); animation:rocket-streak 2s linear infinite; }
        .dark .demo-rocket .streak { background:linear-gradient(90deg,transparent,rgba(255,255,255,.6)); }
        .demo-rocket.fast .streak { animation-duration:.5s; }
        @keyframes rocket-float { 50% { transform:rotate(-45deg) translateX(-10px); } }
        @keyframes rocket-streak { to { left:105%; } }
        @keyframes rocket-shake { 25% { transform:rotate(-46deg) translate(2px,-1px); } 75% { transform:rotate(-44deg) translate(-2px,1px); } }
      `}
      </style>
    </div>
  )
}
