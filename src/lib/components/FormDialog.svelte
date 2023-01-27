<script>
  import { createEventDispatcher } from 'svelte'

  import Button from './Button.svelte'

  import ErrorAlert from './ErrorAlert.svelte'
  import Dialog from './Dialog.svelte'

  const uniqueId = `dropdown-${Math.random()}`
  export let formDialog
  export let title = 'Form Dialog'
  export let formLib
  export let mutation

  const dispatch = createEventDispatcher()

  const onClose = () => {
    dispatch('close')
  }
</script>

<Dialog bind:dialog={formDialog} closeOnEscape={false}>
  <h2 slot="header" class="text-xl font-semibold text-gray-900">{title}</h2>

  <form slot="content" id={uniqueId} on:submit={formLib.handleSubmit}>
    <slot />
  </form>

  <div slot="footer" class="flex flex-col gap-4">
    {#if $mutation.isError}
      <ErrorAlert>
        {$mutation?.error?.message || 'Something went wrong'}
      </ErrorAlert>
    {/if}
    <div class="flex justify-end gap-4">
      <Button on:click={onClose} style="outline" isDisabled={$mutation.isLoading}>Close</Button>
      <Button form={uniqueId} isLoading={$mutation.isLoading} type="submit">Submit</Button>
    </div>
  </div>
</Dialog>
