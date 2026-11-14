import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { LearnArticle } from '../components/LearnArticle'
import { MarkdownContent } from '../components/MarkdownContent'
import { getContent } from '../content'
import { findLearnNode, firstLearnPage, getLearnTutorials, learnHasContent } from '../learn'

export const Route = createFileRoute('/$type/$id')({
  loader: ({ params }) => {
    const path = `/${params.type}/${params.id}`
    if (path.startsWith('/learn/'))
      redirectLearnTitle(path)

    const record = getContent(path)
    if (!record)
      throw notFound()
    return record
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} - Elone Hoo` : 'Elone Hoo' },
      { name: 'description', content: loaderData?.description || '' },
    ],
  }),
  component: ContentDetailPage,
})

function redirectLearnTitle(path: string) {
  const found = findLearnNode(getLearnTutorials(), path)
  if (!found || learnHasContent(found.node))
    return

  const page = firstLearnPage(found.node)
  if (!page)
    throw notFound()

  throw redirect({ href: page.path })
}

function ContentDetailPage() {
  const record = Route.useLoaderData()
  if (record.path.startsWith('/learn/'))
    return <LearnArticle path={record.path} />

  return (
    <article>
      <h1 className="mt-4 flex items-center gap-x-1.5 pt-2 text-18px font-medium before:flex before:content-['#'] before:items-center before:justify-center before:text-action">
        {record.title}
      </h1>
      <div className="mt-1 flex op-50">
        {record.date && <span>{dayjs(record.date).format('M月D日')}</span>}
        {record.date && record.duration && <span className="mx-1">•</span>}
        {record.duration && <span>{record.duration}</span>}
      </div>
      <div className="prose-md mt-4">
        <MarkdownContent record={record} />
      </div>
    </article>
  )
}
