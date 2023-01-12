# Svelte Tailwind

A collection of reusable svelte components designed with tailwind css.

## Installation

```bash
npm i -D @codepiercer/svelte-tailwind
```

## Setup

```js
// tailwind.config.cjs
module.exports {
  presets: require('@codepiercer/svelte-tailwind/config.cjs')
}

```

## Usage

```js
// Example.svelte
<script>
  import { Button } from '@codepiercer/svelte-tailwind'
</script>

<Button color="yellow" style="secondary">Click Me</Button>
```

<p>
  &copy;
  <a href="https://codepiercer.org/" target="\_blank">CODEPIERCER</a>. All rights reserved.
</p>
