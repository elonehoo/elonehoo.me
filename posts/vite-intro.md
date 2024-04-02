---
title: vite简介
date: 2023-01-02T21:36:00
lang: zh
duration: 10min
layout: 'default'
---

<Title />

Vite 由 Vue 的作者尤雨溪设计并开发，目前在"bundless 界"处于领先地位，试图替代 Webpack dev server，提升开发效率。

受惠于 ESM 与 esbuild，Vite 给人的第一印象是快。但“快”不是 Vite 所有的特征。

前端工程化通常是一个很棘手的问题。从源码转译、对于不同静态资源的导入，到上线时需要的打包、uglify 等配置的加入，让 Webpack 的配置越来越复杂，增加了配置难度。同时也增加了启动时间和热启动时间，影响了开发效率。

Vite 的配置规借鉴[借鉴](https://twitter.com/youyuxi/status/1460406787757072386?s=21)了 Parcel 的 Zero configuration (即开箱即用) 的概念，降低了配置前端项目的复杂度。

Vite 开箱即用的能力依赖于一个事实：前端工程化越来越趋近于标准化，业内社区对于如何处理常见文件已经有了共识。工具可以根据文件后缀自动判断使用哪种插件, 如为 module.css 使用 Module CSS, .json 导入为 js 模块, .tsx 文件的 TS / React 转译等。

同时借鉴于 Parcel，Vite 把用户的 index.html 作为入口文件，作为首页渲染的模板。同时以模板里的 main 文件为线索，构建一个依赖资源树，提前优化来自于`node_modules`的依赖，用 esbuild 处理为更标准的 ESM 模块、或是打包有很多零碎模块的依赖(如 lodash)，放到 `.vite` 目录中，减少 IO 和运算。

---

## 如何使用 Vite 加速本地开发环境

对于从零开始的 React 项目来说，可以用 Vite 配合`@vitejs/plugin-react-refresh`直接拿来用。

移植已有项目的问题因配置不同有所差异，同时可能会遇到 Vite 社区没有碰到过的场景。对于前端工程化最佳实践来说，我们可以先把项目拆分成最小可运行版本之后再做配置。这对 Vite 来说也是通用的。

### 配置过程

#### index.html 入口

首先，我们需要为 index.html 增加 `<script type="module" src="/index.ts"></script>`, 指定入口 ts 文件。

#### 移植 Webpack 配置

#### 配置 emotion 的 React CSS 属性

在 Vite 支持自定义 babel plugin 之前，我们需要使用 esbuild 的 jsxInject，使其功能正常工作：

```js
esbuild: {
  jsxFactory: 'jsx',
  jsxFragment: '__Fragment__',
  jsxInject: `
* @jsx jsx */
import { jsx } from '@emotion/react'
import { Fragment as __Fragment__ } from 'react'`
}
```

#### 确保业务模块源码符合 ESM 规范，并且源码与依赖没有使用 TC39 Stage 3 以下的提案

实际上，大多数配置的坑在于如何处理外部依赖不同模块实现。

这是因为 vite 在代码和依赖预编译时会使用到 esbuild，但由于 esbuild 设计上只会考虑 TC39 stage 3 以上版本，如源码或依赖中使用了 export default from, decorator 或是 pipeline operator 等语法，会导致转化失败。

对于不能被 Vite 内建支持的功能，如果没有官方 vite 的插件支持，我们可以看一下是否有相关 Rollup 插件，因为 Vite 的插件 API 与 Rollup 兼容，大多数 Rollup 插件可以直接拿到 Vite 中使用。但遇到特别的配置，就得我们自己实现一个了。

## 优化

终于成功使用上了 Vite，启动时间与热更新时间确实得到了大幅提升，但我们从体验中能感觉到似乎还有可能提升的空间。

### Node 服务启动时间优化

前端的 mock 服务中有可能有大量的 mock 的 json 数据，Node 启动时会预处理这些数据，拖慢了冷启动时间。

但启动时我们并不需要使用这些数据，因此可以做成 dynamic import ，跳过对于这些文件的载入，使得服务启动时间降低了 3 秒。

### 使用前端代码按需加载降低网络请求瀑布流

前端代码如果没有做懒加载，会导致所有前端资源在第一次加载的时候就会全部缓存到浏览器，产生大量的 network 请求，严重降低了首次加载的速度。

与服务启动时间优化类似，我们可以用 react-router，配合 React.Lazy 做成按需加载前端模块，这样只有访问到的资源才会产生 network 请求，降低了第一次加载页面的时间。

### 暂时不使用 Vite 构建项目

Vite 不光可以作为开发工具，同时还可以“同构”实现开发/打包使用相同配置。

不同于 Vite 在开发时使用 esbuild 打包依赖与转移源码，Vite 在构建时使用了 Rollup 作为了打包工具。

这其实带来了一个问题：开发和构建使用的工具链十分不同，导致我们可能会出现顾此失彼的情况。有时在开发时可以使用的代码，在构建时就出了问题，比如 esbuild 和@rollup/plugin-commonjs 对默认导出的处理不同。

Vite 专门有一个 "inconsistency" 标签用来追踪 dev 和 build 差异问题。

## Vite 的价值

### 本地开发性能提升

极大地降低了开发大型项目时的启动时间与热更新时间，减少了“仪式感”，提升了开发体验，潜移默化的影响开发效率。

- 使用 webpack-dev-server，启动到页面可以载入大约耗时 20s；热更新时间大约 1 秒。
- 使用 vite 后：冷启动时间在 2s 以内；热更新立刻生效。

另外, 使用 vite 还减少了热更新时产生的高磁盘读写、高 CPU/内存占用，对开发环境资源占用更友好，不再会出现 JavaScript heap out of memory 的情况。

### 前端工程标准化

长期来看，以 ESM 为核心，推进前端工程化的标准化，对简化前端工程化工具上有十分重大的意义。
同时 Vite 推崇的即开即用的模式，对我们设计脚手架工具上很有参考价值。
