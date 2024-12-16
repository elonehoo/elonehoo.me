---
title: GitHub Skip CI
date: 2024-08-19T22:14:00.000+00:00
lang: zh
duration: 5min
---

记录如何让 GitHub 中的PR在特定的条件之下触发CI

可以在 ci 中增加 if 来指定触发的条件，同时将触发的类型设置为 `labeled`。

---

可以查看一下我在 destyler 中增加的 `pr.yml`。

```yaml
name: PR CI

on:
  pull_request:
    branches:
      - main
    types:
      - labeled

jobs:
  lint:
    runs-on: ubuntu-latest
    if: ${{ contains(github.event.pull_request.labels.*.name, 'pending review') }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: latest

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: latest

      - name: Install
        run: pnpm install --no-frozen-lockfile

      - name: Lint
        run: pnpm run lint

  test:
    runs-on: ubuntu-latest
    if: ${{ contains(github.event.pull_request.labels.*.name, 'pending review') }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: latest

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: latest

      - name: Install
        run: pnpm install --no-frozen-lockfile

      - name: Build
        run: pnpm run build

      - name: Test
        run: pnpm run test
```
