---
title: Destyler Beta 10 发布
date: 2024-02-01T13:35:00.000+08:00
lang: zh
duration: 25min
layout: 'default'
read: true
---

<Title />

> 这篇文章是第一次描述 [Destyler](https://github.com/destyler/destyler) ，所以本文会比往期的文章相对繁琐些。这是我个人的一个重大工具，我也遇到了很多问题，以及很许多的内容我想谈论。
> 如果你能花时间读完，不甚感激。若你在电脑端阅读，可在右侧查看目录。最后，希望能对你有所帮助 :)

## 什么是 Destyler？

Destyler 是一个无样式的 Vue 组件库，它受到了 [Radix-ui](https://github.com/radix-ui/primitives) 的启发，方便用户构建一个高质量的 Vue 应用。

当然 Destyler 不能算是一个高级的 UI 组件库，它是一个基础的 UI 组件库，我还需要给他提供更丰富的原型，让它足够支撑起所有人对于组件的需求。让更多人可以在 Destyler 的基础上进行二次开发，而不是从零开始。

## 在最开始的几个版本 Destyler 也经历了重构

<GitHubCard to="https://github.com/destyler/destyler/pull/1" type="pull" status="merged" title="refactor: SFC to Typescript" />

在这个 PR 中将刚开始的几个组件进行了重构，当然站在上帝视角上这次的重构是失败的，因为我并没有考虑到组件的复用性，以及用户对于这些组件的自定义需求。

这一次的重构踏入了插槽为主的地步，也就是说其实我只是提供了一些大盒子，然后让用户在指定的插槽来控制组件。

接下来，我们都会以 alert 组件为例子，来看看当时的我是如何设计的。

举个例子

```vue
<script setup lang="ts">
import { DestylerAlert, DestylerIcon } from 'destyler'
</script>

<template>
  <DestylerAlert>
    <template #icon>
      <DestylerIcon name="carbon-home" />
    </template>
    <template #title>
      <h1>标题</h1>
    </template>
    <template #close={handleClose}>
      <button @click="handleClose">关闭</button>
    </template>
  </DestylerAlert>
</template>
```

当然从这个角度我们并没有发现任何问题，但是如果在复杂一点的场景下，我们就会发现这个组件的复用性是非常差的。

然后，我们纵观整个组件库的历史，我们会发现在这个重构之后，有比较长的时间没有了任何的提交，这是因为我在思考如何设计一个更好的组件库。我开始去研究 Radix-ui，我发现了他们是以组件的形式来提供一些基础的组件，然后让用户去组合这些组件，来构建一个高质量的应用。

这让我十分兴奋，因为 Vue 提供了一个 [依赖注入](https://cn.vuejs.org/api/composition-api-dependency-injection.html#inject) 的 API，当时的我感觉这个 Api 仿佛就是为这个而生的。

所以我立马着手开始准备重新重构 Destyler。

## 最终模式的 Destyler

<GitHubCard to="https://github.com/destyler/destyler/pull/13" type="pull" status="merged" title="refactor!: because of the improper use of component slots and the poor reusability of the ui, it was necessary to redesign the api and write the." />

在这个 PR 中，我开始学习 Radix-ui 的组件，同时也开始编写了 primitive 原型组件，让组件可以更好的被渲染和使用。

那么来我们来看看这个时候的 alert 组件是如何被设计的。

```vue
<script setup lang="ts">
import { DestylerInfoRoot, DestylerIcon,DestylerClose } from 'destyler'
</script>

<template>
  <DestylerInfoRoot >
    <DestylerIcon name="carbon-home"  />
    <h5 >
      title
    </h5>
    <DestylerClose as="button">
      关闭
    </DestylerClose>
  </DestylerInfoRoot>
</template>
```

这个时候其实我们就可以看出一些端倪了，这样对于内部的大部分元素都会一个组件来进行控制，这样的话我们就可以很方便的进行组合了。

这是一个蛮重要的改变，因为 Destyler 从 插槽模式 转变为 组件模式。

## 在编写组件时，没有选用 SFC 而是选用了 h 函数

在开始设计 Destyler 的时候，就做好了一些调研，我发现了例如 [element-plus](https://github.com/element-plus/element-plus)，[nuxt/ui](https://github.com/nuxt/ui)，[primevue](https://github.com/primefaces/primevue) 等都是以 [SFC](https://cn.vuejs.org/api/sfc-spec.html#sfc-syntax-specification) 去编写的组件库，虽然 SFC 确实是 [Vue](https://cn.vuejs.org) 的一等公民，但是 SFC 的优点在无样式组件库中并没有很好的体现出来，相反 [h 函数](https://cn.vuejs.org/api/render-function.html#h)可以让我们更好的去 build 以及 IDE 的支持也更好。
当然我也没有选择 jsx 的方式去编写。

在这里我也遇到了许多的困难，组件 Props 的类型推导，最终导出的文件等等。

### 组件 Props 的类型推导

在之前都没有发现如果没有在 [`defineComponent`](https://cn.vuejs.org/api/general.html#definecomponent) 的 props 选项中定义 props 的类型，那么我们在外部所定义的类型是会丢失的。

例如

```ts twoslash
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'

export const props = {
  modelValue: {
    type: String as PropType<string>,
    required: true,
  },
}

export const Component = defineComponent({
  name: 'Component',
  props: props,
  setup(_) {

  },
  render() {
    return h('div', this.modelValue)
  },
})
```

在上述例子中，我们在外部定义了 props 的类型，同时让 `modelValue` 设置为必传参数，但是由于是在外部引入的，所以在 Component 中是无法确定 props 的 `required` 类型的。

而解决方案非常的简单。只需要要在 props 的结尾加上 `as const` 就可以解决这个问题。

例如

```ts twoslash
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'

export const props = {
  modelValue: {
    type: String as PropType<string>,
    required: true,
  },
} as const

export const Component = defineComponent({
  name: 'Component',
  props: props,
  setup(_) {

  },
  render() {
    return h('div', this.modelValue)
  },
})
```

那么我们就需要将这个 props 的类型也推导出来。在 [@destyler/shared](https://github.com/destyler/destyler/blob/main/packages/shared/src/naive/extract-prop-type.ts) 中编写了一个工具类，来帮助我们推导 props 的类型。

```ts
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import type { ExtractPublicPropTypes } from '@destyler/shared'

export const props = {
  modelValue: {
    type: String as PropType<string>,
    required: true,
  },
} as const

export type Props = ExtractPublicPropTypes<typeof props>

export const Component = defineComponent({
  name: 'Component',
  props: props,
  setup(_) {

  },
  render() {
    return h('div', this.modelValue)
  },
})
```

### 最终导出的文件

我们在观察 Destyler 的[组件集合包](https://www.npmjs.com/search?q=%40destyler)，在导出的时候我们其实会发现我们有一部分的组件其实是私有的，他们并不需要在使用的时候被使用，在之前我是在导出时全部导出，但是这是不正确的，因为在没有完善的文档支持下，用户是无法知道哪些组件是私有的，哪些组件是公开的。

所以我将组件的导出分为了两部分，一个是默认出口，只导出公开组件，而一个是组件出口，无论是公开组件还是私有组件都会被导出。

例如我们将 `alert` 分为三个组件，分别是 `root`, `close`, `body` 。
而 body 是私有组件，那么我们就可以这样导出。

那我们就可以这样导出

```vue
<script setup lang="ts">
import { Root, Close } from '@destyler/alert'
import { Body } from '@destyler/alert/component'
</script>
```

### 组件文件的名字

在 [#35](https://github.com/destyler/destyler/pull/35) 中，我将组件的文件名字进行了修改，之前的版本中，组件是以名字最开头的，例如 `alert` 他有三个组件组成，分别是 `root`, `body`, `close`，那么之前都是以 `alert` 为开头，皆是 `alertRoot`, `alertBody`, `alertClose`。

但是这样子确实让维护的时候不是很方便，因为我们其实是以组件为单位的进行分类，其实已经用文件夹进行分类，无需在使用名字进行分类。所以在这个 PR 中，我将组件的名字进行了修改，例如 `alert` 的组件就是 `root`, `close`, `body` 进行命名。

> 如果你也想搭建一个自己的组件库，那么可以参考一下上述的方法，避免进入跟我一样的坑 :)

## 现在能用吗？

简而言之：可以，但有注意事项。

Destyler 的组件库是可以使用的，但是由于我还没有完善文档，所以你可能会遇到一些问题，例如组件的使用方式，组件的 Props 等等。

它现在可以作为你目前所使用的组件库的补充，去建立一些单一的使用场景。

但是它的参数和一些 API 可能在每一个版本中都产生较大的变化，所以谨慎使用。

同时，欢迎分享你基于 Destyler 做制作的任何组件或帮助我们贡献更多的无样式组件。期待看到你的作品。

## 什么时候发布稳定版本？

我的想法是在 2024 年完成 45+ 的组件，当组件数量到达 45 时，我们会发布第一个稳定版本 0.0.1。

同时提供文档支持。

在记录文档编写的过程，也会发现很多的 bug ，在全部解决之后，就会发布 0.0.2 版本。

## 结束语

非常感谢你的阅读！如果你对它感兴趣，请记得查看 [destyler/destyler](https://github.com/destyler/destyler/tree/main) 仓库以了解更多细节
