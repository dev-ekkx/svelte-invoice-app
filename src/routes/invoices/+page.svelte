<script lang="ts">
  import emptyState from "$lib/assets/empty.svg";
  import Invoice from "$lib/components/invoice.svelte";
  import InvoiceMutation from "$lib/components/invoice-mutation.svelte";
  import { fade } from "svelte/transition";
  import { setInvoiceTotal, showInvoiceMutation, totalInvoices, updateInvoiceMutation } from "$lib/store/index.svelte";
  import type { InvoiceInterface } from "$lib/interfaces/index.js";
  import Button from "$lib/components/button.svelte";

  let { data } = $props();
  const invoices = data.invoices as InvoiceInterface[];
  setInvoiceTotal(invoices.length ?? 0);

  const createInvoice = () => {
    updateInvoiceMutation(true);
  };
</script>
<header class="base-width h-14 flex items-center justify-between">
  <div class="flex flex-col gap-1.5">
    <h2 class="capitalize text-3xl font-bold text-dark">invoices</h2>
    <span class="text-neutral-200 font-medium">There are {totalInvoices()} total invoices</span>
  </div>
  <div class="flex items-center gap-4">
    <Button
      isIcon
      onclick={createInvoice}
    >
      New Invoice
    </Button>
  </div>
</header>
<section class="base-width grid gap-4 overflow-y-auto">
  {#each invoices as invoice(invoice.invoiceNumber)}
    <Invoice {...invoice} />
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
