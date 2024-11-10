import { createContentLoader } from 'vitepress'

export interface ProjectItem {
  name: string
  link: string
  desc: string
  icon: string
  license: {
    type: 'MIT' | 'Apache-2.0' | 'GPL-3.0'
    link: string
  }[]
}

export interface Project {
  projects: ProjectItem[]
  url: string
}

declare const data: Project[]
export { data }

export default createContentLoader('projects.md', {
  excerpt: true,
  transform(raw): Project[] {
    return raw
      .map(({ url, frontmatter }) => ({
        url,
        projects: frontmatter.projects,
      }))
  },
})
