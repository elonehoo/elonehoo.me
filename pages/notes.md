---
title: Notes - Elone Hoo
display: Notes
subtitle: Quick notes / tips
description: Quick notes / tips
---

<article>

## `range` in JavaScript

_2021/09/13_

基于 [GitHub Copilot](https://copilot.github.com/)。

直到今天，我才知道你可以为 `Array.from` 提供一个映射函数作为第二个参数。

```js
Array.from({ length: 10 }, (_, i) => i)
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

</article>

<article>

## Clean npm cache

_2023/01/22_

今天我的磁盘满了:(
超级不开心

```bash
npm cache clean --force
yarn cache clean
pnpm store prune
```

</article>
