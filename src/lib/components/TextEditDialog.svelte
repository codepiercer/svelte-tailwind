<script>
  import { TextInput, FormDialog, Button } from '$lib'
  import PencilSquareIcon from '$lib/icons/PencilSquareIcon.svelte'

  export let editDialog

  export let inline = false // if true, will not show border and label
  export let type = 'text' // text, email, password, number, tel, url
  export let color = 'blue' // blue, red, green, yellow, gray
  export let name = 'fieldName'
  export let label = name // use name if label is not provided
  export let placeholder = ''
  export let isDisabled = false
  export let isRequired = false
  export let formLib // svelte-forms-lib
  export let mutation // svelte-query mutation
  const { form } = formLib

  let classes = `relative flex h-fit items-center justify-between gap-2 rounded-md ${$$props.class}`
  if (!inline) {
    classes += ` border ring-1 shadow-sm px-3 py-3`
  }

  const onClose = () => {
    formLib.handleReset()
    $mutation.reset()
    editDialog.hide()
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
      {new Date($form[name]).toISOString().slice(0, 10)}
    {:else if type === 'datetime-local'}
      {new Date($form[name]).toISOString().slice(0, 10)},
      {new Date($form[name]).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
    {:else}
      {$form[name]}
    {/if}
  </span>

  <Button size="small" style="outline" on:click={editDialog.show} {color} {isDisabled}
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
    <TextInput {color} {type} {label} {name} {formLib} {isRequired} {placeholder} />
  </div>
</FormDialog>
