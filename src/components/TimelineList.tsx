import type { ContentRecord } from '../content'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { groupRecordsByYear } from '../content'

export function OutlineYear({ value, small = false }: { value: string, small?: boolean }) {
  return (
    <div className="relative h-10 select-none text-base">
      <span className={`pointer-events-none absolute font-bold color-transparent [-webkit-text-stroke:1px_rgba(0,0,0,0.2)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.2)] ${small ? 'top-0 text-3em' : 'top-1rem text-8em'}`}>
        {value}
      </span>
    </div>
  )
}

export function TimelineList({ records }: { records: ContentRecord[] }) {
  const ordered = [...records].sort((left, right) => {
    return new Date(right.date || 0).getTime() - new Date(left.date || 0).getTime()
  })
  const groups = groupRecordsByYear(ordered)

  if (!groups.length)
    return null

  return (
    <div className="not-prose mt-10 space-y-8">
      {groups.map(group => (
        <section key={group.year} className="space-y-4">
          <OutlineYear value={group.year} />
          <div>
            {group.records.map(item => (
              <div key={item.path} className="group mt-4 flex flex-col">
                <div className="flex justify-between gap-x-4 md:gap-x-8">
                  {item.meta.upcoming === true
                    ? (
                        <span className="inline-flex items-center gap-x-1.5">
                          <a aria-disabled="true" tabIndex={-1}>{item.title}</a>
                          <span className="rounded-sm bg-gray-3 px-1 py-0.5 text-xs text-gray-9">upcoming</span>
                        </span>
                      )
                    : <Link to={item.path as never}>{item.title}</Link>}
                  {item.date && (
                    <time className="hidden text-gray-9 group-hover:text-gray-12 md:block" dateTime={item.date}>
                      {dayjs(item.date).format('M月D日')}
                    </time>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
