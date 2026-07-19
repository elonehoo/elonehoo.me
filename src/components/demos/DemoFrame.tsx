import type { ReactNode } from 'react'

export function DemoFrame({ children, tall = false }: { children: ReactNode, tall?: boolean }) {
  return (
    <div className={`demo-frame my-5 w-full select-none overflow-hidden rounded-xl md:w-[550px] ${tall ? 'h-80' : 'h-40 md:h-50'}`}>
      <div className="box-border flex h-full w-full touch-none items-center justify-center">
        {children}
      </div>
    </div>
  )
}
