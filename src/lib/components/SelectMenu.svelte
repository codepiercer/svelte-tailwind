<script>
  import { twMerge } from 'tailwind-merge'

  import { createEventDispatcher } from 'svelte'

  import clickOutside from '$lib/utils/clickOutside'

  import CheckOutlineIcon from '$lib/icons/CheckOutlineIcon.svelte'
  import ChevronUpDownIcon from '$lib/icons/ChevronUpDownIcon.svelte'
  import ExclamationCircleIcon from '$lib/icons/ExclamationCircleIcon.svelte'
  import LoadingSpinnerIcon from '$lib/icons/LoadingSpinnerIcon.svelte'

  const uniqueId = `fieldName-${Math.random()}`
  export let color = 'blue' // blue, red, green, yellow, gray
  export let name = 'fieldName'
  export let placeholder = ''
  export let isRequired = false
  export let label = 'Select menu'
  export let options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' }
  ]
  export let isLoading = false
  export let formLib // svelte-forms-lib
  const { form, errors } = formLib

  let inputRef = null
  let searchValue = options.find((option) => option.value === $form[name])?.label || ''
  let isOptionsOpen = false
  let isActive = null

  const dispatch = createEventDispatcher()

  const onSelect = (option) => {
    $form[name] = option.value
    onClose()
    searchValue = option.label
    inputRef.focus()
    dispatch('select', option)
  }

  const onClose = () => {
    isOptionsOpen = false
    if ($form[name] !== null && isRequired) {
      searchValue = options.find((option) => option.value === $form[name])?.label || ''
    }
  }

  // cycle focus on li options with keyboard up or down
  const onKeyDown = (e) => {
    if (!isOptionsOpen) return
    // close on escape or tab out
    if (e.key === 'Escape' || e.key === 'Tab') {
      onClose()
      return
    }
    // get all li elements
    const options = document.querySelectorAll('#options li')
    // cycle focus on li elements with keyboard up or down
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (isActive === null) {
        isActive = 0
      } else {
        isActive = (isActive + 1) % options.length
      }
      options[isActive] && options[isActive].focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (isActive === null) {
        isActive = 0
      } else {
        isActive = (isActive - 1 + options.length) % options.length
      }
      options[isActive] && options[isActive].focus()
    } else {
      // focus on input on any other except Enter
      if (e.key !== 'Enter') {
        inputRef.focus()
      }
    }
  }
</script>

<div
  use:clickOutside
  on:clickOutside={() => {
    onClose()
  }}
  on:keydown={onKeyDown}
  class={twMerge(
    'relative h-fit w-full rounded-md border p-1 shadow-sm focus-within:ring-1',
    $$props.class
  )}
  class:focus-within:border-blue-600={!$errors[name] && color === 'blue'}
  class:focus-within:ring-blue-600={!$errors[name] && color === 'blue'}
  class:border-blue-300={!$errors[name] && color === 'blue'}
  class:focus-within:border-green-600={!$errors[name] && color === 'green'}
  class:focus-within:ring-green-600={!$errors[name] && color === 'green'}
  class:border-green-300={!$errors[name] && color === 'green'}
  class:focus-within:border-yellow-600={!$errors[name] && color === 'yellow'}
  class:focus-within:ring-yellow-600={!$errors[name] && color === 'yellow'}
  class:border-yellow-300={!$errors[name] && color === 'yellow'}
  class:focus-within:border-gray-600={!$errors[name] && color === 'gray'}
  class:focus-within:ring-gray-600={!$errors[name] && color === 'gray'}
  class:border-gray-300={!$errors[name] && color === 'gray'}
  class:focus-within:border-red-600={$errors[name] || color === 'red'}
  class:focus-within:ring-red-600={$errors[name] || color === 'red'}
  class:border-red-300={$errors[name] || color === 'red'}
