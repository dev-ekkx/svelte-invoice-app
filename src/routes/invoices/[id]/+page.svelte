<script lang="ts">
  import type { PageProps } from "./$types";
  import type { InvoiceDetails } from "$lib/interfaces";
  import StatusChip from "$lib/components/status-chip.svelte";
  import Button from "$lib/components/button.svelte";

  let { data }: PageProps = $props();
  const invoice = data.invoice as unknown as InvoiceDetails;
  console.log(invoice);

</script>
<button>Go back</button>
<div class="base-width flex flex-col gap-6">
  <section class="px-6 h-[6rem] rounded-md bg-white flex items-center justify-between gap-4">
    <div class="flex items-center gap-4">
      <span class="text-purple-200">Status</span>
      <StatusChip status={invoice.status} />
    </div>
    <div class="flex items-center gap-4">
      <Button class="text-purple-200 px-6" color="tertiary">Edit</Button>
      <Button class="text-white px-4" color="danger">Delete</Button>
      <Button>Mark as Paid</Button>
    </div>
  </section>
</div>
