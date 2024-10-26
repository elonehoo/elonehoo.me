---
page: true
projects:
  Current Focus:
    - name: 'Destyler'
      link: 'https://github.com/destyler/destyler'
      desc: 'Vue.js 的无样式组件库'
      icon: '/projects/destyler-packages.png'
      license:
        - type: 'MIT'
          link: 'https://github.com/destyler/destyler/blob/main/LICENSE'
    - name: 'Vitepress Theme'
      link: 'https://github.com/destyler/vitepress-theme'
      desc: 'Destyler 社区的 Vitepress 主题'
      icon: '/projects/destyler-packages.png'
      license:
        - type: 'MIT'
          link: 'https://github.com/destyler/vitepress-theme/blob/main/LICENSE'
    - name: 'Elone Hoo Blog'
      link: 'https://github.com/elonehoo/elonehoo.me'
      desc: '我的新博客主题'
      icon: 'https://github.com/elonehoo.png'
      license:
        - type: 'MIT'
          link: 'https://github.com/elonehoo/elonehoo.me/blob/main/LICENSE'
  Upcoming:
    - name: 'Naive-css'
      link: 'https://github.com/wip-elonehoo/.github/blob/main/profile/README.md'
      desc: 'Only Scoped Atomic CSS Engine.'
      icon: 'i-carbon-ibm-cloud-pak-netezza'
    - name: 'Livraison'
      link: 'https://github.com/livraison-dev'
      desc: 'Made a open source API development ecosystem'
      icon: 'livraison'
    - name: 'nuxt-rss'
      link: 'https://github.com/wip-elonehoo/.github/blob/main/profile/README.md'
      desc: 'Nuxt RSS module'
      icon: 'i-carbon-rss'
---

<ProjectsPage :items="$frontmatter.projects" />
