<script>
  import '../app.postcss'

  import { Toaster } from 'svelte-french-toast'

  import { browser } from '$app/environment'
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser
      }
    }
  })
</script>

{#if browser}
  <Toaster />
{/if}

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
