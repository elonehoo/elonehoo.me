---
title: 几个浏览器不想让我们知道的奇怪调试技巧
date: 2024-04-25T11:09:00.000
lang: zh
duration: 6min
description: 一份有用的、不那么明显的技巧列表，帮助我们充分利用浏览器的调试器。假设我们对开发者工具有中级或更高水平的理解。
---

<Title />

> [English Version](https://alan.norbauer.com/articles/browser-debugging-tricks)

## 高级条件断点

> [!TIP]
> 通过在意想不到的地方使用具有副作用的表达式，我们可以从像条件断点这样的基本功能中榨取更多的功能。

### 日志 / 跟踪

例如，我们可以在断点处使用 `console.log` 。日志点是记录到控制台的断点，但不会暂停执行。虽然 **Microsoft Edge** 已经内置了日志点一段时间，Chrome 在 v73 版本中刚刚添加了它们，但 Firefox 没有。不过，我们可以使用条件断点在任何浏览器中模拟它们。

![weird debugging tricks](/browser-debugging-tricks/weird-debugging-tricks.gif)

使用 `console.count` 而不是 `console.log`，如果我们还想要一个运行计数，以了解该行代码执行了多少次。

在2020年5月之后所有主流浏览器都直接支持日志点/跟踪点（[Chrome 日志点](https://developers.google.com/web/updates/2019/01/devtools#logpoints)，[Edge 跟踪点](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/debugger#breakpoints)，[Firefox 日志点](https://developer.mozilla.org/en-US/docs/Tools/Debugger/Set_a_logpoint)）。

#### 监视面板

我们还可以在使用控制台的监视面板。例如，每次我们的应用程序在调试器中暂停时，为了转储 `localStorage` 的一个快照，我们可以创建一个 `console.table(localStorage)` 监视器：

![console table in watch](/browser-debugging-tricks/console-table-in-watch.png)

或者要在 DOM 变更后执行一个表达式，可以设置一个 DOM 变更断点（在 Element Inspector 中）：

![chrome dom mutation](/browser-debugging-tricks/chrome-dom-mutation.png)

然后添加我们的监视表达式，例如记录DOM的快照：`(window.doms = window.doms || []).push(document.documentElement.outerHTML)`。现在，经过任何 DOM 子树的修改，调试器将暂停执行，新的 DOM 快照将位于 `window.doms` 数组的末尾。（没有办法创建一个不暂停执行的DOM突变断点。）

#### 追踪调用

假设我们有一个函数显示加载旋转器，还有一个函数隐藏它，但在我们的代码中，我们调用了显示方法，但没有匹配的隐藏调用。我们如何找到未配对显示调用的源头？在显示方法中使用 `console.trace` 在一个条件断点，运行我们的代码，找到显示方法的最后一个堆栈跟踪，点击调用者跳转到代码：

![console trace find stack](/browser-debugging-tricks/console-trace-find-stack.gif)

### 改变程序的行为

通过使用对程序行为有副作用的表达式，我们可以在浏览器中即时改变程序行为。

例如，我们可以覆盖传递给 `getPerson` 函数的参数id。由于 `id=1` 的计算结果为真，这个条件断点会暂停调试器。为了防止这种情况，可以在表达式后面添加 `, false` 。

![debugging tricks](/browser-debugging-tricks/debugging-tricks.gif)

### 快速而粗略的性能分析

我们不应该将性能分析与诸如条件断点评估时间之类的事情混淆，但如果我们想要快速而粗略地测量某件事情运行所需的时间，我们可以在条件断点中使用控制台计时 API 。在我们的起始点设置一个条件断点，条件为 `console.time('label')` ，在结束点设置一个条件断点，条件为 `console.timeEnd('label')` 。每次我们测量的事情运行时，浏览器都会在控制台记录它运行了多长时间。

![console time performance profile](/browser-debugging-tricks/console-time-performance-profile.gif)

### 使用函数的 Arity

#### 参数数量的断点

仅当当前函数以3个参数被调用时暂停：`arguments.callee.length === 3`

当我们有一个有可选参数的重载函数时，这很有用。

![conditional breakpoint argument length](/browser-debugging-tricks/conditional-breakpoint-argument-length.gif)

#### 函数参数数量不匹配的断点

仅当当前函数被调用时传入了错误的参数数量时暂停：`(arguments.callee.length) != arguments.length`

![conditional breakpoint arity check](/browser-debugging-tricks/conditional-breakpoint-arity-check.gif)

在查找函数调用点的漏洞时很有用。

### 使用时间

#### 跳过页面加载

页面加载后不要暂停，直到5秒后：`performance.now() > 5000`

当我们想设置一个断点，但只对页面初始加载后暂停执行感兴趣时很有用。

#### 跳过 N 秒

不要在接下来的5秒内如果断点被触发就暂停执行，但在5秒后任何时候都暂停：`window.baseline = window.baseline || Date.now(), (Date.now() - window.baseline) > 5000`

我们可以随时从控制台重置计数器：`window.baseline = Date.now()`

### 使用 CSS

根据计算出的CSS值暂停，例如，只有在 document body 具有红色背景色时才暂停执行：`window.getComputedStyle(document.body).backgroundColor === "rgb(255,0,0)"`

### 仅 Even Calls

仅在每次执行行时暂停一次：`window.counter = (window.counter || 0) + 1, window.counter % 2 === 0`

### 样本中断

只在执行该行代码时随机样本中断，例如，每执行该行代码10次只中断1次：`Math.random() < 0.1`

### Never Pause Here <Icon class="i-logos-chrome" />

当我们右键点击边距并选择“Never Pause Here”，Chrome 会创建一个条件断点，该断点为假且永远不会通过。这样设置后，调试器就永远不会在这一行暂停。

![never-pause-here](/browser-debugging-tricks/never-pause-here.png)

![never-pause-here-result](/browser-debugging-tricks/never-pause-here-result.png)

当我们想要免除某行的XHR断点，忽略正在抛出的异常等情况时很有用。

### 自动实例 ID

自动为类的每个实例分配一个唯一 ID ，通过在构造函数中设置这个条件断点：`(window.instances = window.instances || []).push(this)`

然后要检索这个唯一ID：`window.instances.indexOf(instance)`（例如，在类方法中使用`window.instances.indexOf(this)`）

### 程序化切换

使用一个全局 Boolean 来控制一个或多个条件断点：

![conditional-breakpoint-gated](/browser-debugging-tricks/conditional-breakpoint-gated.png)

然后通过编程方式切换 Boolean ，例如。

- 手动地从控制台切换

```js
window.enableBreakpoints = true
```

- 来自其他断点

![conditional-breakpoint-gated-enable-from-breakpoint](/browser-debugging-tricks/conditional-breakpoint-gated-enable-from-breakpoint.png)

- 来自控制台上的计时器

```js
setTimeout(() => (window.enableBreakpoints = true), 5000)
```

## monitor() class 的使用 <Icon class="i-logos-chrome" />

我们可以使用Chrome的监控命令行方法轻松追踪所有对类方法的调用。例如，给定一个类 `Dog` 。

```js
class Dog {
  bark(count) {
    /* ... */
  }
}
```

如果我们想要知道所有对所有 `Dog` 实例的调用，请将此粘贴到命令行中：

```js
var p = Dog.prototype
Object.getOwnPropertyNames(p).forEach((k) => monitor(p[k]))
```

我们将在控制台中得到输出：

```bash
> function bark called with arguments: 2
```

如果我们想在任何方法调用时暂停执行（而不仅仅是记录到控制台），我们可以使用 `debug` 代替`monitor`。

### 一个具体实例

如果我们不知道类别，但有一个实例：

```js
var p = instance.constructor.prototype
Object.getOwnPropertyNames(p).forEach((k) => monitor(p[k]))
```

当我们想要为任何类的任何实例编写一个函数时（而不仅仅是`Dog`）非常有用。

## 调用并调试函数

在控制台调用我们想要调试的函数之前，先调用 `debugger` 。例如：

```js
function fn() {
  /* ... */
}
```

从我们的控制台：

```bash
> debugger; fn(1);
```

然后 “Step into next function call” 以调试函数 `fn` 的实现。

当我们不想找到 `fn` 的定义并手动添加断点，或者如果 `fn` 是动态绑定到一个函数并且我们不知道源代码在哪里时，这很有用。

在 Chrome 中，我们还可以选择在命令行调用 `debug(fn)` ，每次调用 `fn` 时，调试器都会暂停执行。

## 暂停执行在URL更改时

在单页应用程序修改URL（即发生某些路由事件）之前暂停执行：

```js
const dbg = () => {
  debugger;
};
history.pushState = dbg;
history.replaceState = dbg;
window.onhashchange = dbg;
window.onpopstate = dbg;
```

创建一个版本的dbg，它在不中断导航的情况下暂停执行，这是一个留给读者的练习。

另外，请注意，这并不能处理当代码直接调用 `window.location.replace/assign` 时的情况，因为页面在赋值后会立即卸载，因此没有什么可以调试的。如果我们仍然想要查看这些重定向的来源（并在重定向时调试我们的代码状态），在 Chrome 中，我们可以调试相关的方法：

```js
debug(window.location.replace);
debug(window.location.assign);
```

## 调试属性读取

如果我们有一个对象，并且想要知道何时读取了它的属性，可以使用带有 `debugger` 调用对象的 getter 。例如，将 `{configOption: true}` 转换为 `{get configOption() { debugger; return true; }}`（可以在原始源代码中进行，也可以使用条件断点）。

当我们向某个东西传递一些配置选项，并且想要了解它们是如何被使用的时候，这会很有用。

## 使用 copy() <Icon class="i-logos-chrome" /> <Icon class="i-logos-firefox" />

我们可以使用 `copy()` 控制台 API 直接从浏览器复制有趣的信息到我们的剪贴板，而不会出现任何字符串截断。一些我们可能会想要复制的有趣事物：

- 当前DOM的快照：`copy(document.documentElement.outerHTML)`
- 关于资源（例如图片）的元数据：`copy(performance.getEntriesByType("resource"))`
- 一个格式化的大型 JSON 块：`copy(JSON.parse(blob))`
- 我们的 localStorage 转储：`copy(localStorage)`

## Debugging HTML/CSS

JS 控制台在诊断 HTML/CSS 问题时可能会很有帮助。

### 在禁用 JS 的情况下检查 DOM

在 DOM 检查器中，按下 Ctrl+\（Chrome/Windows）可以随时暂停 JS 执行。这样，我们就可以检查 DOM 的快照，而不必担心 JS 改变 DOM 或事件（例如鼠标悬停）导致 DOM 在我们检查时发生变化。

### 检查一个难以捉摸的元素

假设我们想检查一个只在特定条件下出现的DOM元素。检查这个元素需要将鼠标移动到它上面，但当我们尝试这样做时，它就会消失：

![elusive-element](/browser-debugging-tricks/elusive-element.gif)

要检查元素，我们可以将此代码粘贴到我们的控制台中：`setTimeout(function() { debugger; }, 5000);`。这会给我们5秒钟的时间来触发用户界面，一旦5秒计时器结束，JavaScript 的执行将暂停，没有任何东西会让我们的元素消失。我们可以自由地移动鼠标到开发者工具上，而不会丢失该元素。

![elusive-element-inspected](/browser-debugging-tricks/elusive-element-inspected.gif)

当 JavaScript 执行暂停时，我们可以检查元素，编辑其CSS，在JS控制台中执行命令等。

在检查依赖于特定光标位置、焦点等的 DOM 时非常有用。

### 记录 DOM 的快照

获取当前状态的 DOM 副本：

```js
copy(document.documentElement.outerHTML)
```

记录DOM的快照，每秒一次：

```js
doms = [];
setInterval(() => {
  const domStr = document.documentElement.outerHTML;
  doms.push(domStr);
}, 1000);
```

或者直接将其转储到控制台：

```js
setInterval(() => {
  const domStr = document.documentElement.outerHTML;
  console.log("快照DOM: ", domStr);
}, 1000);
```

监控焦点元素

```js
(function () {
  let last = document.activeElement;
  setInterval(() => {
    if (document.activeElement !== last) {
      last = document.activeElement;
      console.log("焦点已改变至: ", last);
    }
  }, 100);
})()
```

![monitor-focus](/browser-debugging-tricks/monitor-focus.gif)

### 查找 Bold Elements

```js
const isBold = (e) => {
  let w = window.getComputedStyle(e).fontWeight;
  return w === "bold" || w === "700";
};
Array.from(document.querySelectorAll("*")).filter(isBold);
```

#### 仅仅是 Descendants

或者只是当前在检查器中选择的元素的 descendants ：

```js
Array.from($0.querySelectorAll("*")).filter(isBold);
```

### 当前选定元素

在控制台中，`$0` 是当前在元素检查器中选定元素的自动引用。

#### Previous 元素 <Icon class="i-logos-chrome" /> <Icon class="i-logos-internetexplorer" />

在 Chrome 和 Edge 浏览器中，我们可以通过 `$1` 访问我们最后检查的元素，通过 `$2` 访问之前检查的元素，以此类推。

#### 获取事件监听器 <Icon class="i-logos-chrome" />

在 Chrome 浏览器中，我们可以检查当前选中元素的事件监听器：`getEventListeners($0)`，例如：

![getEventListeners](/browser-debugging-tricks/getEventListeners.png)

### 监控元素的事件 <Icon class="i-logos-chrome" />

为选定元素调试所有事件：`monitorEvents($0)`

为选定元素调试特定事件：`monitorEvents($0, ["control", "key"])`

![monitorEvents](/browser-debugging-tricks/monitorEvents.gif)
