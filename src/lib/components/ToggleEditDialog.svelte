<script>
  export let dialog
  export let isInline = false // if true, will not show border and label
  export let color = 'blue' // blue, red, green, yellow, gray
  export let name = 'fieldName'
  export let label = name // use name if label is not provided
  export let isDisabled = false
  export let isRequired = false
  export let isLoading = false
  export let isTouched = false
  export let error = ''
  export let value = ''

  import { createEventDispatcher } from 'svelte'
  import { twMerge } from 'tailwind-merge'

  import { ToggleInput, ToggleInputReadonly, FormDialog, Button } from '$lib'
  import PencilSquareIcon from '$lib/icons/PencilSquareIcon.svelte'
  import colors from '$lib/utils/colors'

  let colorObject = colors[color]
  let style = Object.entries({
    '--text-color': colorObject['900'],
    '--normal-ring': `0 0 0 1px ${colorObject['600']}`,
    '--label-length': !isInline ? label.length + 1 + (isRequired ? 1 : 0) + 'ch' : 'auto'
  })
    .map(([key, value]) => `${key}: ${value}`)
    .join(';')

  let classes = 'relative flex h-fit p-1 items-center justify-between gap-2 rounded-md'
  if (!isInline) {
    classes = twMerge(classes, 'wrapper shadow-sm px-3 py-3')
  }
  classes = twMerge(classes, $$props.class)

  let isVisible = !isInline

  const dispatch = createEventDispatcher()

  const onClose = () => {
    dialog.hide()
    dispatch('close')
  }
</script>

<div
  {style}
  class={classes}
  on:mouseenter={() => (isInline ? (isVisible = true) : null)}
  on:mouseleave={() => (isInline ? (isVisible = false) : null)}
>
  {#if !isInline}
    <span
      class="label absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium"
      class:isRequired>{label}</span
    >
  {/if}

  <ToggleInputReadonly {color} {name} {value} />

  {#if isVisible}
    <Button size="small" variant="outlined" on:click={dialog.show} {color} {isDisabled}
      ><PencilSquareIcon />
      <span class="sr-only">Edit</span>
    </Button>
  {/if}
</div>

<FormDialog bind:dialog title={`Update ${label}`} {error} {isLoading} on:submit on:close={onClose}>
  <div class="flex flex-col gap-8">
    <ToggleInput {color} {label} {name} {isLoading} {error} {value} {isTouched} {isRequired} />
  </div>
</FormDialog>

<style>
  .wrapper {
    box-shadow: var(--normal-ring);
    width: var(--label-length);
  }

  .label {
    color: var(--text-color);
  }

  .label.isRequired:after {
    color: #e32;
    content: ' *';
    display: isInline;
  }
</style>
