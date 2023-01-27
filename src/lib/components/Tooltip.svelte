<script>
  export let tip = ''
  export let color = 'gray' // blue, red, green, yellow, gray
</script>

<div class="relative inline-block">
  <span class="tooltip-slot">
    <slot />
  </span>
  {#if tip}
    <div
      class="tooltip top absolute left-1/2 -mt-2 inline-block -translate-x-1/2 -translate-y-[100%] whitespace-nowrap opacity-0 transition-all"
    >
      <div class="inline-block rounded-md p-2 bg-{color}-700 text-sm text-white">{tip}</div>
    </div>
  {/if}
</div>

<style>
  .tooltip-slot:hover + .tooltip {
    opacity: 1;
    visibility: initial;
  }

  .tooltip-slot:focus-within + .tooltip {
    opacity: 1;
    visibility: initial;
  }
</style>
