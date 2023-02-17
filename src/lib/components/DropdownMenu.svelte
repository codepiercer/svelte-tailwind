<script>
  export let isOpen = false
  export let color = 'blue' // blue, red, green, yellow, gray
  export let placement = 'bottom-left' // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right

  import { cubicOut } from 'svelte/easing'
  import { twMerge } from 'tailwind-merge'

  import clickOutside from '$lib/utils/clickOutside'
  import trapUpDownFocus from '$lib/utils/trapUpDownFocus'
  import colors from '$lib/utils/colors'

  let colorObject = colors[color]
  let style = Object.entries({
    '--text-color': colorObject['900'],
    '--hover-bg-color': colorObject['100'],
    '--normal-ring': `0 0 0 1px ${colorObject['300']}`,
    '--normal-ring-focus': `0 0 0 2px ${colorObject['500']}`
  })
    .map(([key, value]) => `${key}: ${value}`)
    .join(';')

  const uniqueId = `dropdown-${Math.random()}`

  const onOpen = () => {
    isOpen = true
  }

  const onClose = () => {
    isOpen = false
  }

  const onKeyDown = async (e) => {
    // ignore if menu is not open
    if (!isOpen) return
    trapUpDownFocus(e, '[role="menuitem"]', () => {
      e.preventDefault()
      document.getElementById(uniqueId).focus()
      onClose()
    })
  }

  let classes =
    'menu absolute z-20 w-full rounded-md shadow-lg backdrop-blur-sm focus:outline-none bg-white min-w-[12rem]'

  if (placement === 'bottom-left') {
    classes = twMerge(classes, 'top-0 right-0 mt-10')
  } else if (placement === 'bottom-center') {
    classes = twMerge(classes, 'top-0 mt-10')
  } else if (placement === 'bottom-right') {
    classes = twMerge(classes, 'top-0 left-0 mt-10')
  } else if (placement === 'top-left') {
    classes = twMerge(classes, 'bottom-0 right-0 mb-10')
  } else if (placement === 'top-center') {
    classes = twMerge(classes, 'bottom-0 mb-10')
  } else if (placement === 'top-right') {
    classes = twMerge(classes, 'bottom-0 left-0 mb-10')
  }

  classes = twMerge(classes, $$props.class)

  let transformOrigin = 'top left'
  if (placement === 'bottom-left') {
    transformOrigin = 'top left'
  } else if (placement === 'bottom-center') {
    transformOrigin = 'top center'
  } else if (placement === 'bottom-right') {
    transformOrigin = 'top right'
  } else if (placement === 'top-left') {
    transformOrigin = 'bottom left'
  } else if (placement === 'top-center') {
    transformOrigin = 'bottom center'
  } else if (placement === 'top-right') {
    transformOrigin = 'bottom right'
  }

  function slideFade(node, params) {
    const existingTransform = getComputedStyle(node).transform.replace('none', '')
    return {
      delay: params.delay || 0,
      duration: params.duration || 400,
      easing: params.easing || cubicOut,
      css: (t) =>
        `transform-origin: ${transformOrigin}; transform: ${existingTransform} scaleY(${t}); opacity: ${t};`
    }
  }
</script>

<div class="relative inline-flex items-center justify-center" on:keydown={onKeyDown}>
  <slot
    name="trigger"
    triggerProps={{
      id: uniqueId,
      'aria-expanded': isOpen,
      'aria-haspopup': 'true'
    }}
    {onOpen}
    {onClose}
  />

  <!-- Dropdown menu -->
  {#if isOpen}
    <div
      id="menu"
      use:clickOutside
      on:clickOutside={onClose}
      transition:slideFade
      class={classes}
      {style}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={uniqueId}
    >
      <slot
        name="content"
        menuItemProps={{
          class: `menu-item block rounded-md px-4 py-3 m-1 text-sm focus:outline-none focus:ring-2 active:bg-gray-100`,
          tabindex: '-1',
          role: 'menuitem'
        }}
        closeMenu={onClose}
      />
    </div>
  {/if}
</div>

<style>
  .menu {
    box-shadow: var(--normal-ring);
  }

  :global(.menu-item) {
    color: var(--text-color);
  }

  :global(.menu-item:hover) {
    background-color: var(--hover-bg-color);
  }

  :global(.menu-item:focus) {
    box-shadow: var(--normal-ring-focus);
  }
</style>
