<script>
  import Button from '$lib/components/button.svelte';
  import Invoice from '$lib/components/invoice.svelte';
</script>


<header class="base-width h-14 flex items-center justify-between">
  <div class="flex flex-col gap-1.5">
    <h2 class="capitalize text-3xl font-bold text-dark">invoices</h2>
    <span class="text-neutral-200 font-medium">There are 7 total invoices</span>
  </div>
  <div class="flex items-center gap-4">
    <Button
      isIcon
    >
      New Invoice
    </Button>
  </div>
</header>

<section class="base-width flex-1 grid gap-4 overflow-y-auto">

  {#each Array(10) as a, index}
    <Invoice />
  {/each}
</section>

<style>
  .base-width {
    @apply w-7/12 mx-auto;
  }
</style>
