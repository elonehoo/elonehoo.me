import { createFileRoute, notFound } from '@tanstack/react-router'
import { MarkdownContent } from '../components/MarkdownContent'
import { getContent } from '../content'

export const Route = createFileRoute('/')({
  loader: () => {
    const record = getContent('/')
    if (!record)
      throw notFound()
    return record
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.title || 'Elone Hoo' },
      { name: 'description', content: loaderData?.description || 'Elone Hoo\'s Portfolio' },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  const record = Route.useLoaderData()
  return (
    <article className="prose-md">
      <MarkdownContent record={record} />
    </article>
  )
}
