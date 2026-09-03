import type { ReactNode } from 'react'
import type { ContentRecord } from '../content'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import ReactMarkdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import remarkSupersub from 'remark-supersub'
import { visit } from 'unist-util-visit'
import { navigation } from '../config'
import { getSectionRecords, groupRecordsByYear } from '../content'
import { rehypeShikiVitesse } from '../lib/shiki-rehype'
import { DemoRenderer } from './demos/DemoRenderer'

function remarkContentDirectives() {
  return (tree: unknown) => {
    visit(tree as Parameters<typeof visit>[0], (node: any, _index, parent: any) => {
      if (!['containerDirective', 'leafDirective', 'textDirective'].includes(node.type))
        return

      const data = node.data || (node.data = {})
      const attributes = node.attributes || {}
      const componentNames: Record<string, string> = {
        'demos': 'demo-block',
        'doc-list': 'document-list',
        'lang-tag': 'lang-tag',
        'link-list': 'link-list',
        'list': 'navigation-list',
      }

      if (node.name === 'br') {
        data.hName = 'br'
        return
      }

      if (node.name === 'div') {
        data.hName = 'div'
        data.hProperties = attributes
        return
      }

      const hName = componentNames[node.name] || 'span'
      const hProperties = {
        ...attributes,
        'data-directive': node.name,
      }

      if (parent?.type === 'paragraph' && parent.children?.length === 1 && hName !== 'span') {
        parent.data = { hName, hProperties }
        parent.children = []
        return
      }

      data.hName = hName
      data.hProperties = hProperties
    })
  }
}

