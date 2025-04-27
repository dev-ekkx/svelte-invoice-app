<script lang="ts">
	import emptyState from "$lib/assets/empty.svg";
	import Button from "$lib/components/button.svelte";
	import InvoiceMutation from "$lib/components/invoice-mutation.svelte";
	import Invoice from "$lib/components/invoice.svelte";
	import type { InvoiceInterface } from "$lib/interfaces/index.js";
	import {
		setInvoiceTotal,
		showInvoiceMutation,
		totalInvoices,
		updateInvoiceMutation
	} from "$lib/store/index.svelte";
	import { untrack } from "svelte";
	import { fade } from "svelte/transition";

	let { data } = $props();

	let invoices = $state<InvoiceInterface[]>([]);

	$effect(() => {
		console.log(data);
		invoices = data.invoices as InvoiceInterface[];
		untrack(() => {
			setInvoiceTotal(invoices.length ?? 0);
		});
		return () => {
			invoices = [];
		};
	});

	const createInvoice = () => {
		updateInvoiceMutation(true);
	};
</script>

<header class="base-width flex h-14 items-center justify-between">
	<div class="flex flex-col gap-1.5">
		<h2 class="text-dark text-3xl font-bold capitalize">invoices</h2>
		<span class="font-medium text-neutral-200">There are {totalInvoices()} total invoices</span>
	</div>
	<div class="flex items-center gap-4">
		<Button isIcon onclick={createInvoice}>New Invoice</Button>
	</div>
</header>
<section class="base-width grid gap-4 overflow-y-auto">
	{#each invoices as invoice (invoice.invoiceNumber)}
		<Invoice {...invoice} />
	{:else}
		<div class="flex items-center justify-center w-full h-full pt-28 flex-col gap-10">
			<img src={emptyState} alt="empty state" />
			<div class="flex flex-col gap-5 items-center w-5/12">
				<span class="font-semibold text-3xl">There is nothing here</span>
				<span class="text-neutral-200 text-justify line-clamp-2 w-7/12">
					Create an invoice by clicking the
					<span class="font-bold">New Invoice</span> button and get started</span
				>
			</div>
		</div>
	{/each}
</section>

{#if showInvoiceMutation()}
	<div transition:fade={{ duration: 200 }}>
		<InvoiceMutation />
	</div>
{/if}
