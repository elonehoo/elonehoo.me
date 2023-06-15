---
navigation.title: Vue Composition Api
navigation.date: 2023-02-07T13:12:00.000+08:00
navigation.lang: zh
navigation.duration: 25min
layout: 'default'
---

[[toc]]

> 本文会比往期文章相对长些。如果你能花些时间读完，不胜感激。若你在电脑端阅读，可在右侧查看目录。最后，希望能对你有所帮助 :)

## 什么是 `Hook` 

在 [2018年的 React Conf](https://zh-hans.reactjs.org/blog/2018/11/13/react-conf-recap.html) 上我们第一次看见了 Hook 的出现。

> Sophie Alpert and Dan Abramov kicked off Day 1 with their keynote, React Today and Tomorrow. In the talk, they introduced [Hooks](https://reactjs.org/docs/hooks-intro.html), which are a new proposal that adds the ability to access features such as state without writing a JavaScript class. Hooks promise to dramatically simplify the code required for React components and are currently available in a React alpha release.

译文：

> Sophie Alpert 和 Dan Abramov 用以 “React 的当下和未来” 为主题的演讲，拉开了第一天序幕。在本次演讲中，他们介绍了 Hook，这个新的提案可以使得开发者在不编写 class 组件的情况下，也能访问诸如状态（state）等功能。[Hook](https://zh-hans.reactjs.org/docs/hooks-intro.html) 这一提案保证会大大简化构建 React 组件所需要的代码，目前可以在 React alpha 版本中使用。

## 从关注分离开始

在 React 中，一种实现关注点分离的方法是使用 Container/Presentational 模式。使用这种模式，可以将视图与应用程序逻辑分离开来。这种模式中，编写功能需要两个组件，仅处理组件逻辑的 Container，以及仅用于展示的 Presentational。

Presentational 组件一般是没有状态，或者只有 UI 相关的状态。而 Container 组件的主要功能是数据处理，以及将数据通过 Presentational 展示出来。Container 组件通常只会呈现其数据相关的 Presentational 组件。因为它们自己不渲染任何东西，所以它们通常也不包含任何样式。

下面看一个例子，假设当前有一个场景，需要将获取 6 张图片的地址，并展示出来，使用关注点分离模式，即需要拆分为两个组件：获取数据组件、展示图片组件，如下：

```ts
// DogImages.ts
import React from "react";

export default function DogImages({ dogs }) {
  // 展示所有图片
  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}
```

```ts
// DogImagesContainer.ts
import React from "react";
import DogImages from "./DogImages";

export default class DogImagesContainer extends React.Component {
  constructor() {
    super();
    // 定义状态，dogs 数组，作为 DogImages 组件渲染参数
    this.state = {
      dogs: []
    };
  }

  componentDidMount() {
    // 挂载后发出请求，获取需要展示的数据
    fetch('https://dog.ceo/api/breed/labrador/images/random/6')
      .then(res => res.json())
      .then(({ message }) => this.setState({ dogs: message }));
  }

  render() {
    return <DogImages dogs={this.state.dogs} />;
  }
}
```

根据代码不难发现，Container 本质上仅含有逻辑，且只展示 Presentational 组件，所以诞生了 hook，将逻辑抽象成一个个的 hook，支持按逻辑组织代码，颗粒度更小，可复用性更强，同时也移除了冗余组件，避免组件嵌套过深的问题。

根据 `Hook` 提取出的逻辑如下：

```ts
// useDogImages.ts
export default function useDogImages() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then(res => res.json())
      .then(({ message }) => setDogs(message));
  }, []);

  return dogs;
}
```

故原有的组件可以简化为：

```ts
import React from "react";
import useDogImages from "./useDogImages";

export default function DogImages() {
  const dogs = useDogImages();

  return renderImages(dogs);
}

function renderImages(dogs) {
  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />)
}
```

组件层级少了一层，并且逻辑也单独拆分出来了，表示组件也可以单独拆分出来。将对应的功能粒度细化，可以更加灵活的参与复用，如渲染猫图片列表、统计狗图片的数量等等，都可以单独复用对应的 hook 或 Presentational。

根据上述演进过程，其实也不难理解，function 与 hook 的区别

- function: 封装一段逻辑
- hook: 封装一段 **带状态** 的逻辑

## 使用 Vue 的思维组织一个页面

### 从一个极简的交互稿开始

![极简的交互稿](/composition-api/easy-interaction.png)

需求较为简单，就是一个搜索结果页面，带有搜索框和多个类别的搜索结果，先按上述的 Container/Presentational 模式拆分一下组件，可得如下组件：

![组件的拆分稿](/composition-api/component-split.png)

拆分后，对应的组件如下：

<ul>
  <li>
    <span class="text-#CA9849">SearchPage</span>
    <ul>
      <li>
        <span class="text-#9D68D3">SearchBar</span>
      </li>
      <li>
        <span class="text-#529E72">SearchList</span>
        <ul>
          <li>
            <span class="text-#5E87C9">SearchResultTitle</span>
          </li>
          <li>
            <span class="text-#DF5452">SearchResultContent</span>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

### 实现代码

```vue
// SearchPage.vue
<script lang="ts" setup>
import type { SearchResult } from './types'

import SearchBar from './components/SearchBar.vue'
import SearchList from './components/SearchList.vue'

const { t } = useI18n()

let resultList = $ref<SearchResult[]>([])
function onSearch() {
  resultList = loadDogImages()
}
function loadDogImages() {
  // mock search result
  return [
    {
      id: 1,
      title: t('demo.category', { id: 1 }),
      children: [
        {
          id: 11,
          title: t('demo.searchResult', { id: 1, num: 1 }),
          clickNum: 1,
        },
        {
          id: 12,
          title: t('demo.searchResult', { id: 1, num: 2 }),
          clickNum: 2,
        },
      ],
    },
    {
      id: 2,
      title: t('demo.category', { id: 2 }),
      children: [
        {
          id: 21,
          title: t('demo.searchResult', { id: 2, num: 1 }),
          clickNum: 3,
        },
        {
          id: 22,
          title: t('demo.searchResult', { id: 2, num: 2 }),
          clickNum: 666,
        },
      ],
    },
  ]
}
</script>

<template>
  <SearchBar mb="4" @search="onSearch" />
  <SearchList :list="resultList" />
</template>

<i18n lang="yml">
zh-CN:
  demo:
    category: 分类{id}
    searchResult: 分类{categoryID}中的匹配结果{num}
</i18n>
```

```vue
// SearchBar.vue
<script lang="ts" setup>
const emits = defineEmits<{
  (e: 'search', keyword: string): void
}>()
const keyword = $ref('')
function search() {
  emits('search', keyword)
}

const { t } = useI18n()
</script>

<template>
  <div>
    <input
      v-model="keyword" type="text" autocomplete="false" p="x4 y2" w="250px" text="center" mr="4" bg="transparent"
      border="~ rounded gray-200 dark:gray-700" outline="none active:none" @keydown.enter="search"
    >
    <button @click="search">
      {{ t('search') }}
    </button>
  </div>
</template>

<i18n lang="yml">
zh-CN:
  search: 搜索
</i18n>
```

```vue
// SearchList.vue
<script lang="ts" setup>
import type { SearchResult } from '../types'
import SearchResultTitle from './SearchResultTitle.vue'
import SearchResultContent from './SearchResultContent.vue'

const { list = [] } = defineProps<{
  list: SearchResult[]
}>()
</script>

<template>
  <div v-for="result in list" :key="result.id" :result="result" class="border" border-color="zinc-400" px="4" py="2" mb="4">
    <SearchResultTitle :title="result.title" />
    <div v-for="item in result.children" :key="item.id">
      <SearchResultContent :item="item" />
    </div>
  </div>
</template>
```

```vue
// SearchResultTitle.vue
<script lang="ts" setup>
const { title } = defineProps<{
  title: string
}>()
</script>

<template>
  <div text="6" mb="2">
    {{ title }}
  </div>
</template>
```

```vue
// SearchResultContent.vue
<script lang="ts" setup>
import { $ } from 'vue/macros'
import type { SearchResultItem } from '../types'

const { item } = defineProps<{
  item: SearchResultItem
}>()

const { title, clickNum } = $(item)

const { t } = useI18n()
</script>

<template>
  <div class="flex justify-between border" border-color="zinc-400" px="4" py="2" mb="4">
    <div class="flex-1">
      {{ title }}
    </div>
    <div class="flex-1" text="right">
      {{ t('clickNum', { num: clickNum }) }}
    </div>
  </div>
</template>

<i18n lang="yml">
zh-CN:
  clickNum: 点击数{num}
</i18n>
```

最终展示效果如下：

![最终实现](/composition-api/finally-realized.png)

## Composition 封装示例

### 从一个常见的需求说起

常见的组件库如 naive-ui 等，都提供了遮罩组件 [Spin](https://www.naiveui.com/zh-CN/dark/components/spin) ，但是在使用时总是会觉得较为麻烦，尤其是按上述拆分方式拆分组件后，可能会在一个页面拆出十多个组件，那么遮罩就会五花八门，多个地方出现，用户体验较差，如果共享一个遮罩，将面临如下问题：

- 跨多层组件传递请求状态，并且是子传父，逻辑复杂，且父组件或者 [pinia](https://pinia.vuejs.org/zh/index.html) 需要冗余数据，影响理解和可维护性
- 出现条件遮罩时难以处理，如：请求分为定时请求与用户手动触发请求，定时请求不显示遮罩，手动请求显示遮罩，直接传递一个变量难以控制，需要再冗余一个计算属性

所以我们需要一个 **composition** ，当我们 useSpin 时，注册控制 Spin 组件展示的变量与展示条件，将其他逻辑封装起来，而不需要每次都去传递变量、处理条件遮罩、处理遮罩冲突

### 示例代码

```vue
// SpinProvider.vue
<script lang="ts" setup>
import { createSpinContext } from './useSpinContext'

const { spinning } = createSpinContext()
const cls = computed(() => spinning.value ? ['cursor-wait', 'pointer-events-none'] : [])

const { t } = useI18n()
</script>

<template>
  <!-- 这里是手写的遮罩，可以替换成其他组件库提供的遮罩组件 -->
  <div h="full" w="full" relative :class="cls" min-h="lg">
    <div
      v-show="spinning" z-10 bg="white" absolute top="0" left="0" right="0" bottom="0" w="full" h="full" flex
      flex-col items="center" justify="center" min-h="100px"
    >
      <div transition="300" rd="50%" border-3 w="8" h="8" border-color="transparent" class="loading-icon" />
      <div>{{ t('loading') }}</div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.loading-icon {
  animation: circle infinite 0.8s linear;
  border-top-color: #3f3f46;
}

@keyframes circle {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

<i18n lang="yml">
zh-CN:
  loading: 加载中
</i18n>
```

```ts
// useSpinContext.ts
import type { MaybeRef } from '@vueuse/shared'
import type { InjectionKey, Ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

type State = MaybeRef<boolean>
interface StateOption {
  state: State
  dependOn: State[]
}
type SpinState = State | StateOption

export interface SpinContext {
  /** 添加受控状态 */
  addSpinState(state: SpinState): void
  /** 清空所有受控状态 */
  clearSpinState(): void
  /** 是否暂时隐藏遮罩，隐藏后需要重新启用或者注册新遮罩才会显示遮罩 */
  isHideSpin: Ref<boolean>
}

const spinKey: InjectionKey<SpinContext> = Symbol('spin-key')

export function createSpinContext(key: InjectionKey<SpinContext> = spinKey) {
  /** 是否在请求未完成时隐藏遮罩 */
  const isHideSpin = ref(false)
  /** 受控变量集合 */
  let spinOptionList = $ref<StateOption[]>([])

  /** computed 总的遮罩状态 */
  const spinning = computed(() => !isHideSpin.value
    && spinOptionList.some(
      ({ state, dependOn }) => dependOn.every(isNeedSpin => unref(isNeedSpin)) && unref(state)),
  )

  /** 注入的 context 内容 */
  const context: SpinContext = {
    addSpinState(state: SpinState) {
      // 转换 state 类型
      const option = $ref(isStateOption(state) ? state : { state, dependOn: [] })

      // 添加受控
      spinOptionList.push(option)

      // register 后自动重启遮罩
      isHideSpin.value = false
    },
    clearSpinState() {
      spinOptionList = []
    },
    isHideSpin,
  }

  provide(key, context)

  return { spinning }
}

export function useSpinContext(key: InjectionKey<SpinContext> = spinKey) {
  const context = inject(key)
  if (!context) {
    window.console.warn('[SpinProvider]: `useSpinContext` can not get Context! Please check `useSpinContext` run in `<SpinProvider>`')
    return { register: () => {} }
  }

  const { addSpinState, clearSpinState, ...rest } = context

  // 当页面切换自动移除受控变量
  onBeforeRouteLeave(() => clearSpinState)

  return {
    register: addSpinState,
    focusClearSpin: clearSpinState,
    ...rest,
  }
}

function isStateOption(val: SpinState): val is StateOption {
  return !isRef(val) && typeof val !== 'boolean'
}
```

## 总结

从 react 的 Hook 到 vue 的 composition api，都在传递一个相同的开发思路，即**更小的模块**。

通过约束模块、组件的大小，当修改的时候，只需要考虑出入参，就可以有效减少改动引发，不需要全览代码，查看修改影响、是否漏改等，同时可读性也更强，各种模块单一职责：**渲染的就仅负责渲染，处理逻辑的都交给 `function` / `composition` ，需要复用功能时复用功能，需要复用逻辑时复用逻辑。**

## 补充说明

`composition` 并不是银弹，并不是万物皆 composition ，原有的纯函数、class 等封装方式也一样适用，  **`composition` 更多是为了补充 纯函数/class 复用时的不足（无法复用副作用，如组件销毁时自动销毁资源等）**

以下为梳理的各种功能的适用场景：

- `function` ：适用于封装特定的逻辑，是最小的组织单位，封装的是一个独立的功能，这个功能跟其他的逻辑没有强联系，比如判断数据类型函数、格式化数据函数
- `class` ：适用于封装一批有关联的函数，将功能聚合到一起，如： `CacheOperator` ，封装具体的缓存逻辑，包括缓存到何处、缓存格式是什么、缓存上限控制、缓存淘汰、缓存过期、缓存加密等等各种相关的操作逻辑
- `composition` ：针对的是副作用的封装，也可以当做一个无 template 的组件去封装，处理的是副作用复用问题，如： `useEventListenner` 进行事件注册的同时，在特定条件下自动销毁资源； `useCache` 调用 `CacheOperator` ，并将对应的操作实例共享给其他组件，复用缓存

## 参考文献

- [Container/Presentational Pattern](https://www.patterns.dev/posts/presentational-container-pattern/)
- [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Design](https://reactfordesigners.com/)
- [Vue Composition API](https://vuejs.org/guide/introduction.html#api-styles)
