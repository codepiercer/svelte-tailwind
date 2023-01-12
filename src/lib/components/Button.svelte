<script>
  export let style = 'primary' // primary, secondary, outline
  export let color = 'blue' // blue, red, green, yellow, gray
  export let size = 'md' // sm, md, lg
  export let isDisabled = false
  export let href = ''

  const { class: extraClasses, ...restProps } = $$restProps

  let classes = `inline-flex items-center rounded-md border border-transparent font-medium ring-1 transition focus:outline-none focus:ring-2 focus:ring-offset-1 ring-${color}-200 hover:ring-${color}-300 focus:ring-${color}-500 ${extraClasses}`

  if (style === `primary`) {
    classes += ` text-white bg-${color}-600 hover:bg-${color}-700`
  } else if (style === `secondary`) {
    classes += ` text-${color}-700 bg-${color}-100 hover:bg-${color}-200`
  } else if (style === `outline`) {
    classes += ` text-${color}-700 hover:bg-${color}-50`
  }

  if (size === `sm`) {
    classes += ` px-2.5 py-1.5 text-xs`
  } else if (size === `md`) {
    classes += ` px-4 py-2 text-sm`
  } else if (size === `lg`) {
    classes += ` px-6 py-3 text-base`
  }

  if (isDisabled) {
    classes += ` !cursor-not-allowed !text-gray-600 !bg-gray-200 !ring-gray-100 !focus:ring-gray-100 !hover:ring-gray-100`
  }
</script>

{#if href !== ''}
  <a
    {href}
    on:click={(e) => {
      if (isDisabled) {
        e.preventDefault()
      }
    }}
    tabindex={isDisabled ? -1 : 0}
    class={classes}
    {...restProps}
  >
    <slot />
  </a>
{:else}
  <button on:click type="button" disabled={isDisabled} class={classes} {...restProps}
    ><slot /></button
  >
{/if}
