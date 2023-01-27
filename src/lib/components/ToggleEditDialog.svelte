<script>
  import { ToggleInput, ToggleInputReadonly, FormDialog, Button } from '$lib'
  import PencilSquareIcon from '$lib/icons/PencilSquareIcon.svelte'

  export let editDialog

  export let inline = false // if true, will not show border and label
  export let color = 'blue' // blue, red, green, yellow, gray
  export let name = 'fieldName'
  export let label = name // use name if label is not provided
  export let isRequired = false
  export let formLib // svelte-forms-lib
  export let mutation // svelte-query mutation

  let classes = `relative flex h-fit items-center justify-between gap-2 rounded-md ${$$props.class}`
  if (!inline) {
    classes += ` border ring-1 shadow-sm px-3 py-3 w-full`
  }

  const onClose = () => {
    formLib.handleReset()
    $mutation.reset()
    editDialog.hide()
  }
</script>

<div
  class={classes}
  class:max-w-[15ch]={label.length < 25}
  class:max-w-[10ch]={label.length < 20}
  class:max-w-[8ch]={label.length < 5}
  class:max-w-[5ch]={label.length < 5}
>
  {#if !inline}
    <span
      class={`absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-${color}-900`}
      class:isRequired>{label}</span
    >
  {/if}
  <ToggleInputReadonly {color} {name} {formLib} />
  <Button size="small" style="outline" on:click={editDialog.show} {color}
    ><PencilSquareIcon />
    <span class="sr-only">Edit</span>
  </Button>
</div>

<FormDialog
  bind:formDialog={editDialog}
  title={`Update ${label}`}
  {formLib}
  {mutation}
  on:close={onClose}
>
  <div class="flex flex-col gap-8">
    <ToggleInput {color} {label} {name} {formLib} {isRequired} />
  </div>
</FormDialog>