>
  <label
    for={uniqueId}
    class={`absolute -top-2 left-2 z-10 -mt-px inline-block bg-white px-1 text-xs font-medium text-${color}-900`}
    class:isRequired>{label}</label
  >
  <div class="relative">
    <div class="flex items-center justify-between">
      <input
        id={uniqueId}
        {name}
        bind:this={inputRef}
        required={isRequired}
        bind:value={searchValue}
        on:click={() => {
          isOptionsOpen = true
          searchValue = ''
        }}
        on:keyup={(e) => {
          if (e.key === 'Escape' || e.key === 'Tab') {
            return
          }
          if (!isOptionsOpen) {
            isOptionsOpen = true
            searchValue = ''
          }
        }}
        {placeholder}
        type="text"
        class="sh w-full rounded-md border-none bg-white py-2 pl-3 pr-12 outline-none focus:ring-0 sm:text-sm"
        role="combobox"
        aria-controls="options"
        aria-expanded="false"
      />

      {#if $errors[name]}
        <div class="inset-y-0 right-0 flex items-center">
          <ExclamationCircleIcon class="text-red-500" />
        </div>
      {/if}
      <button
        type="button"
        on:click={() => (isOptionsOpen = !isOptionsOpen)}
        class="flex items-center rounded-r-md px-2 focus:outline-none"
        tabindex="-1"
      >
        <ChevronUpDownIcon class="text-{color}-400" />
      </button>
    </div>
    {#if $errors[name]}
      <p class="ml-3 text-xs text-red-600" id="{label}-error">
        {$errors[name]}
      </p>
    {/if}

    {#if isOptionsOpen}
      <ul
        class="absolute z-10 mt-2 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        id="options"
        role="listbox"
      >
        {#if isLoading}
          <li
            class="relative cursor-default select-none rounded-md py-2 pl-3 pr-9 focus:outline-none"
          >
            <div class="flex items-center gap-1">
              <LoadingSpinnerIcon class="text-{color}-500 mr-2" />
              Loading...
            </div>
          </li>
        {:else}
          {#each options.filter(({ label }) => label
              .toLowerCase()
              .trim()
              .startsWith(searchValue.toLowerCase().trim())) as option, idx (option.value)}
            {@const isSelected = option.value === $form[name]}
            <li
              class="relative cursor-default select-none rounded-md py-2 pl-3 pr-9 focus:outline-none"
              on:mouseenter={() => (isActive = idx)}
              on:mouseleave={() => (isActive = null)}
              on:click={() => {
                onSelect(option)
              }}
              on:keyup={(event) => {
                if (event.key === 'Enter') {
                  onSelect(option)
                }
              }}
              class:text-white={isActive === idx}
              class:bg-blue-600={color === 'blue' && isActive === idx}
              class:bg-red-600={color === 'red' && isActive === idx}
              class:bg-green-600={color === 'green' && isActive === idx}
              class:bg-yellow-600={color === 'yellow' && isActive === idx}
              class:bg-gray-600={color === 'gray' && isActive === idx}
              class:text-gray-900={isActive !== idx}
              id={option.label}
              role="option"
              tabindex="-1"
              aria-selected={isSelected}
            >
              <span class="block truncate" class:font-semibold={isSelected}>{option.label}</span>

              {#if isSelected}
                <span
                  class="absolute inset-y-0 right-0 flex items-center pr-4 "
                  class:text-white={isActive === idx}
                  class:text-blue-600={color === 'blue' && isActive !== idx}
                  class:text-red-600={color === 'red' && isActive !== idx}
                  class:text-green-600={color === 'green' && isActive !== idx}
                  class:text-yellow-600={color === 'yellow' && isActive !== idx}
                  class:text-gray-600={color === 'gray' && isActive !== idx}
                >
                  <CheckOutlineIcon />
                </span>
              {/if}
            </li>
          {:else}
            <li
              class="relative cursor-default select-none rounded-md py-2 pl-3 pr-9 focus:outline-none"
            >
              <div class="flex items-center gap-1">
                <ExclamationCircleIcon class="text-{color}-500" />
                No items found
              </div>
            </li>
          {/each}
        {/if}
      </ul>
    {/if}
  </div>
</div>

<style>
  .isRequired:after {
    color: #e32;
    content: ' *';
    display: inline;
  }
</style>
