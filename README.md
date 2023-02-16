# Svelte Tailwind

A collection of reusable svelte components designed with tailwind css.

## Installation

```bash
npm create svelte@latest newProject
npm i -D @codepiercer/svelte-tailwind
```

- Setup

  ```js
  // tailwind.config.cjs
  module.exports {
    presets: require('@codepiercer/svelte-tailwind/config.cjs')
  }

  // postcss.config.cjs
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }

  ```

## (or) Use the pre configured template

```bash
npx degit git@github.com:codepiercer/sveltekit-template.git newProject
```

## Usage

```js
// Example.svelte
<script>
  import { Button } from '@codepiercer/svelte-tailwind'
</script>

<Button color="yellow" variant="secondary">Click Me</Button>
```

<p>
  &copy;
  <a href="https://codepiercer.org/" target="\_blank">CODEPIERCER</a>. All rights reserved.
</p>
