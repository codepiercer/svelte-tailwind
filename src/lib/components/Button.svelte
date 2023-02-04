<script>
  import { twMerge } from 'tailwind-merge'

  export let style = 'primary' // primary, secondary, outline, ghost
  export let color = 'blue' // blue, red, green, yellow, gray
  export let size = 'md' // sm, md, lg
  export let isDisabled = false
  export let href = ''
  export let isLoading = false

  import LoadingSpinnerIcon from '$lib/icons/LoadingSpinnerIcon.svelte'

  const { class: extraClasses, ...restProps } = $$restProps

  let classes =
    'inline-flex items-center justify-center h-fit rounded-md border border-transparent font-medium transition focus:outline-none focus:scale-95'

  if (style === `primary`) {
    classes = twMerge(classes, `text-white bg-${color}-600 hover:bg-${color}-700`)
  } else if (style === `secondary`) {
    classes = twMerge(classes, `text-${color}-700 bg-${color}-100 hover:bg-${color}-200`)
  } else if (style === `outline`) {
    classes = twMerge(classes, `text-${color}-700 hover:bg-${color}-50`)
  } else if (style === `ghost`) {
    classes = twMerge(classes, `text-${color}-700 hover:bg-${color}-100 focus:bg-${color}-100`)
  }
  if (style !== `ghost`) {
    classes = twMerge(
      classes,
      `ring-1 focus:ring-${color}-500 focus:ring-2 focus:ring-offset-1 ring-${color}-200 hover:ring-${color}-300`
    )
  }

  if (size === `sm`) {
    classes = twMerge(classes, `px-2.5 py-1.5 text-xs`)
  } else if (size === `md`) {
    classes = twMerge(classes, `px-4 py-2 text-sm`)
  } else if (size === `lg`) {
    classes = twMerge(classes, `px-6 py-3 text-base`)
  }

  classes = twMerge(classes, extraClasses)
</script>

{#if href !== ''}
  <a
    {href}
    on:click={(e) => {
      if (isDisabled || isLoading) {
        e.preventDefault()
      }
    }}
    tabindex={isDisabled ? -1 : 0}
    class={classes}
    class:!cursor-not-allowed={isDisabled}
    class:!text-gray-500={isDisabled}
    class:!bg-gray-200={isDisabled}
    class:!ring-gray-100={isDisabled}
    class:!focus:ring-gray-100={isDisabled}
    class:!hover:ring-gray-100={isDisabled}
    {...restProps}
  >
    {#if isLoading}
      <LoadingSpinnerIcon {color} class="mr-2" />
    {/if}
    <slot />
  </a>
{:else}
  <button
    on:click
    type="button"
    disabled={isDisabled || isLoading}
    class={classes}
    class:!cursor-not-allowed={isDisabled}
    class:!text-gray-500={isDisabled}
    class:!bg-gray-200={isDisabled}
    class:!ring-gray-100={isDisabled}
    class:!focus:ring-gray-100={isDisabled}
    class:!hover:ring-gray-100={isDisabled}
    {...restProps}
  >
    {#if isLoading}
      <LoadingSpinnerIcon {color} class="mr-2" />
    {/if}
    <slot /></button
  >
{/if}
