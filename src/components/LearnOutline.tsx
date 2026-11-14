import type { LearnNode } from '../learn'
import { Link } from '@tanstack/react-router'
import { findLearnNode, getLearnTutorials, learnHasContent } from '../learn'
import { TimelineList } from './TimelineList'

export function TutorialCatalog() {
  const records = getLearnTutorials().flatMap(tutorial => tutorial.record ? [tutorial.record] : [])

  if (!records.length)
    return <p className="not-prose mt-10 text-gray-9">还没有教程。</p>

  return <TimelineList records={records} />
}

export function LearnToc({ pathname }: { pathname: string }) {
  const found = findLearnNode(getLearnTutorials(), pathname)
  if (!found?.tutorial.children.length)
    return null

  return (
    <nav aria-label="章节" className="op-0 lg:fixed lg:right-12 lg:top-12 lg:op-100">
      <TocItems nodes={found.tutorial.children} pathname={pathname} />
    </nav>
  )
}

function TocItems({ depth = 0, nodes, pathname }: { depth?: number, nodes: LearnNode[], pathname: string }) {
  return (
    <ul className="m-0 list-none p-0">
      {nodes.map(node => (
        <li key={node.path} className={depth > 0 ? 'pr-3' : ''}>
          {learnHasContent(node)
            ? (
                <Link
                  className="toc-link text-gray-9 hover:text-gray-12"
                  data-active={node.path === pathname}
                  to={node.path as never}
                >
                  {node.title}
                </Link>
              )
            : <span className="text-gray-11">{node.title}</span>}
          {node.children.length > 0 && <TocItems depth={depth + 1} nodes={node.children} pathname={pathname} />}
        </li>
      ))}
    </ul>
  )
}
