<script>
  export let dialog
  export let isInline = false // if true, will not show border and label
  export let color = 'blue' // blue, red, green, yellow, gray
  export let name = 'fieldName'
  export let label = name // use name if label is not provided
  export let options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' }
  ]
  export let isDisabled = false
  export let isRequired = false
  export let isLoading = false
  export let error = ''
  export let value = ''
  export let inputClass = ''

  import { createEventDispatcher } from 'svelte'
  import { twMerge } from 'tailwind-merge'

  import { SelectInput, FormDialog, Button } from '$lib'
  import PencilSquareIcon from '$lib/icons/PencilSquareIcon.svelte'
  import colors from '$lib/utils/colors'

  let colorObject = colors[color]
  let style = Object.entries({
    '--text-color': colorObject['900'],
    '--normal-ring': `0 0 0 1px ${colorObject['300']}`
  })
    .map(([key, value]) => `${key}: ${value}`)
    .join(';')

  let classes = 'relative flex h-fit items-center justify-between gap-2 rounded-md'
  if (!isInline) {
    classes = twMerge(classes, 'wrapper shadow-sm px-3 py-3')
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
  <span class="px-1 text-sm">
    {options.find((option) => option.value === value)?.label || 'select option'}
  </span>

  <Button size="small" variant="outlined" on:click={dialog.show} {color} {isDisabled}
    ><PencilSquareIcon />
    <span class="sr-only">Edit</span>
  </Button>
</div>

<FormDialog
  bind:dialog
  title={`Update ${label}`}
  {error}
  {isLoading}
  on:submit
  on:close={onClose}
  class="min-h-[18rem]"
>
  <div class="flex flex-col gap-8">
    <SelectInput
      {isLoading}
      {error}
      {value}
      {name}
      {color}
      {isRequired}
      {label}
      {options}
      {inputClass}
    />
  </div>
</FormDialog>

<style>
  .wrapper {
    box-shadow: var(--normal-ring);
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
