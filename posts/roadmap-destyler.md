---
title: 未来的 Destyler UI
date: 2024-07-14T20:52:00.000
lang: zh
duration: 25min
layout: 'default'
read: true
---

<script setup>
  import { ref } from 'vue'
  const news = ref([
    {
      to: 'issues/65',
      type: 'issue',
      status: 'open',
      title: 'todo add test file'
    },
    {
      to: 'pull/67',
      type: 'pull',
      status: 'open',
      title: 'feat: add histoire module'
    },
  ])
  const olds = ref([
    {
      to: 'pull/64',
      type: 'pull',
      status: 'merged',
      title: 'feat: add all components slots type'
    },
    {
      to: 'pull/62',
      type: 'pull',
      status: 'merged',
      title: 'feat: update the hook, add types to emits'
    },
    {
      to: 'pull/58',
      type: 'pull',
      status: 'merged',
      title: 'refactor: rework each component\'s handling of props and name.'
    },
  ])

</script>

<Title />

> 前景提要 > [Destyler Beta 10 发布](./destyler-beta10.md)

在这里我们已经重新修改了很多次 Destyler 的一些代码，让我们在使用和开发 Destyler 的时候体验感更好。

具体可以查看这些 「 Pull Requests / Issues 」

<GitHubCard v-for="pr in olds" :key="pr.to" :to="`https://github.com/destyler/destyler/${pr.to}`" :type="pr.type" :status="pr.status" :title="pr.title" />

## 过去的总结

我们修改了组件的 name 和 props 的处理方式上，在下一个版本，我们将组件的引入方式从 `import { DestylerAlert } from 'destyler'` 改为 `import { Alert } from 'destyler'`，这样可以更好的使用组件。

同时我们将一些关联的 props 也进行了修改，例如 `MenuArrow` 的 `width` 和 `height` ，我们将这些 props 改为直接使用了 `Arrow` 的 `width` 和 `height`，这样可以更好让我们在开发组件时思路更清晰。

在这之后我们思考和验证了如何让组件的 DX 更加完美，我们修改了 Emits 的引入方式 可以在 Vue.js 的 [playground](https://play.vuejs.org/#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) 中看到我们组件 Emits 的全新方式，意味着我们在使用组件中增加了 Emits 的类型。

为了让组件的类型更加丰富，我们还给每一个组件都增加了插槽的类型。虽然这个只能在 开发 Destyler 中有用。

## 未来

<GitHubCard v-for="pr in news" :key="pr.to" :to="`https://github.com/destyler/destyler/${pr.to}`" :type="pr.type" :status="pr.status" :title="pr.title" />

我们目前规划了一些的路线图，我们将会逐渐完善一些基本的东西，例如单元测试，和一些我们的预设样式，我发现 Sefirot UI 给了一个 组件记录 的启发，我们也载入了 [histoire.dev](https://histoire.dev/) 让用户更好的查看我们的组件的使用方式。

同时我们需要编写完善的测试案例，让组件更加健硕。

### 关于 预设样式

我在之前有一个个人觉得蛮不错的样式库 [elonehoo/ui](https://github.com/elonehoo/ui) ，当组件库的测试案编写完成，我们将会逐步的完成第一个 theme 的库，就是基于这个 UI 库来实现。

## 结束语

非常感谢你可以关注到 Destyler，我会尽力让这个库更加完善，让更多的人可以使用它。

