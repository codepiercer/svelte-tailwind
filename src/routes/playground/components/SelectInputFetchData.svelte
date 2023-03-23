<script>
  export let name
  export let value
  export let label = `Select User`
  export let isRequired = false

  import { SelectInput, Button } from "$lib"
  import PlusIcon from "$lib/icons/PlusIcon.svelte"

  import { createQuery } from "@tanstack/svelte-query"

  let searchValue = ``

  const handleSearch = (event) => {
    searchValue = event.target.value
  }
  $: queryResult = createQuery([searchValue], async () => {
    // fake timeout
    await new Promise((resolve) => setTimeout(resolve, 1000))
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
  })

  const onAddNew = (searchValue) => {
    console.log(`onAddNew`, searchValue)
    options = [
      ...options,
      {
        label: searchValue,
        value: searchValue
      }
    ]
  }

  $: options = $queryResult?.data
    ? $queryResult?.data?.map((user) => ({
        label: user.fullName,
        value: user.id
      }))
    : []
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
>
  <Button
    slot="addNew"
    variant="outlined"
    let:searchValue
    let:onClose
    on:click={() => onAddNew(searchValue)}
    ><PlusIcon class="mr-1 -ml-2" />
    add value: {searchValue}</Button
  >
</SelectInput>
