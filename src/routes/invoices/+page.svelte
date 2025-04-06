<script>
  import emptyState from "$lib/assets/empty.svg";
  import Invoice from "$lib/components/invoice.svelte";
  import InvoiceMutation from "$lib/components/invoice-mutation.svelte";
  import { fade } from "svelte/transition";
  import { showInvoiceMutation } from "$lib/store/index.svelte";
</script>

<section class="base-width grid gap-4 overflow-y-auto">
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

{#if showInvoiceMutation()}
  <div transition:fade={{duration: 200}}>
    <InvoiceMutation />
  </div>
{/if}
