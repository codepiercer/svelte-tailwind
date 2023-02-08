<script>
  import { createEventDispatcher } from 'svelte'
  import { twMerge } from 'tailwind-merge'

  import { ToggleInput, ToggleInputReadonly, FormDialog, Button } from '$lib'
  import PencilSquareIcon from '$lib/icons/PencilSquareIcon.svelte'

  export let dialog

  export let inline = false // if true, will not show border and label
  export let color = 'blue' // blue, red, green, yellow, gray
  export let name = 'fieldName'
  export let label = name // use name if label is not provided
  export let isDisabled = false
  export let isRequired = false
  export let isLoading = false
  export let isTouched = false
  export let error = ''
  export let value = ''

  let classes = 'relative flex h-fit items-center justify-between gap-2 rounded-md'
  if (!inline) {
    classes = twMerge(classes, 'border ring-1 shadow-sm px-3 py-3 w-full')
  }
  classes = twMerge(classes, $$props.class)

  const dispatch = createEventDispatcher()

  const onClose = () => {
    dialog.hide()
    dispatch('close')
  }
</script>

<div
  class={classes}
  class:!max-w-[5ch]={label.length < 5}
  class:!max-w-[8ch]={label.length < 10}
  class:!max-w-[10ch]={label.length < 20}
  class:!max-w-[15ch]={label.length < 25}
>
  {#if !inline}
    <span
      class={`absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-${color}-900`}
      class:isRequired>{label}</span
    >
  {/if}
  <ToggleInputReadonly {color} {name} {value} />
  <Button size="small" style="outline" on:click={dialog.show} {color} {isDisabled}
    ><PencilSquareIcon />
    <span class="sr-only">Edit</span>
  </Button>
</div>

<FormDialog bind:dialog title={`Update ${label}`} {error} {isLoading} on:submit on:close={onClose}>
  <div class="flex flex-col gap-8">
    <ToggleInput {color} {label} {name} {isLoading} {error} {value} {isTouched} {isRequired} />
  </div>
</FormDialog>
