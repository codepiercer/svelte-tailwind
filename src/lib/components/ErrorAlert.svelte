<script>
  import ExclamationIcon from '$lib/icons/ExclamationCircleIcon.svelte'
</script>

<div class="rounded-md bg-red-50 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <ExclamationIcon class="text-red-500" />
    </div>
    <div class="ml-3">
      <p class="text-sm font-medium text-red-800"><slot /></p>
    </div>
  </div>
</div>
