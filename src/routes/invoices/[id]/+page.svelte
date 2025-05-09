<script lang="ts">
	import { goto, invalidate } from "$app/navigation";
	import Button from "$lib/components/button.svelte";
	import Modal from "$lib/components/modal.svelte";
	import StatusChip from "$lib/components/status-chip.svelte";
	import { itemHeaders, ItemsHeaderEnum } from "$lib/constants";
	import type { InvoiceDetails } from "$lib/interfaces";
	import { cn, formatAmount, formatDueDate } from "$lib/utils/utils";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
	let invoice = $state({} as InvoiceDetails);

	$effect(() => {
		invoice = data.invoice;

		return () => {
			invoice = {} as InvoiceDetails;
		};
	});

	const invoiceItems = $derived(() => invoice.items ?? []);
	const totalAmount = $derived(() =>
		invoiceItems().reduce((acc, item) => acc + item.quantity * item.price, 0)
	);
	const address = $derived(() => [
		invoice.fromStreetAddress,
		invoice.fromCity,
		invoice.fromPostCode,
		invoice.fromCountry
	]);
	const customerAddress = $derived(() => [
		invoice.toStreet,
		invoice.toCity,
		invoice.toPostCode,
		invoice.toCountry
	]);
	const customerDetails = $derived(() => [
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
	]);

	let isMarkAsPaidModalOpen = $state(false);
	let isDeleteInvoiceModalOpen = $state(false);

	const markAsPaid = async () => {
		try {
			const res = await fetch(`/invoices/${invoice.invoiceNumber}`, {
				method: "PATCH"
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message);
			}
			invalidate((url) => url.pathname.includes("/invoices"));
			isMarkAsPaidModalOpen = false;
		} catch (e) {
			const error = e instanceof Error ? e : new Error("An unexpected error occurred");
			alert(error.message);
			alert(error.message);
		}
	};

	const deleteInvoice = async () => {
		try {
			const res = await fetch(``, {
				method: "DELETE"
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message);
			}

			await goto("/invoices");
			invalidate((url) => url.pathname.includes("/invoices"));
			isDeleteInvoiceModalOpen = false;
		} catch (e) {
			const error = e instanceof Error ? e : new Error("An unexpected error occurred");
			alert(error.message);
		}
	};
</script>

{#if !invoice.invoiceNumber}
	Invoice not found
{:else}
	<div class="base-width">
		<button onclick={() => goto("/invoices")} class="flex cursor-pointer items-center gap-4">
			<span class="icon-[stash--chevron-left-solid] text-2xl text-purple-300"></span>
			<span> Go back </span>
		</button>
	</div>
	<div class="base-width flex flex-col gap-6">
		<section
			class="flex h-[6rem] items-center justify-between gap-4 rounded-md bg-white px-6 shadow-lg"
		>
			<div class="flex items-center gap-4">
				<span class="text-purple-200">Status</span>
				<StatusChip status={invoice.status} />
			</div>
			<div class="flex items-center gap-4">
				<Button aria-label="edit invoice" class="px-6 text-purple-200" color="tertiary">Edit</Button
				>
				<Button
					aria-label="delete invoice"
					class="px-6 text-white"
					color="danger"
					onclick={() => (isDeleteInvoiceModalOpen = true)}>Delete</Button
				>
				<Button
					aria-label="mark as paid"
					disabled={invoice.status === "paid"}
					class="px-6"
					onclick={() => (isMarkAsPaidModalOpen = true)}>Mark as Paid</Button
				>
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
					{#each address() as item (item)}
						<span>{item}</span>
					{/each}
				</div>
			</section>
			<section class="grid grid-cols-3 gap-6">
				{#each customerDetails() as item (item.title)}
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
					{#each customerAddress() as item (item)}
						<span>{item}</span>
					{/each}
				</div>
				<div class="w-full flex-1"></div>
			</section>
			<section class="flex flex-col overflow-clip rounded-md">
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
						{#each invoiceItems() as item (item.id)}
							<tr class="flex justify-end gap-6 font-semibold">
								<td class="text-dark flex flex-1 justify-start">{item.itemName}</td>
								<td class="flex w-[13%] justify-center text-purple-200">{item.quantity}</td>
								<td class="flex w-[16%] justify-end text-purple-200">{formatAmount(item.price)}</td>
								<td class="flex w-[16%] justify-end">{formatAmount(item.quantity * item.price)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
				<div class="flex items-center justify-between gap-4 bg-neutral-300 p-6 text-white">
					<span>Amount Due</span>
					<span>{formatAmount(totalAmount())}</span>
				</div>
			</section>
		</section>
	</div>

	{#if isDeleteInvoiceModalOpen}
		<Modal
			title="confirm deletion"
			description={"Are you sure you want to delete invoice " +
				"#" +
				invoice.invoiceNumber +
				"?" +
				" This action cannot be undone."}
		>
			<div class="flex items-center justify-end gap-4">
				<Button color="tertiary" onclick={() => (isDeleteInvoiceModalOpen = false)}>Cancel</Button>
				<Button color="danger" class="text-white" onclick={deleteInvoice}>Confirm</Button>
			</div>
		</Modal>
	{/if}

	{#if isMarkAsPaidModalOpen}
		<Modal
			title="Mark as paid"
			description={"Are you sure you want to mark this invoice " +
				"#" +
				invoice.invoiceNumber +
				" as paid? This action cannot be undone."}
		>
			<div class="flex items-center justify-end gap-4">
				<Button color="tertiary" onclick={() => (isMarkAsPaidModalOpen = false)}>Cancel</Button>
				<Button onclick={markAsPaid}>Confirm</Button>
			</div>
		</Modal>
	{/if}
{/if}
