import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { MarkdownContent } from '../components/MarkdownContent'
import { LearnArticle } from '../components/LearnArticle'
import { getContent } from '../content'
import { findLearnNode, firstLearnPage, getLearnTutorials, learnHasContent } from '../learn'

export const Route = createFileRoute('/learn/$')({
  loader: ({ params }) => {
    const splat = (params._splat || '').replace(/^\/+|\/+$/g, '')

    if (!splat) {
      const record = getContent('/learn')
      if (!record)
        throw notFound()
      return { description: record.description, kind: 'index' as const, title: record.title }
    }

    const path = `/learn/${splat}`
    const found = findLearnNode(getLearnTutorials(), path)
    if (!found)
      throw notFound()

    const page = learnHasContent(found.node) ? found.node : firstLearnPage(found.node)
    if (!page)
      throw notFound()
    if (page.path !== path) {
      throw redirect({
        params: { _splat: page.path.slice('/learn/'.length) },
        to: '/learn/$',
      })
    }

    const title = page.path === found.tutorial.path
      ? `${page.title} - Elone Hoo`
      : `${page.title} - ${found.tutorial.title}`

    return {
      description: page.description || found.tutorial.description,
      kind: 'page' as const,
      path: page.path,
      title,
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.title || 'Elone Hoo' },
      { name: 'description', content: loaderData?.description || '' },
    ],
  }),
  component: LearnRoute,
})

function LearnRoute() {
  const data = Route.useLoaderData()

  if (data.kind === 'index') {
    const record = getContent('/learn')
    if (!record)
      return null
    return (
      <article className="prose-md">
        <MarkdownContent record={record} />
      </article>
    )
  }

  return <LearnArticle path={data.path} />
}
