<script>
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'

  import flatpickr from 'flatpickr'
  import { twMerge } from 'tailwind-merge'

  import { Button } from '$lib'
  import XMarkIcon from '$lib/icons/XMarkIcon.svelte'
  import ExclamationCircleIcon from '$lib/icons/ExclamationCircleIcon.svelte'

  const uniqueId = `fieldName-${Math.random()}`
  let inputRef
  export let color = 'blue' // blue, red, green, yellow, gray
  export let name = 'fieldName'
  export let label = name // use name if label is not provided
  export let placeholder = ''
  export let isRequired = false
  export let isTouched = false
  export let error = ''
  export let value = ''
  export let options = {}

  let classes = 'relative rounded-md border px-4 py-3 shadow-sm h-fit focus-within:ring-1 w-full'
  if (!error) {
    classes = twMerge(classes, `border-${color}-300`)
  }
  classes = twMerge(classes, $$props.class)

  onMount(() => {
    flatpickr(inputRef, {
      defaultDate: value,
      ...options
    })
  })

  $: if (value !== undefined && value !== null && inputRef) {
    inputRef._flatpickr.setDate(value)
  }

  const dispatch = createEventDispatcher()

  const onClear = () => {
    value = null
    inputRef._flatpickr.setDate(null)
    dispatch('clear')
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
</svelte:head>

<div
  class={classes}
  class:focus-within:border-blue-600={color === 'blue' && !error}
  class:focus-within:ring-blue-600={color === 'blue' && !error}
  class:focus-within:border-red-600={(color === 'red' && !error) || error}
  class:focus-within:ring-red-600={(color === 'red' && !error) || error}
  class:focus-within:border-green-600={color === 'green' && !error}
  class:focus-within:ring-green-600={color === 'green' && !error}
  class:focus-within:border-yellow-600={color === 'yellow' && !error}
  class:focus-within:ring-yellow-600={color === 'yellow' && !error}
  class:focus-within:border-gray-600={color === 'gray' && !error}
  class:focus-within:ring-gray-600={color === 'gray' && !error}
  class:border-red-300={error}
>
  <label
    for={uniqueId}
    class={`absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-${color}-900`}
    class:isRequired><slot name="label">{label}</slot></label
  >
  <div class="relative flex items-center justify-between">
    <input
      id={uniqueId}
      {name}
      bind:this={inputRef}
      type="text"
      class="block w-full border-0 p-0 text-sm text-gray-900 focus:ring-0"
      {placeholder}
      on:change
      on:keyup|trusted
    />

    {#if inputRef?.value}
      <div class="inset-y-0 right-0 flex items-center">
        <Button {color} style="ghost" class="p-0" on:click={onClear}>
          <span class="sr-only">Clear</span>
          <XMarkIcon class={`text-${color}-500`} />
        </Button>
      </div>
    {/if}

    <slot />

    {#if error}
      <div class="inset-y-0 right-0 flex items-center">
        <ExclamationCircleIcon class="text-red-500" />
      </div>
    {/if}
  </div>
  {#if error && isTouched}
    <p class="mt-2 text-xs text-red-600" id="{label}-error">
      {error}
    </p>
  {/if}
</div>

<style>
  .isRequired:after {
    color: #e32;
    content: ' *';
    display: inline;
  }
</style>
