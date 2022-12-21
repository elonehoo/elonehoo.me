---
title: 属于我的 Mac 配置
date: 2022-02-09T14:12:00
lang: zh
duration: 10min
---

在2022年2月9号，年刚刚过完，就收到了Mac Mini，因为一开始使用的是 Intel 要迁移到 Apple Silicon 。有些 app 即使存在 Apple Silicon 版本，通过迁移工具安装的也会是 Intel 架构、需要 Rosetta 2 兼容。所以我选择了从头全新设置。

刚好也把这作为一个重新审视自己数字生活的契机。

---

## 系统初始化

一开始启动，选择了 英文 作为首选语言，因为英语特别差，所以需要加强英语的学习，有一个沉浸式的语言体验环境。

首先，我进行了触摸板的设置， 进入 System Preferences -> Trackpad 开启 Tap to Click：


紧接着进入 Accessibility -> Pointer Control -> Trackpad Options 里开启 Three finger drag：


然后进入输入法设置里，默认英语输入法设置为 ABC - Extended（与 US 相同的键盘布局，但并不显示美国国旗），增加简体中文的拼音输入。


## 软件方面

- [Shadowrocket](https://s.yunme.me/) 由于 GitHub 有时候会进不去，所以会需要翻墙软件，我会使用这个软件进行翻墙。
- [Duet](https://www.duetdisplay.com/) 因为是 Mac Mini 所以外出的话，携带显示器是一件比较不方便的事情，所以使用它在外出的时候可以使用 ipad 作为显示器，增加了一定的便携性。
- [KeKa](https://github.com/aonez/Keka) 个人觉得是 Mac OS 上最好用的压缩软件。支持市面上全部的压缩格式。
- [Discord](https://discord.com/) 很多社区都是在这里进行交流的。例如 「Vue/Vite/Vitest」。
- [Camo](https://reincubate.com/camo/) Mac Mini 没有摄像头，所以搭配 iphone 作为摄像头使用。
- [Kap](https://getkap.co/) 用于录屏导出成 GIF。
- [Chrome](https://www.google.com/intl/en_us/chrome/) 在开发的时候，虽然可能 Safari 也可以用，但是还是使用 Chrome 比较好。
- [Typora](https://typora.io/) 无论在哪里，Typora 都长在了我的审美之上。
- [Table Plus](https://www.tableplus.io/download) 长得比较好看的 MySQL 客户端。

## 命令行方面

- [JDK](https://www.oracle.com/java/technologies/downloads/) 这是java环境的必需品，所以无需多说。
- [nodejs](https://nodejs.org/en/) 前端必备工具。
- [yarn](https://yarnpkg.com/) 个人非常喜欢的包下载工具。
- [pnpm](https://pnpm.io/) 比较先进的包下载工具。
- [Git](https://git-scm.com/) 我没有办法离开他。

## 开发软件

- [IntelliJ IDEA](https://www.jetbrains.com/idea/) 开发java最好的IDE，没有之一。
- [VsCode](https://code.visualstudio.com/) 前端开发的首选。

## 软件配置

会登陆自己的VPN账号，进行翻墙操作后，登陆自己的Chrome账号，配置自己的Git。

登陆自己的VsCode账号，这样会自动下载插件。

使用账号登陆IntelliJ IDEA。

## 字体

SF Pro、SF Mono、New York 虽然在 macOS 中被系统组件广泛使用，但是并不能直接在其他 app 里（如Word、VS Code、浏览器 font-family 等）指定使用。好在，Apple 有提供官方的下载渠道： https://developer.apple.com/fonts/ ，下载安装后即可正常使用了。
