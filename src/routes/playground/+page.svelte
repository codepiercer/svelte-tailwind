<script>
  import { Button } from '$lib'
</script>

<div class="h-screen px-4">
  <Button href="/" size="sm" style="outline" class="mt-2">
    <span class="mr-1" aria-hidden="true">&larr;</span>
    <span class="">Home</span>
  </Button>

  <div class="mt-4 flex flex-wrap items-center justify-center gap-8">
    <Button>blue primary Button</Button>
    <Button color="yellow" style="secondary">yellow secondary Button</Button>
    <Button color="green" style="outline">green outline Button</Button>
    <Button color="red" size="lg">red primary Button large</Button>
    <Button color="blue" size="sm" style="secondary">blue secondary Button small</Button>
    <Button color="gray" style="outline">gray outline Button</Button>
    <Button href="#" style="outline">blue Link Button</Button>
    <Button color="red" isDisabled>red disabled Button</Button>
    <Button color="green" href="#" isDisabled>green disabled Link</Button>
  </div>
</div>
