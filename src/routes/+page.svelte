<script>
  import Button from "$lib/components/button.svelte";
  import Invoice from "$lib/components/invoice.svelte";
  import emptyState from "$lib/assets/empty.svg";
  import AddInvoice from "$lib/components/add-invoice.svelte";
  import { fade } from "svelte/transition";

  let showMutateInvoiceModal = $state(false);
  const showModal = () => {
    showMutateInvoiceModal = true;
  };
  const discardModal = () => {
    showMutateInvoiceModal = false;
  };
</script>


<header class="base-width h-14 flex items-center justify-between">
  <div class="flex flex-col gap-1.5">
    <h2 class="capitalize text-3xl font-bold text-dark">invoices</h2>
    <span class="text-neutral-200 font-medium">There are 7 total invoices</span>
  </div>
  <div class="flex items-center gap-4">
    <Button
      isIcon
      onclick={showModal}
    >
      New Invoice
    </Button>
  </div>
</header>

<section class="base-width  grid gap-4 overflow-y-auto">
  {#each Array(20) as a, index}
    <Invoice />
  {:else}
    <div class="flex items-center justify-center w-full h-full pt-28 flex-col gap-10">
      <img src={emptyState} alt="empty state">
      <div class="flex flex-col gap-5 items-center w-5/12">
        <span class="font-semibold text-3xl">There is nothing here</span>
        <span class="text-neutral-200 text-justify line-clamp-2 w-7/12">  Create an invoice by clicking the
<span class="font-bold">New Invoice</span> button and get started</span>
      </div>
    </div>
  {/each}
</section>

{#if showMutateInvoiceModal}
  <div transition:fade={{ duration: 200 }}>
    <AddInvoice discardModal={discardModal} />
  </div>
{/if}

<style>
  .base-width {
    @apply w-7/12 mx-auto;
  }
</style>
