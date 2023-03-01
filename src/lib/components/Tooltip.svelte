<script>
  import { slide } from "svelte/transition"

  let isVisible = false
</script>

<div class="relative inline-block">
  <span
    on:mouseenter={() => (isVisible = true)}
    on:mouseleave={() => (isVisible = false)}
    on:focusin={() => (isVisible = true)}
    on:focusout={() => (isVisible = false)}
  >
    <slot name="tooltip-slot" />
  </span>
  {#if $$slots.default && isVisible}
    <div
      transition:slide|local
      class="top absolute left-0 z-50 -mt-2 inline-block -translate-x-[50%] -translate-y-[100%] whitespace-nowrap transition-all"
    >
      <div class="inline-block rounded-md bg-gray-700 p-2 text-xs text-white"><slot /></div>
    </div>
  {/if}
</div>
