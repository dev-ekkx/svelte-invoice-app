<script lang="ts">
  import type { PageProps } from "./$types";
  import type { InvoiceDetails } from "$lib/interfaces";
  import StatusChip from "$lib/components/status-chip.svelte";
  import Button from "$lib/components/button.svelte";
  import { formatDueDate } from "$lib/utils/utils";

  let { data }: PageProps = $props();
  const invoice = data.invoice as unknown as InvoiceDetails;
  console.log(invoice);

  const address = [invoice.fromStreetAddress, invoice.fromCity, invoice.fromPostCode, invoice.fromCountry];
  const customerAddress = [invoice.toStreet, invoice.toCity, invoice.toPostCode, invoice.toCountry];
  const customerDetails: {
    title: string
    value: string
  }[] = [
    {
      title: "invoice date",
      value: invoice.invoiceDate
    },
    {
      title: "bill to",
      value: invoice.toClientName
    },
    {
      title: "sent to",
      value: invoice.toClientEmail
    }
  ];

</script>
<button>Go back</button>
<div class="base-width flex flex-col gap-6">
  <section class="shadow-lg px-6 h-[6rem] rounded-md bg-white flex items-center justify-between gap-4">
    <div class="flex items-center gap-4">
      <span class="text-purple-200">Status</span>
      <StatusChip status={invoice.status} />
    </div>
    <div class="flex items-center gap-4">
      <Button class="text-purple-200 px-6" color="tertiary">Edit</Button>
      <Button class="text-white px-6" color="danger">Delete</Button>
      <Button class="px-6">Mark as Paid</Button>
    </div>
  </section>

  <section class="rounded-md bg-white px-10 py-14 flex flex-col gap-10">
    <section class="flex justify-between gap-5">
      <div class="flex flex-col">
        <span class="text-2xl font-bold flex">
          <span class="text-purple-200">#</span>
          <span class="text-dark">{invoice.invoiceNumber}</span>
        </span>
        <span class="text-purple-200">{invoice.projectDescription}</span>
      </div>
      <div class="flex flex-col justify-end text-purple-200 text-right">
        {#each address as item (item)}
          <span>{item}</span>
        {/each}
      </div>
    </section>
    <section class="grid grid-cols-3 gap-6">
      {#each customerDetails as item (item.title)}
        <div class="flex flex-col gap-2">
          <span class="text-purple-200 capitalize">{item.title}</span>
          <span
            class="text-dark font-bold text-xl">{item.title === "invoice date" ? formatDueDate(item.value) : item.value}</span>
        </div>
      {/each}
    </section>
    <section class="grid grid-cols-3 gap-6">
      <div class="flex flex-col gap-2">
        <span class="text-purple-200 capitalize">payment due</span>
        <span
          class="text-dark font-bold text-xl">{formatDueDate(invoice.invoiceDueDate)}</span>
      </div>
      <div class="flex flex-col justify-end text-purple-200 text-right">
        {#each customerAddress as item (item)}
          <span>{item}</span>
        {/each}
      </div>
      <div class="w-full flex-1"></div>
    </section>
  </section>
</div>
