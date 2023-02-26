<script>
  export let color = `blue` // blue, red, green, yellow, gray
  export let name = `fieldName`
  export let type = `datetime` // date, datetime, time
  export let label = name // use name if label is not provided
  export let placeholder = ``
  export let isRequired = false
  export let isTouched = false
  export let error = ``
  export let value = ``
  export let options = {}
  export let inputClass = ``

  import flatpickr from "flatpickr"
  import { twMerge } from "tailwind-merge"

  import { Button, Dialog } from "$lib"
  import ExclamationCircleIcon from "$lib/icons/ExclamationCircleIcon.svelte"
  import XMarkIcon from "$lib/icons/XMarkIcon.svelte"
  import colors from "$lib/utils/colors"

  const uniqueId = `fieldName-${Math.random()}`
  let inputRef
  let dialog

  const colorObject = colors[color]
  const style = Object.entries({
    "--border-color": colorObject[`300`],
    "--error-border-color": colors[`red`][`500`],
    "--normal-ring-focus": `0 0 0 2px ${colorObject[`600`]}`,
    "--error-ring-focus": `0 0 0 2px ${colors[`red`][`600`]}`,
    "--text-color": colorObject[`900`],
    "--error-text-color": colors[`red`][`600`]
  })
    .map(([key, value]) => `${key}: ${value}`)
    .join(`;`)

  const classes = twMerge(
    `relative rounded-md border px-1 py-[0.1rem] shadow-sm h-fit w-auto wrapper min-w-[10rem]`,
    $$props.class
  )

  const onOpen = () => {
    dialog.show()
    setTimeout(() => {
      flatpickr(inputRef, {
        defaultDate: value,
        ...options,
        static: false,
        inline: true,
        enableTime: type === `datetime` || type === `time`,
        noCalendar: type === `time`
      })
    })
  }

  const onClear = () => {
    value = null
    inputRef._flatpickr.setDate(null)
  }

  const goToToday = () => {
    value = new Date()
    inputRef._flatpickr.setDate(value)
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
</svelte:head>

<div {style} class={classes} class:error class:pr-4={$$slots.default}>
  <label
    for={uniqueId}
    class="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium"
    class:isRequired><slot name="label">{label}</slot></label
  >
  <div class="relative flex items-center justify-between gap-2">
    <Button variant="ghost" on:click={onOpen} class="my-[0.2rem] w-full">
      {#if value}
        {#if type === `date`}
          {new Date(value).toISOString().slice(0, 10)}
        {:else if type === `datetime`}
          {new Date(value).toISOString().slice(0, 10)},
          {new Date(value).toLocaleTimeString(`en-US`, { hour: `numeric`, minute: `numeric` })}
        {:else}
          {new Date(value).toLocaleTimeString(`en-US`, { hour: `numeric`, minute: `numeric` })}
        {/if}
      {:else}
        Select
      {/if}
    </Button>

    <slot />

    {#if error}
      <ExclamationCircleIcon class="text-red-500" />
    {/if}
  </div>

  {#if error && isTouched}
    <p class="mt-2 text-xs text-red-600">
      {error}
    </p>
  {/if}
</div>

<Dialog bind:dialog size="xs" closeOnOverlayClick>
  <div slot="header" class="flex items-center justify-between">
    <h2 class="text-center text-xl font-semibold text-gray-900">
      {#if value}
        {#if type === `date`}
          {new Date(value).toISOString().slice(0, 10)}
        {:else if type === `datetime`}
          {new Date(value).toISOString().slice(0, 10)},
          {new Date(value).toLocaleTimeString(`en-US`, { hour: `numeric`, minute: `numeric` })}
        {:else}
          {new Date(value).toLocaleTimeString(`en-US`, { hour: `numeric`, minute: `numeric` })}
        {/if}
      {:else}
        Select
      {/if}
    </h2>
    <Button on:click={dialog.hide} variant="outlined" color="blue" class="p-1">
      <span class="sr-only">Close</span>
      <XMarkIcon />
    </Button>
  </div>

  <div slot="content" class="-mt-4 -mb-2 flex flex-col items-center justify-center gap-4">
    <input
      id={uniqueId}
      {name}
      bind:this={inputRef}
      type="text"
      class={twMerge(`hidden w-full border-0 p-0 text-sm text-gray-900`, inputClass)}
      {placeholder}
      on:change
      on:keyup|trusted
    />
    <div class="flex w-full items-center justify-between">
      <Button variant="ghost" on:click={onClear}>Clear</Button>
      <Button variant="ghost" on:click={goToToday}>Today</Button>
    </div>
  </div>
</Dialog>

<style>
  .wrapper {
    border: 1px solid var(--border-color);
  }

  .wrapper:focus-within {
    border-color: transparent;
    box-shadow: var(--normal-ring-focus);
  }

  .wrapper.error {
    border: 1px solid var(--error-border-color);
  }

  .wrapper.error:focus-within {
    border-color: transparent;
    box-shadow: var(--error-ring-focus);
  }

  label {
    color: var(--text-color);
  }

  label.isRequired:after {
    color: #e32;
    content: " *";
    display: inline;
  }

  input:focus {
    box-shadow: none;
  }

  :global(.flatpickr-wrapper) {
    width: 100%;
  }

  :global(.flatpickr-calendar) {
    box-shadow: none !important;
  }
</style>
