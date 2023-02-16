<div class="relative inline-block">
  <span class="tooltip-slot">
    <slot name="tooltip-slot" />
  </span>
  {#if $$slots.default}
    <div
      class="tooltip top absolute left-1/2 -mt-2 inline-block -translate-x-1/2 -translate-y-[100%] whitespace-nowrap opacity-0 transition-all"
    >
      <div class="z-10 inline-block rounded-md bg-gray-700 p-2 text-xs text-white"><slot /></div>
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
