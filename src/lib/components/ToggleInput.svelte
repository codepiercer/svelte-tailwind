<script>
  import { twMerge } from 'tailwind-merge'

  import ExclamationCircleIcon from '$lib/icons/ExclamationCircleIcon.svelte'

  export let color = 'blue' // blue, red, green, yellow, gray
  export let name = 'fieldName'
  export let label = name // use name if label is not provided
  export let isRequired = false
  export let formLib // svelte-forms-lib

  const { form, errors, touched } = formLib

  let classes = 'relative rounded-md border px-4 py-3 shadow-sm h-fit focus-within:ring-1'
  if (!$errors[name]) {
    classes = twMerge(classes, `border-${color}-300`)
  }
  classes = twMerge(classes, $$props.class)
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
  <span
    class={`absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-${color}-900`}
    class:isRequired>{label}</span
  >
  <div class="relative flex items-center justify-between">
    <button
      {name}
      type="button"
      class={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
      class:bg-gray-200={!$form[name]}
      class:bg-blue-600={!!$form[name] && color === 'blue'}
      class:bg-red-600={!!$form[name] && color === 'red'}
      class:bg-green-600={!!$form[name] && color === 'green'}
      class:bg-yellow-600={!!$form[name] && color === 'yellow'}
      class:bg-gray-600={!!$form[name] && color === 'gray'}
      role="switch"
      aria-checked={!!$form[name]}
      on:click={() => {
        $form[name] = !$form[name]
      }}
    >
      <span class="sr-only">Use setting</span>
      <span
        class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        class:translate-x-0={!$form[name]}
        class:translate-x-5={!!$form[name]}
      >
        <span
          class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          class:opacity-100={!$form[name]}
          class:ease-in={!$form[name]}
          class:duration-200={!$form[name]}
          class:opacity-0={!!$form[name]}
          class:ease-out={!!$form[name]}
          class:duration-100={!!$form[name]}
          aria-hidden="true"
        >
          <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
            <path
              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span
          class="absolute inset-0 flex h-full w-full items-center justify-center  transition-opacity"
          class:opacity-0={!$form[name]}
          class:ease-out={!$form[name]}
          class:duration-100={!$form[name]}
          class:opacity-100={!!$form[name]}
          class:ease-in={!!$form[name]}
          class:duration-200={!!$form[name]}
          aria-hidden="true"
        >
          <svg class="h-3 w-3 text-{color}-600" fill="currentColor" viewBox="0 0 12 12">
            <path
              d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
            />
          </svg>
        </span>
      </span>
    </button>

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
