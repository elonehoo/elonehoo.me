import { useState } from 'react'

const moods = ['angry', 'sad', 'ok', 'good', 'happy'] as const

function Face({ mood }: { mood: typeof moods[number] }) {
  if (mood === 'ok')
    return <span className="face" />
  return (
    <span className="face">
      <span className="eye left" />
      <span className="eye right" />
      {mood !== 'happy' && <span className="mouth" />}
    </span>
  )
}

export default function CraftFeedback() {
  const [selected, setSelected] = useState(0)
  return (
    <div className="demo-feedback" role="radiogroup" aria-label="Feedback rating">
      {moods.map((mood, index) => (
        <button
          key={mood}
          type="button"
          role="radio"
          aria-checked={selected === index}
          aria-label={`${index + 1} out of 5`}
          className={`${mood} ${selected === index ? 'active' : ''}`}
          onClick={() => setSelected(index)}
        >
          <Face mood={mood} />
        </button>
      ))}
      <style>
        {`
        .demo-feedback { --normal:#eceaf3; --shadow:#d9d8e3; --eye:#595861; --mouth:#9795a4; --active:#f8da69; --active-shadow:#f4b555; --active-eye:#313036; --active-mouth:#f05136; display:flex; gap:20px; }
        .demo-feedback button { appearance:none; border:0; padding:0; width:40px; height:40px; border-radius:50%; position:relative; cursor:pointer; background:var(--normal); box-shadow:inset 3px -3px 4px var(--shadow); transition:transform .2s, background .35s, box-shadow .35s; }
        .demo-feedback button:active { transform:scale(.92); }
        .demo-feedback button.active { background:var(--active); box-shadow:inset 3px -3px 4px var(--active-shadow); }
        .demo-feedback .face { display:block; position:relative; width:40px; height:40px; transform:perspective(240px) translateZ(4px); }
        .demo-feedback .active .face { animation:feedback-shake .8s linear; }
        .demo-feedback .eye, .demo-feedback .mouth, .demo-feedback .face::before, .demo-feedback .face::after { position:absolute; display:block; content:""; transition:.35s; }
        .demo-feedback .eye { top:16px; width:7px; height:4px; border-top:2px solid var(--eye); border-radius:50%; }
        .demo-feedback .eye.left { left:9px; } .demo-feedback .eye.right { left:24px; }
        .demo-feedback .mouth { left:12px; top:25px; width:16px; height:6px; border-top:2px solid var(--mouth); border-radius:50%; }
        .demo-feedback .active .eye { border-color:var(--active-eye); } .demo-feedback .active .mouth { border-color:var(--active-mouth); }
        .demo-feedback .angry .eye { transform:rotate(20deg); } .demo-feedback .angry .eye.right { transform:rotate(-20deg); }
        .demo-feedback .sad .mouth { border-top:0; border-bottom:2px solid var(--mouth); }
        .demo-feedback .sad.active .face::before, .demo-feedback .sad.active .face::after { top:18px; width:5px; height:5px; border-radius:50%; background:#76b5e7; animation:feedback-tear .6s linear; }
        .demo-feedback .sad.active .face::before { left:9px; } .demo-feedback .sad.active .face::after { right:9px; }
        .demo-feedback .ok .face::before { left:12px; top:17px; width:4px; height:4px; border-radius:50%; background:var(--eye); box-shadow:12px 0 var(--eye); }
        .demo-feedback .ok .face::after { left:13px; top:26px; width:14px; height:2px; background:var(--mouth); }
        .demo-feedback .ok.active .face::before { background:var(--active-eye); box-shadow:12px 0 var(--active-eye); } .demo-feedback .ok.active .face::after { background:var(--active-mouth); }
        .demo-feedback .good .eye, .demo-feedback .happy .eye { border-top:0; border-bottom:2px solid var(--eye); }
        .demo-feedback .good .mouth { border-top:0; border-bottom:2px solid var(--mouth); }
        .demo-feedback .happy .face::after { left:11px; top:23px; width:18px; height:8px; border-radius:0 0 9px 9px; background:var(--mouth); }
        .demo-feedback .happy.active .face::after { background:var(--active-mouth); }
        @keyframes feedback-shake { 30% { transform:perspective(240px) rotateX(18deg) rotateY(-20deg) translateZ(10px); } 60% { transform:perspective(240px) rotateX(-15deg) rotateY(20deg) translateZ(10px); } }
        @keyframes feedback-tear { 0% { opacity:0; transform:translateY(-2px) scale(0); } 40% { opacity:1; } 100% { opacity:0; transform:translateY(22px) scale(.8,1.2); } }
        @media (max-width:520px) { .demo-feedback { gap:12px; } }
      `}
      </style>
    </div>
  )
}
