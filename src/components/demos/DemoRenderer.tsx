import type { ComponentType } from 'react'
import { lazy, Suspense } from 'react'
import { DemoFrame } from './DemoFrame'

interface DemoModule {
  default: ComponentType
}

// The registry remains explicit so every demo is split into its own browser chunk.
const demoComponents: Record<string, ReturnType<typeof lazy>> = {
  '0009.graph-slider': lazy(() => import('./interactive/0009.graph-slider') as Promise<DemoModule>),
  '0011.craft-motion': lazy(() => import('./static-a/0011.craft-motion') as Promise<DemoModule>),
  '0012.craft-tab-bar': lazy(() => import('./static-a/0012.craft-tab-bar') as Promise<DemoModule>),
  '0013.craft-todo': lazy(() => import('./interactive/0013.craft-todo') as Promise<DemoModule>),
  '0014.craft-feedback': lazy(() => import('./interactive/0014.craft-feedback') as Promise<DemoModule>),
  '0015.craft-clipboard': lazy(() => import('./interactive/0015.craft-clipboard') as Promise<DemoModule>),
  '0016.craft-tea': lazy(() => import('./static-a/0016.craft-tea') as Promise<DemoModule>),
  '0017.craft-fistbump': lazy(() => import('./interactive/0017.craft-fistbump') as Promise<DemoModule>),
  '0018.craft-font': lazy(() => import('./static-a/0018.craft-font') as Promise<DemoModule>),
  '0019.100-01': lazy(() => import('./interactive/0019.100-01') as Promise<DemoModule>),
  '0020.100-02': lazy(() => import('./interactive/0020.100-02') as Promise<DemoModule>),
  '0021.100-03': lazy(() => import('./interactive/0021.100-03') as Promise<DemoModule>),
  '0022.100-04': lazy(() => import('./interactive/0022.100-04') as Promise<DemoModule>),
  '0023.100-05': lazy(() => import('./interactive/0023.100-05') as Promise<DemoModule>),
  '0024.100-06': lazy(() => import('./static-a/0024.100-06') as Promise<DemoModule>),
  '0025.100-07': lazy(() => import('./static-a/0025.100-07') as Promise<DemoModule>),
  '0026.100-08': lazy(() => import('./interactive/0026.100-08') as Promise<DemoModule>),
  '0027.100-09': lazy(() => import('./interactive/0027.100-09') as Promise<DemoModule>),
  '0028.100-10': lazy(() => import('./static-a/0028.100-10') as Promise<DemoModule>),
  '0029.100-11': lazy(() => import('./static-a/0029.100-11') as Promise<DemoModule>),
  '0030.100-12': lazy(() => import('./interactive/0030.100-12') as Promise<DemoModule>),
  '0031.100-13': lazy(() => import('./static-a/0031.100-13') as Promise<DemoModule>),
  '0032.100-14': lazy(() => import('./static-a/0032.100-14') as Promise<DemoModule>),
  '0033.100-15': lazy(() => import('./static-a/0033.100-15') as Promise<DemoModule>),
  '0034.100-16': lazy(() => import('./static-a/0034.100-16') as Promise<DemoModule>),
  '0035.100-17': lazy(() => import('./static-a/0035.100-17') as Promise<DemoModule>),
  '0036.100-18': lazy(() => import('./static-a/0036.100-18') as Promise<DemoModule>),
  '0037.100-19': lazy(() => import('./interactive/0037.100-19') as Promise<DemoModule>),
  '0038.100-20': lazy(() => import('./static-b/0038.100-20') as Promise<DemoModule>),
  '0039.100-21': lazy(() => import('./interactive/0039.100-21') as Promise<DemoModule>),
  '0040.100-22': lazy(() => import('./static-b/0040.100-22') as Promise<DemoModule>),
  '0041.100-23': lazy(() => import('./static-b/0041.100-23') as Promise<DemoModule>),
  '0042.100-24': lazy(() => import('./static-b/0042.100-24') as Promise<DemoModule>),
  '0043.100-25': lazy(() => import('./static-b/0043.100-25') as Promise<DemoModule>),
  '0044.100-26': lazy(() => import('./static-b/0044.100-26') as Promise<DemoModule>),
  '0045.100-27': lazy(() => import('./static-b/0045.100-27') as Promise<DemoModule>),
  '0046.100-28': lazy(() => import('./static-b/0046.100-28') as Promise<DemoModule>),
  '0047.100-29': lazy(() => import('./static-b/0047.100-29') as Promise<DemoModule>),
  '0048.100-30': lazy(() => import('./static-b/0048.100-30') as Promise<DemoModule>),
  '0049.100-31': lazy(() => import('./static-b/0049.100-31') as Promise<DemoModule>),
  '0050.100-32': lazy(() => import('./static-b/0050.100-32') as Promise<DemoModule>),
  '0051.100-33': lazy(() => import('./static-b/0051.100-33') as Promise<DemoModule>),
  '0052.100-34': lazy(() => import('./static-b/0052.100-34') as Promise<DemoModule>),
  '0053.100-35': lazy(() => import('./static-b/0053.100-35') as Promise<DemoModule>),
  '0054.100-36': lazy(() => import('./static-b/0054.100-36') as Promise<DemoModule>),
}

export function DemoRenderer({ name }: { name?: string }) {
  const Demo = name ? demoComponents[name] : undefined

  if (!Demo) {
    return (
      <DemoFrame>
        <span className="text-sm text-gray-9">{name ? `Demo: ${name}` : 'Demo unavailable'}</span>
      </DemoFrame>
    )
  }

  return (
    <DemoFrame tall={name === '0040.100-22'}>
      <Suspense fallback={<span className="text-sm text-gray-9">Loading…</span>}>
        <Demo />
      </Suspense>
    </DemoFrame>
  )
}
