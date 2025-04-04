---
title: 利用 CI 脱壳代理模式提升 GitHub Actions 构建效率
date: 2025-04-02T22:46:00
lang: zh
duration: 8min
layout: 'default'
---

在使用 GitHub Actions 构建大型跨平台应用时，
我们经常会遇到构建资源限制、API 限流、私有仓库权限等各种问题。
尤其是：


- GitHub 对公开仓库构建有更慷慨的额度（macOS 免费时长更高）

- 私有仓库构建容易碰到 403（如下载 @vscode/ripgrep、electron）

- 构建任务多平台、资源消耗大，容易被限流或阻塞

为了解决这个较为棘手的问题，我们提出了一种非常实用的策略：CI 脱壳代理模式（CI Shell Proxy Pattern）。

---

## 什么是 CI 脱壳代理模式？

> 利用一个公开仓库作为构建触发器和容器载体，在其中 clone 私有仓库代码、执行构建流程，实现“私有逻辑公开构建”。

这种方式可以最大化 GitHub Actions 的可用资源、绕过私有构建权限、并提供构建加速效果。

## 为什么会有这个念头？

最近对于 GitHub 的使用率上来了，同时也在使用 GitHub Actions 进行 CI/CD。
但是因为一些工作原因，导致我们并没有办法将仓库设置为公开的。
但是我们非常高频的使用 GitHub Actions 。
所以我们在一开始正常的使用了 GitHub Actions 。

发现 GitHub 其实对于私有仓库是有一些限制的，例如在公开仓库也顺利的通过编译脚本，但是在私有仓库却无法通过。

所以我被迫的更换了非常多的 CI/CD 平台。发现要么没有 GitHub Action 稳定，要么无法接受多平台。

所以我就想到这个方法，这样可以让我们享受到 GitHub Actions 的便利，同时又可以避免了一些代码的泄露问题。

## 结语

CI 脱壳代理模式是一种适用于 资源敏感 + 多平台构建 + 私有仓库协作 的优秀方案，尤其适用于 macOS 构建受限、Electron 工程构建依赖复杂的场景。

通过这种策略，你可以更灵活地使用 GitHub Actions 的构建资源，规避限流、提升构建效率，同时保障私有代码不被公开泄漏。
