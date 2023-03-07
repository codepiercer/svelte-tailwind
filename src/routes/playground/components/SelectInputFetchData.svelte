<script>
  export let name
  export let value
  export let label = `Select User`
  export let isRequired = false

  import { SelectInput } from "$lib"

  import { createQuery } from "@tanstack/svelte-query"

  let searchValue = ``

  const handleSearch = (event) => {
    searchValue = event.target.value
  }
  $: queryResult = createQuery(
    [searchValue],
    async () => {
      // fake timeout
      await new Promise((resolve) => setTimeout(resolve, 5000))
      return [
        {
          id: `apple`,
          fullName: `Apple`
        },
        {
          id: `banana`,
          fullName: `Banana`
        }
      ]
    },
    {
      cacheTime: 0,
      staleTime: 0
    }
  )

  $: options = $queryResult?.data
    ? $queryResult?.data?.map((user) => ({
        label: user.fullName,
        value: user.id
      }))
    : []

  $: console.log(searchValue)
</script>

<SelectInput
  on:stopTyping={handleSearch}
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
