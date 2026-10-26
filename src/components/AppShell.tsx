import type { MouseEvent, ReactNode } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { ArrowLeft, ArrowUp } from 'lucide-react'
import { siteConfig, socialLinks } from '../config'
import { NewsletterSubscribe } from './NewsletterSubscribe'
import { SocialIcon } from './SocialIcon'
import { TableOfContents } from './TableOfContents'

function SocialOutline() {
  return (
    <div className="op-0 lg:fixed lg:right-12 lg:top-12 lg:op-100">
      {socialLinks.map(social => (
        <div key={social.link} className="group relative text-gray-9 hover:text-gray-12">
          <a href={social.link} target={social.link.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
            {social.label}
          </a>
          <span className="absolute -right-5.5 bottom-[5px] block h-4 w-4 shrink-0 rounded-sm bg-action/5 p-px text-action/95 op-0 group-hover:op-100">
            <SocialIcon name={social.label} />
          </span>
        </div>
      ))}
      <NewsletterSubscribe />
    </div>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: state => state.location.pathname })
  const isDetailPage = pathname.split('/').filter(Boolean).length > 1

  function toggleColorMode(event: MouseEvent<HTMLDivElement>) {
    const root = document.documentElement
    const nextMode = root.classList.contains('dark') ? 'light' : 'dark'
    const x = event.clientX
    const y = event.clientY
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )
    root.style.setProperty('--theme-transition-x', `${x}px`)
    root.style.setProperty('--theme-transition-y', `${y}px`)
    root.style.setProperty('--theme-transition-radius', `${radius}px`)
    root.dataset.themeSwitch = nextMode

    const applyTheme = () => {
      root.classList.toggle('dark', nextMode === 'dark')
      localStorage.setItem('color-mode', nextMode)
    }
    const transition = typeof document.startViewTransition === 'function'
      ? document.startViewTransition(applyTheme)
      : undefined

    if (!transition) {
      applyTheme()
      delete root.dataset.themeSwitch
      return
    }

    transition.finished.finally(() => delete root.dataset.themeSwitch)
  }

  return (
    <div id="page-top" className="site-background min-h-screen p-4 py-10 md:p-12" onDoubleClick={toggleColorMode}>
      <div className="animate-in justify-between fade-in duration-500 md:flex">
        <main className="page-content flex flex-col gap-y-6 overflow-x-hidden md:max-w-[550px] md:gap-y-0">
          {children}
          {pathname !== '/' && (
            <div className="mt-10 flex items-center justify-between">
              <button
                className="flex cursor-pointer items-center gap-x-1 rounded-sm bg-action/80 px-1 py-0.5 text-sm font-medium text-gray-1 hover:bg-action dark:bg-action dark:text-dark"
                type="button"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4" />
                cd ..
              </button>
              <a className="flex items-center gap-x-1 rounded-sm bg-action/80 px-1.5 py-1 text-sm font-medium text-gray-1 hover:bg-action dark:bg-action dark:text-dark" href="#page-top">
                <ArrowUp className="h-4 w-4" />
                Back to Top
              </a>
            </div>
          )}
          <footer className="mb-6 mt-10">
            <a className="relative inline-flex w-fit items-center hover:bg-action hover:text-gray-12" href={siteConfig.footer.license.link} target="_blank" rel="noreferrer">
              {siteConfig.footer.license.text}
            </a>
            <span className="ml-1">{siteConfig.footer.copyright}</span>
          </footer>
        </main>
        <aside className="md:max-w-[550px] md:text-right">
          <div className="p-1 md:p-4">
            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 md:mt-0 md:flex-col md:items-end md:gap-y-0">
              {isDetailPage ? <TableOfContents pathname={pathname} /> : <SocialOutline />}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
