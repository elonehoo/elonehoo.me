import { createFileRoute, notFound } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { MarkdownContent } from '../components/MarkdownContent'
import { getContent } from '../content'

export const Route = createFileRoute('/$type/$id')({
  loader: ({ params }) => {
    const record = getContent(`/${params.type}/${params.id}`)
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

function ContentDetailPage() {
  const record = Route.useLoaderData()
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
