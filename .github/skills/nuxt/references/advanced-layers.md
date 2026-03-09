---
name: nuxt-layers
description: Extending Nuxt applications with layers for code sharing and reusability
---

# Nuxt Layers

Layers allow sharing and reusing partial Nuxt applications across projects. They can include components, composables, pages, layouts, and configuration.

## Using Layers

### From npm Package

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    '@my-org/base-layer',
    '@nuxtjs/ui-layer',
  ],
})
```

### From Git Repository

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    'github:username/repo',
    'github:username/repo/base', // Subdirectory
    'github:username/repo#v1.0', // Specific tag
    'github:username/repo#dev', // Branch
    'gitlab:username/repo',
    'bitbucket:username/repo',
  ],
})
```

### From Local Directory

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    '../base-layer',
    './layers/shared',
  ],
})
```

### Auto-scanned Layers

Place in `layers/` directory for automatic discovery:

```
my-app/
├── layers/
│   ├── base/
│   │   └── nuxt.config.ts
│   └── ui/
│       └── nuxt.config.ts
└── nuxt.config.ts
```

## Creating a Layer

Minimal layer structure:

```
my-layer/
├── nuxt.config.ts       # Required
├── app/
│   ├── components/      # Auto-merged
│   ├── composables/     # Auto-merged
│   ├── layouts/         # Auto-merged
│   ├── middleware/      # Auto-merged
│   ├── pages/           # Auto-merged
│   ├── plugins/         # Auto-merged
│   └── app.config.ts    # Merged
├── server/              # Auto-merged
└── package.json
```

### Layer nuxt.config.ts

```ts
// my-layer/nuxt.config.ts
export default defineNuxtConfig({
  // Layer configuration
  app: {
    head: {
      title: 'My Layer App',
    },
  },
  // Shared modules
  modules: ['@nuxt/ui'],
})
```

### Layer Components

```vue
<!-- my-layer/app/components/BaseButton.vue -->
<template>
  <button class="base-btn">
    <slot />
  </button>
</template>
```

Use in consuming project:

```vue
<template>
  <BaseButton>Click me</BaseButton>
</template>
```

### Layer Composables

```ts
// my-layer/app/composables/useTheme.ts
export function useTheme() {
  const isDark = useState('theme-dark', () => false)
  const toggle = () => isDark.value = !isDark.value
  return { isDark, toggle }
}
```

## Layer Priority

Override order (highest to lowest):
1. Your project files
2. Auto-scanned layers (alphabetically, Z > A)
3. `extends` array (first > last)

Control order with prefixes:

```
layers/
├── 1.base/      # Lower priority
└── 2.theme/     # Higher priority
```

## Layer Aliases

Access layer files:

```ts
// Auto-scanned layers get aliases
import Component from '#layers/base/components/Component.vue'
```

Named aliases:

```ts
// my-layer/nuxt.config.ts
export default defineNuxtConfig({
  $meta: {
    name: 'my-layer',
  },
})
```

```ts
// In consuming project
import { something } from '#layers/my-layer/utils'
```

## Publishing Layers

### As npm Package

```json
{
  "name": "my-nuxt-layer",
  "version": "1.0.0",
  "type": "module",
  "main": "./nuxt.config.ts",
  "dependencies": {
    "@nuxt/ui": "^2.0.0"
  },
  "devDependencies": {
    "nuxt": "^3.0.0"
  }
}
```

### Private Layers

For private git repos:

```bash
export GIGET_AUTH=<github-token>
```

## Layer Best Practices

### Use Resolved Paths

```ts
import { dirname, join } from 'node:path'
// my-layer/nuxt.config.ts
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  css: [
    join(currentDir, './assets/main.css'),
  ],
})
```

### Install Dependencies

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    ['github:user/layer', { install: true }],
  ],
})
```

### Disable Layer Modules

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['./base-layer'],
  // Disable modules from layer
  image: false, // Disables @nuxt/image
  pinia: false, // Disables @pinia/nuxt
})
```

## Starter Template

Create a new layer:

```bash
npx nuxi init --template layer my-layer
```

## Example: Theme Layer

```
theme-layer/
├── nuxt.config.ts
├── app/
│   ├── app.config.ts
│   ├── components/
│   │   ├── ThemeButton.vue
│   │   └── ThemeCard.vue
│   ├── composables/
│   │   └── useTheme.ts
│   └── assets/
│       └── theme.css
└── package.json
```

```ts
// theme-layer/nuxt.config.ts
export default defineNuxtConfig({
  css: ['~/assets/theme.css'],
})
```

```ts
// theme-layer/app/app.config.ts
export default defineAppConfig({
  theme: {
    primaryColor: '#00dc82',
    darkMode: false,
  },
})
```

```ts
// consuming-app/nuxt.config.ts
export default defineNuxtConfig({
  extends: ['theme-layer'],
})

// consuming-app/app/app.config.ts
export default defineAppConfig({
  theme: {
    primaryColor: '#ff0000', // Override
  },
})
```

<!--
Source references:
- https://nuxt.com/docs/getting-started/layers
- https://nuxt.com/docs/guide/going-further/layers
-->
