import { createFileRoute } from '@tanstack/react-router'
import { addNewsletterSubscriber, NewsletterUnavailableError, normalizeNewsletterEmail } from '../server/newsletter'
import '@tanstack/react-start'

export const Route = createFileRoute('/api/newsletter/subscribe')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({})) as { email?: unknown, website?: unknown }

        if (typeof body.website === 'string' && body.website.trim())
          return Response.json({ ok: true })

        const email = normalizeNewsletterEmail(body.email)
        if (!email)
          return Response.json({ message: '请输入有效邮箱。' }, { status: 400 })

        try {
          await addNewsletterSubscriber(email)
        }
        catch (error) {
          if (error instanceof NewsletterUnavailableError)
            return Response.json({ message: '预览环境暂不接受订阅，请访问正式网站。' }, { status: 503 })
          throw error
        }
        return Response.json({ ok: true })
      },
    },
  },
})
