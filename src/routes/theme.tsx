import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/theme')({
  beforeLoad: () => {
    throw redirect({ to: '/posts/2024-new-theme' as never })
  },
})
