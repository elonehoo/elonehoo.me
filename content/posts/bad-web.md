---
title: 现代前端是否处在一个糟糕的时代？
date: 2025-01-06T20:30:00.000+08:00
lang: zh
duration: 15min
---

这个问题需要从 2 个方面来思考。从行业的角度来看，最糟糕的时代已经过去了；从开发者的角度来看，现在确实是个糟糕的时代。

从前端这个行业的发展历史来看，前端正在变得越来越成熟。如果和过去相比，之前的前端才是真正的糟糕。如果我们从未来的视角来看，那么现在也算是糟糕，但是其糟糕的程度也不如过去。


十年前，前端正处于蛮荒时代，那时候的前端开发用一个词语来形容就是 [`刀耕火种`](https://zh.wikipedia.org/wiki/%E5%88%80%E8%80%95%E7%81%AB%E7%A8%AE)。那么到底糟糕到什么样的境地呢？

- 前端开发的噩梦：兼容 [IE6](https://zh.wikipedia.org/wiki/Internet_Explorer_6) 。IE6 发布于 2001 年，而 ES5 直到 2009 年才定稿。 IE6 除了可以运行 [JavaScript](https://zh.wikipedia.org/wiki/JavaScript) 之外还可以 [VBScript](https://zh.wikipedia.org/wiki/VBScript)、[JScript](https://zh.wikipedia.org/wiki/JScript)（一个 Javascript 的方言）。

- 当时有一个只能运行于 IE 的技术叫做 [`ActiveX`](https://zh.wikipedia.org/wiki/ActiveX)，所以很多银行和和政府的网站只能用 IE 浏览器打开，甚至只能使用 IE 的特定版本打开。

- 还有一个技术是目前已经被淘汰的 [Flash](https://zh.wikipedia.org/wiki/Adobe_Flash)

![adobe flash](/bad-web/adobe_flash.jpeg)

我们现在所说的前端通常包括了 HTML、CSS、JavaScript，甚至是 Node.js、SVG 等和 Web UI 层相关的开发技术，
那么在没有 ES6，没有 HTML5，没有 CSS3 的时代，前端到底糟糕到什么程度呢？

糟糕到当时甚至没有“前端工程师”、“前端开发者”这个词，那个时候这些岗位被戏称为“切图师”、“切图仔”。在大部分的公司中，HTML 和 CSS 都是由设计师来完成的，页面中的动态效果比如鼠标划过显示菜单、轮播图等则是由后端开发者来完成的。后端 [JSP](https://zh.wikipedia.org/wiki/JSP)、[PHP](https://zh.wikipedia.org/wiki/PHP) 的开发者们兼职写 [JQuery](https://zh.wikipedia.org/wiki/JQuery) 是当时普遍的现象。

让我们再来对比一下同时期的后端，各种工具链和技术都已经非常成熟了，那时的前端也只是作为后端 [MVC](https://zh.wikipedia.org/wiki/MVC) 设计模式中的 View 层，在没有前后端分离的时期， View 层也是由前端和后端一起开发的。现在我们的前端项目中都会涉及到打包，压缩，混淆等，而在之前虽然大型的前端项目还是少数，当涉及到几百个 JS 文件的时候，前端也会使用到打包、压缩、混淆等工具，而这些工具基本都是由 [Java](https://zh.wikipedia.org/wiki/Java) 去提供的。当时流行的有 [Yahoo!](https://www.yahoo.com/) 开发的 [YUI Compressor](https://github.com/yui/yuicompressor)、[Google](https://about.google/) 开发的 [Google Closure Compiler](https://github.com/google/closure-compiler)。

前端经过了这么多年的发展，尤其是 Node.js 发布到成熟的那几年，已经变得非常成熟，而“糟糕”的时代也已然成为历史。

![node.js](/bad-web/node.jpeg)

从另一个角度，我们作为**前端开发者，现在也许是个糟糕的时代**。以前的开发技能经过这么多年的发展已经不在适用。前端逐渐规范的后果就是淘汰了一大批“古典/保守”的前端开发者们，而抓住风口的开发者们已经实现了弯道超车。

常言道“乱世造英雄”，但是常言也道“乱世埋枯骨”。在 Node.js 出现之后，前端可谓是当时最有“钱途”的行业之一。目前这个风口也在逐步关闭，所以对于很多人来说，现在是一个糟糕的时代。

如果我们来观察一下大厂，以阿里为例，基本上前端的那些高官们都是在 2010 年之后借着 Node.js 的快车一路飙升的。Node.js 不仅扩展了前端的边界，还提升了前端的研发效率。

在圈子里一直有人说：“我认为只有糟糕的东西才需要不停的推倒重来。” 我始终不认同这句话，我自大的认为这句话的原因和结果都是错误的。**首先颠覆的不是前端，而是前端的某个技术和工具**；再者也并不是因为糟糕所以被颠覆，而是因为前端具有无穷的生命力所以才会产生这么多颠覆性的创新和改变。我们再来看看后端，以前的 Java 开发者们都使用 [Eclipse](https://zh.wikipedia.org/wiki/Eclipse)，而现在几乎清一色的使用 [IntelliJ IDEA](https://www.jetbrains.com/idea/)，那么我们是否可以得出结论 Java 在不停的推倒重来，所以后端处于一个糟糕的时代。这是显然不能的。

工具的更新换代才能带来前端的繁茂。我们用一个历史上真实的故事来说明这个问题。

在英国的工业革命时期，机器生产逐渐的代替手工劳动，导致大部分人失业、工资下跌。失业了就没有事情干了，于是他们开始思考：

- 我们为什么失业了呢？ 因为工厂不再需要这么多人了。

- 工厂为什么不咋需要这么多人？ 因为机器可以做很多事情。

- 如果没有机器了呢？ 那么工厂就需要我们了。

终于找到了失业的根本原因了，于是 [Leicestershire](https://zh.wikipedia.org/wiki/%E8%8E%B1%E6%96%AF%E7%89%B9%E9%83%A1) 一个名叫 内德‧卢德 的工人第一个捣毁织袜机，进而在全国掀起了一场砸毁机器的浪潮，无数的工人涌入工厂将机器砸毁。这场运动也被称为 [卢德运动](https://zh.wikipedia.org/wiki/%E7%9B%A7%E5%BE%B7%E9%81%8B%E5%8B%95)。而这次运动导致了大部分工厂被迫停工，加剧了工人的失业。最终政府制定律法，并对卢德分子进行镇压。

![Luddite](/bad-web/Luddite.jpg)

在故事中，“机器生产逐渐的代替了手工劳作”是一次生产力的变革，作为类比，前端技术的更替也是生产力的变革，我们也可以对比一下 [React](https://react.dev/)/[Vue](https://vuejs.org/) 开发维护的几万行代码的项目和使用 [jQuery](https://jquery.com/) 开发维护的几万行代码的项目，那个更容易，这是技术上的差距吗，也不尽然，只要规划的合理，JQuery 也一样可以开发大型项目，但由于 React/Vue 的出现让大部分的开发者不愿意继续基于 JQuery 来开发一套适用于大型项目的工具链了。

我之前也是一名 Java 开发者，直到我接触到了前端，我对前端越来越感兴趣，后面转行成为了前端开发者，当我刚学会 JQuery 的时候，我遇到了 React。当我刚学会了 [Webpack](https://webpack.js.org/) 的时候，我遇到了 [Vite](https://vite.dev/)。

我们**不要疲于追求新的工具，给自己一个明确清晰的定位，然后去学习不同领域的知识**。我刚入行前端以来，就一直在追寻前端工程化和前端性能这两个方向。而新的工具/框架出现后，我总是不想成为一个工具/框架的使用者，而应该考虑工具/框架为什么出现，解决了那些痛点，如果没有这些工具/框架，我是否可以解决这些痛点。

言而总之，说的俗气一点，目前的前端处于糟糕的时代，是因为前端开发者的工资无法向之前一样爆炸式增长了。那么目前前端开发者如何获得高薪呢？主要还是看综合实力，如何将自己的前端知识转为生产力，在公司中，是做到了“为研发赋能，为业务赋能”，还是只会某个框架的知识，天天写 bug ，找 bug ，改 bug 。

> 我热爱编程最重要的一点就是，在这里我们可以着手去将糟糕的事情变得更好，而不是去抱怨这个糟糕的时代。