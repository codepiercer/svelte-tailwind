<script>
  import { twMerge } from 'tailwind-merge'

  import ExclamationCircleIcon from '$lib/icons/ExclamationCircleIcon.svelte'
  import EyeIcon from '$lib/icons/EyeIcon.svelte'
  import EyeSlashIcon from '$lib/icons/EyeSlashIcon.svelte'

  const uniqueId = `fieldName-${Math.random()}`
  let inputRef
  export let type = 'text' // text, email, password, number, tel, url
  export let color = 'blue' // blue, red, green, yellow, gray
  export let name = 'fieldName'
  export let label = name // use name if label is not provided
  export let placeholder = ''
  export let isRequired = false
  export let formLib // svelte-forms-lib

  const { form, errors, touched, handleChange } = formLib
  let classes = 'relative rounded-md border px-4 py-3 shadow-sm h-fit focus-within:ring-1 w-full'
  if (!$errors[name]) {
    classes = twMerge(classes, `border-${color}-300`)
  }
  classes = twMerge(classes, $$props.class)

  function typeAction(node) {
    node.type = type
  }
</script>

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
      use:typeAction
      bind:this={inputRef}
      id={uniqueId}
      required={isRequired}
      {name}
      on:change={handleChange}
      on:keyup|trusted={handleChange}
      bind:value={$form[name]}
      class="block w-full border-0 p-0 text-sm text-gray-900 focus:ring-0"
      aria-invalid="true"
      aria-describedby="{label}-error"
      {placeholder}
    />

    {#if type === 'password'}
      <button
        tabindex="-1"
        type="button"
        class="mr-1 block text-sm font-medium text-gray-700"
        on:click={() => {
          inputRef.type = inputRef.type === 'password' ? 'text' : 'password'
        }}
      >
        {#if inputRef && inputRef.type === 'text'}
          <EyeSlashIcon class={`text-${color}-500`} />
        {:else}
          <EyeIcon class={`text-${color}-500`} />
        {/if}
      </button>
    {/if}

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
