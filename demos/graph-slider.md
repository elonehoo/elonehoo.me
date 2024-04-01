---
title: Graph Slider
date: 2023-08-23T19:00:00.000+00:00
lang: zh
duration: 5min
meta: 'View Prototype'
---

<Title />

<ClientOnly>
  <GraphSlider />
</ClientOnly>

<br />

该图形是一个 `SVG` 元素。圆角指示器本身具有使用与渲染图形描边相同的路径定义来定义的 [offset-path](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path)。基本上，这个属性可以使元素沿着给定的路径移动。为了简洁起见，一些细节被省略了，但这是一个总体的概念。

```vue
<template>
  <div>
    <div
      data-dot-indicator
      absolute
      :style="`offset-distance: ${offsetDistance}%`"
    />
    <svg>
      <path
        :d="pathDefinition"
        stroke="#C7C7C7"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  </div>
</template>
```

现在要移动指示器，在鼠标移动时，鼠标的距离被映射到 `offset-distance` 作为一个百分比：

```vue
<template>
  <div
    data-dot-indicator
    absolute
    :style="{
      'offset-distance': `${offsetDistance}%`,
      'offset-path': `path("${offsetPath}")`
    }"
  />
</template>
```

我们也可以对垂直指示器使用 `offset-path` ，但我认为标签的移动会使读取数值变得复杂。

因此，我们希望确保标签的位置保持固定，并使用 `transform` 平移线条。然而，我们不能简单地将鼠标移动一对一地映射，因为点沿着非线性路径移动。这样做会导致不同步，就像这样。

相反，我们可以计算起始位置与当前位置之间的距离，并将其相对于指示器点居中：

```vue
<script>
import { ref } from 'vue'
const x = ref<number>(dotX - parentX + dotWidth / 2 - lineWidth / 2)
</script>

<template>
  <div
    data-vertical-indicator
    absolute
    :style="{
      transform: `translateX(${x}px)`,
    }"
  />
</template>
```

最后，在 SVG 中有两个重叠的路径：一个是灰度的，一个是彩色的。为了部分突出显示图形，使用 `clip-path` 根据上面的相同变量来显示彩色元素：

```vue
<script>
import { ref } from 'vue'
const clipPath = ref<string>(`inset(0 ${parentWidth - x - lineWidth * 2}px 0 0)`)
</script>

<template>
  <svg>
    <path :d="gradientDefinition" fill="url(#grayscale)" />
    <path :d="gradientDefinition" fill="url(#color)" :style="clipPath" />
    <g strokeWidth="2.2" strokeLinecap="round">
      <path
        :d="strokeDefinition"
        stroke="var(--colors-gray8)"
        :style="clipPath"
      />
      <path
        :d="strokeDefinition"
        stroke="var(--colors-blue9)"
      />
    </g>
  </svg>
</template>
```


**Acknowledgements**

Thanks to [rauno](https://twitter.com/raunofreiberg), the original is [here](https://rauno.me/craft/graph-slider).
