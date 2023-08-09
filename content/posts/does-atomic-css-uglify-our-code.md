---
navigation.title: 原子化 CSS 会丑化我们的代码吗?
navigation.date: 2023-07-23T21:12:00.000+08:00
navigation.lang: zh
navigation.duration: 15min
navigation.tocAlwaysOn: true
layout: 'default'
---

> 在一些公司的项目中，我开始推行了「原子化CSS」，但是受到了不小的阻力，所以有了这一篇文章。

作为一个 “年轻人” ， 我收到了很多 “老人” 的劝阻，大体可以分为

- 这和直接写 「内连样式 / Style 」 有什么区别？
- 你这样知道你写的 CSS 是什么吗？过几个月你自己都忘记了。
- 我们不喜欢，我们还是喜欢写 Class 。

其实并没有强制要求一定要写 「原子化 CSS 」。

---

## 什么是 原子化 CSS ？

首先，让我们先自作主张的先给 「原子化 CSS 」 下一个定义。

> 原子化 CSS 是一种 CSS 的架构方式，它倾向于小巧且用途单一的 Class，并且会以视觉效果进行命名。

很多人可能会称其为「函数式 CSS」，或者 「CSS 实用工具」。本质上，你可以将「原子化的 CSS 框架」理解为这类 CSS 的统称：

```css
.m-2 {
  margin: 0.5rem;
}
.text-center {
  text-align: center;
}
/* ... */
```

现在的市面上已经有了很多的 「原子化 CSS 框架」，比如 [Tailwind CSS](https://tailwindcss.com/) ，[UnoCss](https://unocss.dev/)。

## 简单的剖析一下 「原子化 CSS 」

制作原子化 CSS 的传统方案其实就是提供所有你可能需要用到的 CSS 工具。例如，我们可能会用预处理器（这里选用的是 SCSS）生成如下代码：

```scss
// style.scss

@for $i from 1 through 10 {
  .m-#{$i} {
    margin: $i / 4 rem;
  }
}
```

编译的结果为：

```css
.m-1 { margin: 0.25 rem; }
.m-2 { margin: 0.5 rem; }
/* ... */
.m-10 { margin: 2.5 rem; }
```

现在我们可以直接使用 `class="m-1"` 来设置边距。

## 「原子化 CSS 」的第一要素

### 实用优先的基本原理

**在一般的情况下，每当我们需要在网页上设计某些内容时，我们都会编写 CSS。**

例如

```html
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 3rem;
    width: 3rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

**如果我们使用 「原子化 CSS 」，我们可以将上面的代码简化为：**

例如

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
```

我知道很多人会告诉我：“这是一场笑话，这真是一团糟！”

事实上，当我们第一次使用它的时候我们肯定不会认为这是一个好东西，但是我认为我们需要继续坚持下去。

但是长时间的使用之后，我们会发现这样的好处：

- **我们不会浪费时间和精力发明类名** - 不再需要添加愚蠢的类名，比如 `sidebar-inner-wrapper` 只是为了能够设计某些东西的样式，也不再为实际上只是一个 Flex 容器的东西的完美抽象名称而烦恼。

- **让 CSS 停止增长** - 使用传统方法，每次添加新功能时，我们的 CSS 文件都会变得更大。有了实用程序，一切都可以重用，因此我们很少需要编写新的 CSS。

- **大胆改变** - CSS 是全局性的，当你做出改变时你永远不知道你会破坏什么。HTML 中的类是本地的，因此您可以更改它们，而不必担心其他内容会被破坏。

- **更好的可读性** - 你不再需要在 HTML 中搜索类名来查找 CSS，因为它们就在那里。

### 那么为什么我们不直接使用 「 内联样式 / Style 」?

从某些方面来说确实是这样的，因为我们直接将样式应用于元素，而不是为它们分配一个类名，然后为该类设置样式。

但是 「原子化 CSS 」 跟 「 内联样式 / Style 」 有很大的区别，「原子化 CSS 」 有以下优势：

- **有约束性的设计** - 使用内联样式，每个值都是一个神奇的数字。使用实用程序，我们可以从预定义的设计系统中选择样式，这使得构建视觉上一致的 UI 变得更加容易。

- **悬停、焦点等状态** - 内联样式无法针对悬停或焦点等状态，但 「原子化 CSS」 的状态变体可以轻松地使用实用程序类来设置这些状态的样式。

### 增大了可维护性

在大量的使用了 「原子化 CSS 」之后，我发现我会不由自主的编写更多的组件，和从一个之前完全无法思考的地方开始抽取组件，并且使得我编写的组件更加的可维护。

我得出以下结论：

- **最小的组件** - 不由自主的将组件拆分为最小的组件，这样可以让我们更加方便的维护和使用。
- **最小的修改** - 当我们需要修改某个组件的时候，我们只需要修改组件的某个部分，而不是整个组件。
- **看似没有规则，实际都是规则** - 乍一看，如果你不了解 「原子化 CSS 」，你会认为这是一团糟，但是实际上，它是有规则的，只是这个规则是在视觉上的，而不是在语义上的。

## 结语

当然我们没有办法通过这一篇简单的文章说服你去使用 「原子化 CSS 」，但是我希望你能够尝试一下，因为我相信你会喜欢上它的。

当然，如果你完全无法接受这些东西，那就不要去使用他们，因为这是一个人的选择。我们没有权利去干预你的选择。

当然希望这能够清楚地表达我的想法，也许希望能给你一些启发。干杯!
