<script>
  import { onMount } from 'svelte'
  import flatpickr from 'flatpickr'
  import { twMerge } from 'tailwind-merge'

  import CalendarIcon from '$lib/icons/CalendarIcon.svelte'
  import ExclamationCircleIcon from '$lib/icons/ExclamationCircleIcon.svelte'

  const uniqueId = `fieldName-${Math.random()}`
  let inputRef
  export let color = 'blue' // blue, red, green, yellow, gray
  export let name = 'fieldName'
  export let label = name // use name if label is not provided
  export let placeholder = ''
  export let isRequired = false
  export let formLib // svelte-forms-lib
  export let options = {}

  const { form, errors, touched, handleChange } = formLib

  let classes = 'relative rounded-md border px-4 py-3 shadow-sm h-fit focus-within:ring-1 w-full'
  if (!$errors[name]) {
    classes = twMerge(classes, `border-${color}-300`)
  }
  classes = twMerge(classes, $$props.class)

  onMount(() => {
    flatpickr(inputRef, {
      defaultDate: $form[name],
      ...options
    })
  })
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
</svelte:head>

<div
  class={classes}
  class:focus-within:border-blue-600={color === 'blue' && !$errors[name]}
  class:focus-within:ring-blue-600={color === 'blue' && !$errors[name]}
  class:focus-within:border-red-600={(color === 'red' && !$errors[name]) || $errors[name]}
  class:focus-within:ring-red-600={(color === 'red' && !$errors[name]) || $errors[name]}
  class:focus-within:border-green-600={color === 'green' && !$errors[name]}
  class:focus-within:ring-green-600={color === 'green' && !$errors[name]}
  class:focus-within:border-yellow-600={color === 'yellow' && !$errors[name]}
  class:focus-within:ring-yellow-600={color === 'yellow' && !$errors[name]}
  class:focus-within:border-gray-600={color === 'gray' && !$errors[name]}
  class:focus-within:ring-gray-600={color === 'gray' && !$errors[name]}
  class:border-red-300={$errors[name]}
>
  <label
    for={uniqueId}
    class={`absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-${color}-900`}
    class:isRequired>{label}</label
  >
  <div class="relative flex items-center justify-between">
    <input
      bind:this={inputRef}
      type="text"
      class="block w-full border-0 p-0 text-sm text-gray-900 focus:ring-0"
      {placeholder}
      on:change={handleChange}
      on:keyup|trusted={handleChange}
    />
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      <CalendarIcon class={`h-4 w-4 text-${color}-500`} />
    </div>

    <slot />

    {#if $errors[name]}
      <div class="inset-y-0 right-0 flex items-center">
        <ExclamationCircleIcon class="text-red-500" />
      </div>
    {/if}
  </div>
  {#if $errors[name] && $touched[name]}
    <p class="mt-2 text-xs text-red-600" id="{label}-error">
      {$errors[name]}
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
