---
title: Vue3 迁移
date: 2023-01-09T22:55:00
lang: zh
duration: 10min
layout: 'default'
---

> 注意：这是我个人迁移到 Vue 3 的笔记/技巧，会及时更新。请参阅[官方文档](https://vuejs.org/)以获取完整的更新日志。

按照我个人感觉的重要性排序。

## `markRaw` 用于供应商对象

新的反应系统代理传递给 Vue 上下文的对象。对于供应商对象或类实例，您需要将其包装起来 `markRaw` 以禁用反应性注入。

```ts
// 适用于 Vue 2
this.codemirror = CodeMirror.fromTextArea(el)

// 在 Vue 3 中你需要使用 markRaw()
// 否则 CodeMirror 将无法按预期工作
this.codemirror = markRaw(CodeMirror.fromTextArea(el))
```

我认为这是一个非常棘手的问题。您不会在初始化时看到任何警告或错误，但供应商对象的内部状态可能会混乱。您可能会遇到来自库的错误，但找不到原因（上面的示例花了我一小时的调试时间才找出原因）。

##  `.sync` → `v-model:`

`.sync` 修饰符统一为 `v-model:`

```vue
<!-- Vue 2 -->
<Component name.sync="name" />

<!-- Vue 3 -->
<Component v-model:name="name" />
```

`v-model` 在本机元素上将 `value/input` 在自定义组件上更改为 `modelValue` 和 `update:modelValue`

##  `shims-vue.d.ts`

> 更新：现在您可以使用 `@vuedx/typescript-plugin-vueSFC` 进行更好的类型推断（那时不需要 `shims-vue.d.ts` ）

改为：

```ts
declare module '*.vue' {
  import { defineComponent } from 'vue'

  const Component: ReturnType<typeof defineComponent>
  export default Component
}
```
