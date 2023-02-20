<script>
  export let name
  export let value
  export let label = 'Select User'
  export let isRequired = false

  import { SelectInput } from '$lib'

  import { createQuery } from '@tanstack/svelte-query'

  const queryResult = createQuery(['FETCH_DATA'], () => {
    return [
      {
        id: 'apple',
        fullName: 'Apple'
      },
      {
        id: 'banana',
        fullName: 'Banana'
      }
    ]
  })

  $: options = $queryResult?.data
    ? $queryResult?.data?.map((user) => ({
        label: user.fullName,
        value: user.id
      }))
    : []
</script>

<SelectInput
  {name}
  {label}
  {value}
  {options}
  {isRequired}
  class="max-w-full p-2"
  error={$queryResult.error?.message}
  isLoading={$queryResult.isLoading}
  on:select
/>
