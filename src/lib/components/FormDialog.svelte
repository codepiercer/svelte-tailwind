<script>
  import { createEventDispatcher } from 'svelte'

  import Button from './Button.svelte'
  import ErrorAlert from './ErrorAlert.svelte'
  import Dialog from './Dialog.svelte'

  const uniqueId = `dropdown-${Math.random()}`
  export let dialog
  export let title = 'Form Dialog'
  export let error = ''
  export let isLoading = false

  const dispatch = createEventDispatcher()

  const onClose = () => {
    dispatch('close')
  }
</script>

<Dialog bind:dialog closeOnEscape={false} class={$$props.class}>
  <h2 slot="header" class="text-xl font-semibold text-gray-900">{title}</h2>

  <form slot="content" id={uniqueId} on:submit|preventDefault>
    <slot />
  </form>

  <div slot="footer" class="flex flex-col gap-4">
    {#if error}
      <ErrorAlert>
        {error}
      </ErrorAlert>
    {/if}
    <div class="flex justify-end gap-4">
      <Button on:click={onClose} style="outline" isDisabled={isLoading}>Close</Button>
      <Button form={uniqueId} {isLoading} type="submit">Submit</Button>
    </div>
  </div>
</Dialog>