function prepareMarkdown(source: string) {
  return source
    .replace(/<script\s+setup[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/^::div(\{[^\n]*\})\n([\s\S]*?)\n::$/gm, ':::div$1\n$2\n:::')
    .replace(
      /<GitHubCard\s+v-for="pr in olds"[^>]*\/>/g,
      [
        '- [feat: add all components slots type](https://github.com/destyler/destyler/pull/64)',
        '- [feat: update the hook, add types to emits](https://github.com/destyler/destyler/pull/62)',
        '- [refactor: rework each component props and name](https://github.com/destyler/destyler/pull/58)',
      ].join('\n'),
    )
    .replace(
      /<GitHubCard\s+v-for="pr in news"[^>]*\/>/g,
      [
        '- [todo add test file](https://github.com/destyler/destyler/issues/65)',
        '- [feat: add histoire module](https://github.com/destyler/destyler/pull/67)',
      ].join('\n'),
    )
}

function normalizeHref(href: string, currentPath: string) {
  if (/^(?:[a-z]+:|#)/i.test(href))
    return href

  const normalized = href.replace(/\.md(?=($|#))/, '')
  if (normalized.startsWith('/'))
    return normalized

  return new URL(normalized, `https://elonehoo.me${currentPath}`).pathname
}

function NavigationArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="hidden h-3 w-3 sm:block"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M14 12H4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="m18.586 13.603-.967.761C16.054 15.597 15.27 16.214 14.635 15.933 14 15.651 14 14.688 14 12.761v-1.522c0-1.927 0-2.89.635-3.172.636-.281 1.419.336 2.984 1.57l.967.76C19.529 11.14 20 11.512 20 12s-.471.86-1.414 1.603Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NavigationList() {
  return (
    <div className="not-prose mt-6 flex flex-wrap items-center gap-3">
      {navigation.map(item => (
        <Link
          key={item.link}
          to={item.link as never}
          className="navigation-link flex w-fit cursor-pointer items-center gap-x-0.5 rounded-sm border border-gray-6 px-1.5 py-1 text-sm font-medium text-gray-8 hover:border-action hover:bg-action hover:text-gray-1"
        >
          {item.text}
          <NavigationArrowIcon />
        </Link>
      ))}
    </div>
  )
}

function OutlineYear({ value, small = false }: { value: string, small?: boolean }) {
  return (
    <div className="relative h-10 select-none text-base">
      <span className={`pointer-events-none absolute font-bold color-transparent [-webkit-text-stroke:1px_rgba(0,0,0,0.2)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.2)] ${small ? 'top-0 text-3em' : 'top-1rem text-8em'}`}>
        {value}
      </span>
    </div>
  )
}

function DocumentList({ record }: { record: ContentRecord }) {
  const groups = groupRecordsByYear(getSectionRecords(record.path))

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

interface LinkItem {
  desc?: string
  link?: string
  name?: string
}

function LinkList({ record }: { record: ContentRecord }) {
  const groups = record.meta[record.slug] as Record<string, LinkItem[]> | undefined

  if (!groups)
    return null

  return (
    <div className="not-prose mt-10 space-y-8">
      {Object.entries(groups).map(([name, items]) => (
        <section key={name} className="space-y-4">
          <OutlineYear value={name} small />
          <div>
            {items.map(item => (
              <div key={`${name}-${item.name}`} className="group mt-4 flex flex-col">
                <a href={item.link} target="_blank" rel="noreferrer">{item.name}</a>
                <span className="mt-2">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function YouTube({ src }: { src?: string }) {
  const id = src?.match(/[?&]v=([^&]+)/)?.[1] || src?.match(/youtu\.be\/([^?]+)/)?.[1]
  return id
    ? <iframe className="embed-frame" src={`https://www.youtube-nocookie.com/embed/${id}`} title="YouTube video" allowFullScreen />
    : null
}

function BiliBili({ aid }: { aid?: string }) {
  return aid
    ? <iframe className="embed-frame" src={`https://player.bilibili.com/player.html?aid=${aid}`} title="BiliBili video" allowFullScreen />
    : null
}

function GitHubCard({ to, title, repo, name }: { to?: string, title?: string, repo?: string, name?: string }) {
  const href = to || (repo ? `https://github.com/${repo}` : undefined)
  if (!href)
    return null

  return <a className="github-card" href={href} target="_blank" rel="noreferrer">{title || name || repo || href}</a>
}

function RatingOrValue({ directive, value, children }: { directive?: string, value?: string, children?: ReactNode }) {
  if (directive?.toLowerCase() === 'start') {
    return (
      <span aria-label={`${value} 分`}>
        ★
        {value}
      </span>
    )
  }

  return <span>{value || children}</span>
}

export function MarkdownContent({ record }: { record: ContentRecord }) {
  const components: Record<string, any> = {
    'a': ({ node: _node, href = '', children, ...props }: { node?: unknown, href?: string, children?: ReactNode }) => {
      const normalized = normalizeHref(href, record.path)
      const isInternal = normalized.startsWith('/')

      return isInternal
        ? <Link to={normalized as never} {...props}>{children}</Link>
        : <a href={normalized} {...props}>{children}</a>
    },
    'bilibili': ({ aid }: { aid?: string }) => <BiliBili aid={aid} />,
    'demo-block': ({ name }: { name?: string }) => <DemoRenderer name={name} />,
    'document-list': () => <DocumentList record={record} />,
    'githubcard': (props: Record<string, string>) => <GitHubCard {...props} />,
    'githublink': (props: Record<string, string>) => <GitHubCard {...props} />,
    'icon': () => <span aria-hidden="true" />,
    'lang-tag': ({ name, status }: { name?: string, status?: string }) => (
      <span>
        {name}
        {status && <sup>{status}</sup>}
      </span>
    ),
    'link-list': () => <LinkList record={record} />,
    'navigation-list': NavigationList,
    // Directive spans only; default path keeps Shiki token style/className intact.
    'span': ({ node: _node, children, ...props }: {
      'node'?: unknown
      'children'?: ReactNode
      'data-directive'?: string
      'value'?: string
      [key: string]: unknown
    }) => {
      if (props['data-directive']) {
        return (
          <RatingOrValue directive={props['data-directive']} value={props.value as string | undefined}>
            {children}
          </RatingOrValue>
        )
      }

      return <span {...props}>{children}</span>
    },
    'tweet': ({ id }: { id?: string }) => id
      ? <a className="github-card" href={`https://x.com/i/status/${id}`} target="_blank" rel="noreferrer">View post on X</a>
      : null,
    'video': ({ node: _node, ...props }: React.VideoHTMLAttributes<HTMLVideoElement> & { node?: unknown }) => <video {...props} autoPlay={props.autoPlay ?? true} playsInline />,
    'youtube': ({ src }: { src?: string }) => <YouTube src={src} />,
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkDirective, remarkContentDirectives, remarkSupersub]}
      rehypePlugins={[
        rehypeRaw,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: ['heading-anchor'] } }],
        rehypeShikiVitesse,
      ]}
      components={components}
    >
      {prepareMarkdown(record.source)}
    </ReactMarkdown>
  )
}
