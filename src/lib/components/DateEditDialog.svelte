<script>
  import { createEventDispatcher } from 'svelte'
  import { twMerge } from 'tailwind-merge'

  import { DateInputInline, FormDialog, Button } from '$lib'
  import PencilSquareIcon from '$lib/icons/PencilSquareIcon.svelte'

  export let dialog

  export let inline = false // if true, will not show border and label
  export let type = 'datetime' // date, datetime, time
  export let color = 'blue' // blue, red, green, yellow, gray
  export let name = 'fieldName'
  export let label = name // use name if label is not provided
  export let placeholder = ''
  export let isDisabled = false
  export let isRequired = false
  export let isTouched = false
  export let error = ''
  export let value = ''
  export let isLoading = false

  let classes = 'relative flex h-fit items-center justify-between gap-2 rounded-md'
  if (!inline) {
    classes = twMerge(classes, 'border ring-1 shadow-sm px-3 py-3')
  }
  classes = twMerge(classes, $$props.class)

  const dispatch = createEventDispatcher()

  const onClose = () => {
    dialog.hide()
    dispatch('close')
  }
</script>

<div class={classes}>
  {#if !inline}
    <span
      class={`absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-${color}-900`}
      class:isRequired>{label}</span
    >
  {/if}
  <span class="px-1 text-sm">
    {#if type === 'date'}
      {new Date(value).toISOString().slice(0, 10)}
    {:else if type === 'datetime'}
      {new Date(value).toISOString().slice(0, 10)},
      {new Date(value).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
    {:else}
      {new Date(value).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
    {/if}
  </span>

  <Button size="small" style="outline" on:click={dialog.show} {color} {isDisabled}
    ><PencilSquareIcon />
    <span class="sr-only">Edit</span>
  </Button>
</div>

<FormDialog bind:dialog title={`Update ${label}`} {error} {isLoading} on:close={onClose} on:submit>
  <div class="flex flex-col gap-8">
    <DateInputInline
      {color}
      {type}
      {label}
      {name}
      {isTouched}
      {error}
      {value}
      {isRequired}
      {placeholder}
      options={{
        enableTime: type === 'datetime' || type === 'time',
        noCalendar: type === 'time'
      }}
    />
  </div>
</FormDialog>
