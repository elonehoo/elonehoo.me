import { useState } from 'react'

const todos = [
  { value: '1', label: 'Bread' },
  { value: '2', label: 'Cheese' },
  { value: '3', label: 'Coffee' },
]

export default function CraftTodo() {
  const [selected, setSelected] = useState(() => new Set(['1']))

  function toggle(value: string) {
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(value))
        next.delete(value)
      else
        next.add(value)
      return next
    })
  }

  return (
    <div className="demo-todo" aria-label="Shopping list">
      {todos.map(todo => (
        <label key={todo.value} className={selected.has(todo.value) ? 'is-checked' : ''}>
          <input
            type="checkbox"
            checked={selected.has(todo.value)}
            onChange={() => toggle(todo.value)}
          />
          <span className="demo-todo-check" aria-hidden="true" />
          <span className="demo-todo-label">{todo.label}</span>
        </label>
      ))}
      <style>
        {`
        .demo-todo { display:grid; gap:12px; color:#111; }
        .dark .demo-todo { color:#fff; }
        .demo-todo label { position:relative; display:grid; grid-template-columns:18px auto; align-items:center; gap:12px; cursor:pointer; }
        .demo-todo input { position:absolute; opacity:0; pointer-events:none; }
        .demo-todo-check { position:relative; width:15px; height:15px; }
        .demo-todo-check::before, .demo-todo-check::after { content:""; position:absolute; top:8px; height:2px; width:0; border-radius:2px; background:currentColor; transform-origin:bottom; }
        .demo-todo-check::before { right:40%; transform:rotate(45deg); }
        .demo-todo-check::after { left:40%; transform:rotate(-45deg); }
        .demo-todo-label { position:relative; width:max-content; transition:color .3s ease, padding .3s ease; }
        .demo-todo-label::before { content:""; position:absolute; left:-30px; top:50%; width:8px; height:2px; border-radius:2px; background:currentColor; transform:translateY(-50%); }
        .demo-todo-label::after { content:""; position:absolute; left:-25px; top:8px; width:4px; height:4px; border-radius:50%; opacity:0; }
        .demo-todo .is-checked .demo-todo-check::before { animation:todo-check-short .4s ease forwards; }
        .demo-todo .is-checked .demo-todo-check::after { animation:todo-check-long .4s ease forwards; }
        .demo-todo .is-checked .demo-todo-label { color:#a8afc4; padding-left:4px; }
        .demo-todo .is-checked .demo-todo-label::before { animation:todo-slice .4s ease forwards; }
        .demo-todo .is-checked .demo-todo-label::after { animation:todo-firework .55s .1s ease forwards; }
        @keyframes todo-check-short { to { width:5px; } }
        @keyframes todo-check-long { to { width:10px; } }
        @keyframes todo-slice { 60% { width:100%; left:4px; } 100% { width:100%; left:-2px; } }
        @keyframes todo-firework { 0% { opacity:1; box-shadow:0 0 currentColor; } 100% { opacity:0; box-shadow:0 -15px currentColor,14px -8px currentColor,14px 8px currentColor,0 15px currentColor,-14px 8px currentColor,-14px -8px currentColor; } }
      `}
      </style>
    </div>
  )
}
