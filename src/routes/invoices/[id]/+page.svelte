<script lang="ts">
	import type { PageProps } from "./$types";
	import type { InvoiceDetails } from "$lib/interfaces";
	import StatusChip from "$lib/components/status-chip.svelte";
	import Button from "$lib/components/button.svelte";
	import { cn, formatAmount, formatDueDate } from "$lib/utils/utils";
	import { itemHeaders, ItemsHeaderEnum } from "$lib/constants";

	let { data }: PageProps = $props();
	const invoice = data.invoice as unknown as InvoiceDetails;
	const invoiceItems = invoice.items;

	const address = [
		invoice.fromStreetAddress,
		invoice.fromCity,
		invoice.fromPostCode,
		invoice.fromCountry
	];
	const customerAddress = [invoice.toStreet, invoice.toCity, invoice.toPostCode, invoice.toCountry];
	const customerDetails: {
		title: string;
		value: string;
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
	<section
		class="flex h-[6rem] items-center justify-between gap-4 rounded-md bg-white px-6 shadow-lg"
	>
		<div class="flex items-center gap-4">
			<span class="text-purple-200">Status</span>
			<StatusChip status={invoice.status} />
		</div>
		<div class="flex items-center gap-4">
			<Button class="px-6 text-purple-200" color="tertiary">Edit</Button>
			<Button class="px-6 text-white" color="danger">Delete</Button>
			<Button class="px-6">Mark as Paid</Button>
		</div>
	</section>

	<section class="flex flex-col gap-10 rounded-md bg-white px-10 py-14">
		<section class="flex justify-between gap-5">
			<div class="flex flex-col">
				<span class="flex text-2xl font-bold">
					<span class="text-purple-200">#</span>
					<span class="text-dark">{invoice.invoiceNumber}</span>
				</span>
				<span class="text-purple-200">{invoice.projectDescription}</span>
			</div>
			<div class="flex flex-col justify-end text-right text-purple-200">
				{#each address as item (item)}
					<span>{item}</span>
				{/each}
			</div>
		</section>
		<section class="grid grid-cols-3 gap-6">
			{#each customerDetails as item (item.title)}
				<div class="flex flex-col gap-2">
					<span class="text-purple-200 capitalize">{item.title}</span>
					<span class="text-dark text-xl font-bold"
						>{item.title === "invoice date" ? formatDueDate(item.value) : item.value}</span
					>
				</div>
			{/each}
		</section>
		<section class="flex gap-2">
			<div class="flex w-4/12 flex-col gap-2">
				<span class="text-purple-200 capitalize">payment due</span>
				<span class="text-dark text-xl font-bold">{formatDueDate(invoice.invoiceDueDate)}</span>
			</div>
			<div class="flex flex-col justify-start text-purple-200">
				{#each customerAddress as item (item)}
					<span>{item}</span>
				{/each}
			</div>
			<div class="w-full flex-1"></div>
		</section>
		<section class="flex flex-col rounded-md">
			<table class="rounded-lg bg-neutral-50 p-6">
				<caption class="sr-only">Items table</caption>
				<thead>
					<tr class="flex gap-6 p-6 pb-4">
						{#each itemHeaders as header (header)}
							<th
								class={cn("flex w-[15.5%] justify-end font-medium text-purple-200", {
									"flex-1 justify-start": header === ItemsHeaderEnum.NAME,
									"justify-center": header === ItemsHeaderEnum.QUANTITY
								})}>{header}</th
							>
						{/each}
					</tr>
				</thead>
				<tbody class="flex flex-col gap-3 px-6 pt-0 pb-4">
					{#each invoiceItems as item (item.id)}
						<tr class="flex justify-end gap-6 font-semibold">
							<td class="text-dark flex flex-1 justify-start">{item.itemName}</td>
							<td class="flex w-[13%] justify-center text-purple-200">{item.quantity}</td>
							<td class="flex w-[16%] justify-end text-purple-200">{formatAmount(item.price)}</td>
							<td class="flex w-[16%] justify-end">{formatAmount(item.quantity * item.price)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<div class="bg-neutral-300"></div>
		</section>
	</section>
</div>
