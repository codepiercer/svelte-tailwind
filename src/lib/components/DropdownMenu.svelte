<script>
  import { scale } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'

  import clickOutside from '$lib/utils/clickOutside'

  export let isOpen = false
  export let color = 'blue' // blue, red, green, yellow, gray
  export let placement = 'right'
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
    // close the menu if the user presses the escape key or tabs out
    if (e.key === 'Escape' || e.key === 'Tab') {
      // re-focus the trigger button
      document.getElementById(uniqueId).focus()
      onClose()
    }
    // we're only interested in handling up & down arrow keys
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
    // currently focused element (if any)
    const current = document.activeElement
    // get our collection of list elements and turn it into an actual array
    const items = [...document.querySelectorAll('[role="menuitem"]')]
    // attempt to match the currently focused element to an index in our array of list elements
    const currentIndex = items.indexOf(current)
    // index of the list element to be newly focused
    let newIndex
    // if the currently focused element was NOT a list item, then default to focusing the first item in the list (index 0)
    if (currentIndex === -1) {
      newIndex = 0
      // otherwise, the currently focused element is an item in our list
    } else {
      if (e.key === 'ArrowUp') {
        newIndex = (currentIndex + items.length - 1) % items.length
      } else if (e.key === 'ArrowDown') {
        newIndex = (currentIndex + 1) % items.length
      }
    }
    if (items[newIndex]) {
      // blur (= unfocus) the currently focused element (whether it's a list element or not)
      current.blur()
      // focus the list element at the computed index
      items[newIndex]?.focus()
    }
  }
</script>

<div class="relative inline-block text-left" on:keydown={onKeyDown}>
  <slot
    name="trigger"
    triggerProps={{
      id: uniqueId,
      'aria-expanded': isOpen,
      'aria-haspopup': 'true'
    }}
    {onOpen}
  />

  <!-- Dropdown menu -->
  {#if isOpen}
    <div
      id="menu"
      use:clickOutside
      on:clickOutside={onClose}
      transition:scale|local={{ duration: 300, opacity: 0.5, easing: quintOut }}
      class="absolute z-20 mt-2 w-max rounded-md bg-white/90 shadow-lg ring-1 ring-blue-500 ring-opacity-5 backdrop-blur-sm focus:outline-none"
      class:right-0={placement === 'right'}
      class:origin-top-right={placement === 'right'}
      class:left-0={placement === 'left'}
      class:origin-top-left={placement === 'left'}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={uniqueId}
    >
      <slot
        name="content"
        menuItemProps={{
          class: `block rounded-md px-4 py-3 mt-1 text-sm text-${color}-700 hover:bg-${color}-100 focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-${color}-100 active:bg-gray-100`,
          tabindex: '-1',
          role: 'menuitem'
        }}
        closeMenu={onClose}
      />
    </div>
  {/if}
</div>
