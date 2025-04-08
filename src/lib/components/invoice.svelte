<script lang="ts">
  import arrowRight from "$lib/assets/arrow-right.svg";
  import StatusChip from "$lib/components/status-chip.svelte";
  import type { InvoiceInterface } from "$lib/interfaces";
  import { formatAmount, formatDueDate } from "$lib/utils/utils";

  let invoice: InvoiceInterface = $props();
</script>

<section class="bg-white w-full h-[4.5rem] rounded-lg flex items-center justify-between px-8">
  <span class="flex items-center">
    <span class="text-purple-300">#</span>
    <span class="uppercase text-dark font-bold">{invoice.invoiceNumber}</span>
  </span>
  <span class="text-purple-300 font-medium">Due {formatDueDate(invoice.invoiceDate)}</span>
  <span class="text-purple-300 font-medium">{invoice.toClientName}</span>
  <span class="text-dark font-bold">{formatAmount(invoice.amount)}</span>
  <div class="flex items-center gap-6">
    <StatusChip status="paid" />
    <button aria-label="arrow-right" class="cursor-pointer p-1 group">
      <img alt="arrow-right" class="transition-all duration-200 ease-linear group-hover:scale-x-150" src={arrowRight}>
    </button>
  </div>
</section>
