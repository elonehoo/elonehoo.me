import type { CSSProperties } from 'react'

export default function EmailValidation() {
  return (
    <form className="demo-email" onSubmit={event => event.preventDefault()}>
      <label htmlFor="demo-email-input">
        <span aria-hidden="true" style={{ '--char-index': 0 } as CSSProperties}>E</span>
        <span aria-hidden="true" style={{ '--char-index': 1 } as CSSProperties}>m</span>
        <span aria-hidden="true" style={{ '--char-index': 2 } as CSSProperties}>a</span>
        <span aria-hidden="true" style={{ '--char-index': 3 } as CSSProperties}>i</span>
        <span aria-hidden="true" style={{ '--char-index': 4 } as CSSProperties}>l</span>
        <span className="sr-only">Email</span>
      </label>
      <input id="demo-email-input" type="email" required />
      <style>
        {`
        .demo-email { --valid:hsl(145 50% 55%); --invalid:hsl(15 80% 55%); --color:hsl(268 1% 55%); display:grid; gap:.5rem; }
        .demo-email label { display:flex; color:var(--color); transition:color .2s; letter-spacing:.1ch; padding-left:.5rem; font-weight:700; }
        .demo-email label>[aria-hidden] { animation-duration:.2s; animation-delay:calc(var(--char-index) * .1s); animation-fill-mode:both; }
        .demo-email input { min-width:250px; padding:.5rem; border-radius:.5rem; border:.2rem solid var(--color); background:white; color:#111; outline:none; transition:border .2s; }
        .dark .demo-email input { background:#111; color:#fff; }
        .demo-email:has(input:user-valid) { --color:var(--valid); } .demo-email:not(:focus-within):has(input:user-invalid) { --color:var(--invalid); }
        .demo-email:not(:focus-within):has(input:user-valid) [aria-hidden] { animation-name:email-jump; }
        .demo-email:not(:focus-within):has(input:user-invalid) label { animation:email-shake .075s 8; }
        .demo-email .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; }
        @keyframes email-jump { 50% { translate:0 -50%; } } @keyframes email-shake { 25% { translate:.25ch 0; } 75% { translate:-.25ch 0; } }
      `}
      </style>
    </form>
  )
}
