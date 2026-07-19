import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { SocialIcon } from './SocialIcon'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterSubscribe() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const isLoading = status === 'loading'

  function closeDialog() {
    if (!isLoading)
      setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen)
      return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isLoading)
        setIsOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isLoading, isOpen])

  async function subscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })
      const body = await response.json().catch(() => ({})) as { message?: string }

      if (!response.ok)
        throw new Error(body.message || '订阅失败，请稍后再试。')

      setEmail('')
      setStatus('success')
      setMessage('订阅成功，新文章会发到你的邮箱。')
    }
    catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : '订阅失败，请稍后再试。')
    }
  }

  return (
    <>
      <button
        type="button"
        className="group relative cursor-pointer bg-transparent p-0 text-gray-9 hover:text-gray-12"
        onClick={() => {
          setIsOpen(true)
          setStatus('idle')
          setMessage('')
        }}
      >
        Subscribe
        <span className="absolute -right-5.5 bottom-[5px] block h-4 w-4 shrink-0 rounded-sm bg-action/5 p-px text-action/95 op-0 group-hover:op-100">
          <SocialIcon name="RSS" />
        </span>
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="newsletter-backdrop fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget)
              closeDialog()
          }}
        >
          <form
            className="w-full max-w-[360px] rounded-sm border border-gray-6 bg-gray-1 p-5 text-left shadow-xl dark:bg-gray-2"
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-title"
            onSubmit={subscribe}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="newsletter-title" className="m-0 text-base font-medium text-gray-12">
                  新文章邮件通知
                </h2>
                <p className="mt-1 text-sm text-gray-10">
                  写入邮箱后，新 posts 会发送给你。
                </p>
              </div>
              <button
                type="button"
                className="cursor-pointer rounded-sm bg-transparent px-1.5 py-0.5 text-gray-9 hover:bg-gray-3 hover:text-gray-12"
                disabled={isLoading}
                aria-label="关闭"
                onClick={closeDialog}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <label htmlFor="newsletter-email" className="mt-4 block text-sm font-medium text-gray-12">
              Email
            </label>
            <div className="mt-2 flex flex-col gap-2">
              <input
                id="newsletter-email"
                value={email}
                className="min-w-0 rounded-sm border border-gray-6 bg-gray-1 px-2.5 py-2 text-sm text-gray-12 outline-none transition placeholder:text-gray-9 focus:border-action disabled:cursor-not-allowed disabled:op-60 dark:bg-gray-2"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                disabled={isLoading}
                onChange={event => setEmail(event.target.value)}
              />
              <input
                value={website}
                className="hidden"
                type="text"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                onChange={event => setWebsite(event.target.value)}
              />
              <button
                className="cursor-pointer rounded-sm bg-action px-3 py-2 text-sm font-medium text-gray-1 transition disabled:cursor-not-allowed disabled:op-60 dark:text-dark"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? '提交中' : '订阅'}
              </button>
            </div>
            {message && (
              <p className={`mt-2 text-sm ${status === 'error' ? 'text-red-500' : 'text-gray-10'}`} aria-live="polite">
                {message}
              </p>
            )}
          </form>
        </div>,
        document.body,
      )}
    </>
  )
}
