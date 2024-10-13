---
title: Vue.js 3.4 中改进的 Computed
date: 2024-01-04T21:56:00
lang: zh
duration: 10min
layout: 'default'
---

在 Vue.js 中，您可以使用 Computed 属性根据反应值获取反应值（没有任何副作用）。

---

> [Johnson Chu](https://github.com/johnsoncodehk) 的帖子一目了然地显示了所做的改进

<!-- <Tweet id="1695383715906744449" /> -->

`hour` 这是一个计算属性，更新时按 `sec → min → hour` 的顺序更新

正如我们在视频中看到的，`Vue 3.4` 中的 `Computed` 仅当 `sec` 的值发生更改时 `min` 才会重新计算 `hour` 。

## 什么是 Computed ？



最简单的例子如下：

```vue
<script setup lang="ts">
const counter = ref<number>(0)
const doubled = computed(() => counter.value * 2)

const inc = () => counter.value++
</script>

<template>
  <button @click="inc">count is: {{ counter }}</button>
  <p>doubled: {{ doubled }}</p>
</template>
```
当 `counter` 的值更改时（例如，通过单击按钮调用 `inc()` 时） ，`doubled` 的值会自动更新。

当 `doubled` 的值在模板内或其他地方被引用时，并不会每次都执行一个将 `counter` 的函数，而是只有当 `counter` 的值被更改时才会执行在 Computed 中定义的函数。

因此，开发者可以毫不费力地编写高性能的代码。

### 稍微详细一点的例子

```vue
<script setup lang="ts">
type User = {
  id: number
  name: string
  age: number
  companyId: string
  companyName: string
}

const props = defineProps<{
  userId: number
  users: User[]
}>()

const userId = computed(() => props.userId) // toRef 办得到
const users = computed(() => props.users) // toRef 办得到

const userCompanyId = computed<string | null>(() => {
  const user = users.value.find((user) => user.id === userId.value)
  return user?.companyId ?? null
})
const coworkers = computed<User[]>(() => {
  if (userCompanyId.value == null) return []
  return users.value.filter((user) => user.companyId === userCompanyId.value)
})
</script>
```

在这里，我们希望假设 `props.users` 不经常变化。（例如，一旦 `fetch` 过数据，之后就不再更新）

`Computed` 属性 `userCompanyId` 只有在 `userId` 的值发生变化时才会被计算。而用于表示同事的 `Computed` 属性 `coworkers` 也是在 `userCompanyId` 的值发生变化时才会被计算，因此也会对 `userId` 的值变化做出响应。

在 `Vue 3.3` 之前，每当 `userId` `的值发生变化时，userCompanyId` 和 `coworkers` 两个函数都会被执行。然而，即使 `userId` 的值发生变化，如果 `userCompanyId` 的值仍然相同，那么 `coworkers` 函数就没有必要被执行。比如，当选择了同一家公司的另一个用户时。

## Vue 3.4 的改进点

在 Vue 3.4 中，针对这种情况，当 `userCompanyId` 的值没有发生变化时，添加了一个优化，不再触发 `coworkers` 函数的计算。
（即使在 `watchEffect` 中监视 `coworkers，如果` `userCompanyId` 没有变化，它也不会被调用）

因此，如果计算 `coworkers` 的成本很高，这种优化可以提高性能。这种性能提升可以在不对应用程序进行任何更改的情况下获得。这过于划算了。

### 这种效果不可预期的情况

这种效果的期待是因为依赖的 `userCompanyId.value` 的类型是 `string | null`。
由于内部使用 `Object.is` 进行比较，即使返回了类似的结果，也需要注意到可能会被解释为不同的情况。

例如，空对象 `{}` 和空数组 `[]` 在使用 `Object.is` 进行比较时被认为是不同的。
它类似于使用 === 进行比较，但并不相同。

```js
const obj = { foo: 123 }
const arr = [1, 2, 3]

;[
  ['1', 1],
  [NaN, NaN],
  [undefined, undefined],
  [undefined, null],
  [null, null],
  [-0, 0],
  [true, true],
  [{}, {}],
  [[], []],
  [obj, obj],
  [arr, arr],
].map(([a, b]) => console.log(JSON.stringify(a), Object.is(a, b), a === b))
```

执行后会得到以下结果。（判断左右值的同一性。第一个 true/false 是使用 Object.is 进行比较的结果，第二个是使用 === 进行比较的结果。）

```shell
> '"1"' false false
> "null" true false  // NaN
> undefined true true
> undefined false false // undefined と null
> "null" true true  // null
> "0" false true
> "true" true true
> "{}" false false
> "[]" false false
> '{"foo":123}' true true
> "[1,2,3]" true true
```

因此，在以下情况下需要注意。

```vue
<script setup lang="ts">
type User = {
  id: number
  name: string
  age: number
  companyId: string
  companyName: string
}
type Company = {
  id: string
  name: string
}

const props = defineProps<{
  userId: number
  users: User[]
}>()

const userId = computed(() => props.userId) // toRef 办得到
const users = computed(() => props.users) // toRef 办得到

const userCompany = computed<Company | null>(() => {
  const user = users.value.find((user) => user.id === userId.value)
  if (user === undefined) return null
  // 如果返回的是对象文字，相同的内容会被视为不同的值。
  return {
    id: user.companyId,
    name: user.companyName,
  }
})
const coworkers = computed<User[]>(() => {
  if (userCompany.value == null) return []
  return users.value.filter((user) => user.companyId === userCompany.value.id)
})
</script>
```

这个例子的不同之处在于，`Computed` 属性 `userCompany` 返回的是 `Company | null` 类型，使用对象类型。由于该函数返回的对象总是被视为不同的，即使 `userCompany` 的值相同，`coworkers` 函数也会被执行。

为了解决这个问题，需要了解 `Vue 3.4` 中引入的另一个变化。

### 在Vue 3.4中，Computed 属性可以使用最终的结果

从 Vue 3.4 开始，Computed 的 getter 函数会接收最终结果作为第一个参数。

因此，我们可以这样写：

```vue
<script setup lang="ts">
type User = {
  id: number
  name: string
  age: number
  companyId: string
  companyName: string
}
type Company = {
  id: string
  name: string
}

const props = defineProps<{
  userId: number
  users: User[]
}>()

const userId = computed(() => props.userId) // toRef 办得到
const users = computed(() => props.users) // toRef 办得到

const userCompany = computed<Company | null>((lastResult) => {
  const user = users.value.find((user) => user.id === userId.value)
  if (user === undefined) return null
  if (lastResult != null && user.companyId === lastResult.id) {
    return lastResult // ← 在此返回最后一个结果。
  }
  return {
    id: user.companyId,
    name: user.companyName,
  }
})
const coworkers = computed<User[]>(() => {
  if (userCompany.value == null) return []
  return users.value.filter((user) => user.companyId === userCompany.value.id)
})
</script>
```

如果 `userCompany` 返回了 `lastResult` （因为是相同的对象），`coworkers` 函数就不会被执行。

### 有些情况下可以使用传统的写法

值得注意的是，在这种情况下，我们也可以按照传统的方式进行编写。（今后，使用多层 `Computed` 的方式应该会比以往更加可取）

```vue
<script setup lang="ts">
type User = {
  id: number
  name: string
  age: number
  companyId: string
  companyName: string
}
type Company = {
  id: string
  name: string
}

const props = defineProps<{
  userId: number
  users: User[]
}>()

const userId = computed(() => props.userId) // toRef 办得到
const users = computed(() => props.users) // toRef 办得到

const selectedUser = computed<User | undefined>(() => users.value.find((user) => user.id === userId.value))
const userCompany = computed<Company | null>(() => {
  if (selectedUser.value === undefined) return null
  return {
    id: selectedUser.value.companyId,
    name: selectedUser.value.companyName,
  }
})
const userCompanyId = computed<string | null>(() => userCompany.value?.id ?? null)
const coworkers = computed<User[]>(() => {
  if (userCompanyId.value == null) return []
  return users.value.filter((user) => user.companyId === userCompanyId.value)
})
</script>
```

`userCompanyId` 会每次都被调用，但 `userCompany` 只有在 `userCompanyId` 的值发生变化时才会被调用。

（这种情况考虑了 `coworkers` 的计算量较大）

### 为了获得最大的好处，需要注意的事项

无论如何，当 `Computed` 属性返回值时使用对象 / 数组字面量（而不是对象 / 数组的引用）时，都需要注意。

另外，`coworkers` 返回的值始终是一个新数组。
（如果使用 `Array.prototype.filter` 或 `Array.prototype.map` 等方法，也需要注意）
因此，如果使用它来定义另一个 `Computed` 属性，最好包含使 `coworkers` 返回 `lastResult` 的处理。

```vue
<script setup lang="ts">
const coworkers = computed<User[]>((lastResult) => {
  if (lastResult !== undefined) {
    if (lastResult.length === 0 && userCompany.value == null) {
      return lastResult
    } else if (lastResult[0]?.companyId === userCompany.value.id) {
      return lastResult
    }
  }
  if (userCompany.value == null) return []
  return users.value.filter((user) => user.companyId === userCompany.value.id)
})
</script>
```
