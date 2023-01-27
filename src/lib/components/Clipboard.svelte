<script>
  import { tick } from 'svelte'
  import Button from './Button.svelte'
  import ClipboardDocumentIcon from '../icons/ClipboardDocumentIcon.svelte'

  import { successToast } from '../utils/toast'

  export let text

  let textarea

  async function copy() {
    // Select the text field
    textarea.select()
    textarea.setSelectionRange(0, 99999) // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(textarea.value)

    await tick()
    textarea.blur()
    successToast('Copied to clipboard')
  }
</script>

<Button class="max-w-fit" on:click={copy} color="yellow" size="sm" style="outline"
  ><ClipboardDocumentIcon /></Button
>
<textarea
  bind:this={textarea}
  value={text}
  class="absolute inset-0 block h-0 w-0 border-none opacity-0"
/>
