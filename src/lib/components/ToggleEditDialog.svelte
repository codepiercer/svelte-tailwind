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
    '--label-length': !isInline ? label.length + 1 + (isRequired ? 1 : 0) + 'ch' : 'auto'
  })
    .map(([key, value]) => `${key}: ${value}`)
    .join(';')

  let classes =
    'container relative flex h-fit items-center justify-between gap-2 rounded-md min-w-fit'
  if (!isInline) {
    classes = twMerge(classes, 'border ring-1 shadow-sm px-3 py-3')
  }
  classes = twMerge(classes, $$props.class)

  const dispatch = createEventDispatcher()

  const onClose = () => {
    dialog.hide()
    dispatch('close')
  }
</script>

<div {style} class={classes}>
  {#if !isInline}
    <span
      class="label absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium"
      class:isRequired>{label}</span
    >
  {/if}
  <ToggleInputReadonly {color} {name} {value} />
  <Button size="small" variant="outlined" on:click={dialog.show} {color} {isDisabled}
    ><PencilSquareIcon />
    <span class="sr-only">Edit</span>
  </Button>
</div>

<FormDialog bind:dialog title={`Update ${label}`} {error} {isLoading} on:submit on:close={onClose}>
  <div class="flex flex-col gap-8">
    <ToggleInput {color} {label} {name} {isLoading} {error} {value} {isTouched} {isRequired} />
  </div>
</FormDialog>

<style>
  .container {
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
