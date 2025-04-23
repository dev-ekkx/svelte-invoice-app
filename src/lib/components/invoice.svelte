<script lang="ts">
	import arrowRight from "$lib/assets/arrow-right.svg";
	import StatusChip from "$lib/components/status-chip.svelte";
	import type { InvoiceInterface } from "$lib/interfaces";
	import { formatAmount, formatDueDate } from "$lib/utils/utils";
	import { goto } from "$app/navigation";

	let invoice: InvoiceInterface = $props();
</script>

<section class="flex h-[4.5rem] w-full items-center justify-between rounded-lg bg-white px-8">
	<span class="flex items-center">
		<span class="text-purple-300">#</span>
		<span class="text-dark font-bold uppercase">{invoice.invoiceNumber}</span>
	</span>
	<span class="text-purple-200">Due {formatDueDate(invoice.invoiceDueDate)}</span>
	<span class="text-purple-200">{invoice.toClientName}</span>
	<span class="text-dark font-bold">{formatAmount(invoice.amount)}</span>
	<div class="flex items-center gap-6">
		<StatusChip status={invoice.status} />
		<button
			aria-label="arrow-right"
			class="group cursor-pointer p-1"
			onclick={() => goto(`/invoices/${invoice.invoiceNumber}`)}
		>
			<img
				alt="arrow-right"
				class="transition-all duration-200 ease-linear group-hover:scale-x-150"
				src={arrowRight}
			/>
		</button>
	</div>
</section>
