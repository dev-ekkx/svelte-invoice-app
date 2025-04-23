<script lang="ts">
	import Input from "$lib/components/input.svelte";
	import Button from "$lib/components/button.svelte";
	import type { ItemInterface } from "$lib/interfaces";
	import { fade, fly } from "svelte/transition";
	import { updateInvoiceMutation } from "$lib/store/index.svelte";
	import { createInvoiceForm } from "$lib/constants";
	import { goto } from "$app/navigation";

	let dropdownItems = [
		{ value: "net-30", label: "Net 30 days", selected: true },
		{ value: "net-60", label: "Net 60 days" },
		{ value: "net-90", label: "Net 90 days" }
	];

	let invoiceForm = $state({
		billFrom: {
			fromStreetAddress: "",
			fromCity: "",
			fromPostCode: "",
			fromCountry: ""
		},
		billTo: {
			toClientName: "",
			toClientEmail: "",
			toStreet: "",
			toCity: "",
			toPostCode: "",
			toCountry: ""
		},
		projectDescription: "",
		invoiceDate: new Date().toISOString().split("T")[0],
		paymentTerms: "",
		items: [] as ItemInterface[]
	});

	const addItem = () => {
		invoiceForm.items.push({
			id: crypto.randomUUID(),
			itemName: "",
			quantity: 0,
			price: 0
		});
	};

	const removeItem = (id: string) => {
		invoiceForm.items = invoiceForm.items.filter((item) => item.id !== id);
	};

	const formSubmit = async () => {
		const response = await fetch("/invoices/create-invoice/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(invoiceForm)
		});

		const result: { message: string; error: string } = await response.json();
		if (result.message) {
			alert(result.message);
			updateInvoiceMutation(false);
			await goto("/");
		} else {
			alert(result.error);
		}
	};
</script>

<div class="absolute top-0 left-0 z-10 h-screen w-screen bg-black/50">
	<form
		class="flex h-full w-6/12 flex-col gap-8 rounded-r-2xl
    bg-white p-6 pt-10 pr-14 pl-36 xl:w-5/12"
	>
		<h3 class="text-2xl font-bold capitalize">new invoice</h3>
		<div class="flex h-10/12 w-full flex-col gap-8 overflow-y-auto px-1 pb-4">
			<section class="flex flex-col gap-6">
				<span class="font-bold text-purple-400 capitalize">bill from</span>
				<div class="grid grid-cols-3 gap-5">
					{#each createInvoiceForm.billFrom as field (field.id)}
						<Input
							class={field.class}
							id={`from-${field.id}`}
							label={field.label}
							placeholder={field.placeholder}
							type={field.type}
							bind:value={invoiceForm.billFrom[field.id]}
						/>
					{/each}
				</div>
			</section>
			<section class="flex flex-col gap-6">
				<span class="font-bold text-purple-400 capitalize">bill to</span>
				<div class="grid grid-cols-3 gap-5">
					{#each createInvoiceForm.billTo as field (field.id)}
						<Input
							class={field.class}
							id={`to-${field.id}`}
							label={field.label}
							placeholder={field.placeholder}
							type={field.type}
							bind:value={invoiceForm.billTo[field.id]}
						/>
					{/each}
					<div class="col-span-3 flex items-center gap-4">
						<Input
							bind:value={invoiceForm.invoiceDate}
							class="w-full"
							id="invoiceDate"
							label="invoice date"
							placeholder="06 April 2025"
							type="date"
						/>
						<Input
							bind:value={invoiceForm.paymentTerms}
							class="w-full"
							id="payment-terms"
							items={dropdownItems}
							label="payment terms"
							placeholder="Net 30 days"
							type="select"
						/>
					</div>
					<Input
						bind:value={invoiceForm.projectDescription}
						class="col-span-3"
						id="project-description"
						label="project description"
						placeholder="Graphics Design"
						type="text"
					/>
				</div>
			</section>
			<div class="flex flex-col gap-6">
				<span class="text-md text-2xl font-bold text-neutral-200 capitalize">item list</span>
				<div class="flex flex-col gap-6">
					{#each invoiceForm.items as item, index (item.id)}
						<div class="grid grid-cols-10 gap-4" in:fly={{ y: 200 }} out:fade>
							<Input
								class="col-span-4"
								id={item.itemName + item.id}
								bind:value={item.itemName}
								name={`items[${index}][name]`}
								label={index === 0 ? "item name" : undefined}
								placeholder="Graphic Design"
								type="text"
							/>
							<Input
								id={item.quantity + item.id}
								name={`items[${index}][quantity]`}
								bind:value={item.quantity}
								label={index === 0 ? "qty." : undefined}
								placeholder="1"
								type="number"
								inputClass="px-2 text-center"
							/>
							<Input
								id={item.price + item.id}
								name={`items[${index}][price]`}
								bind:value={item.price}
								label={index === 0 ? "price" : undefined}
								placeholder="1.99"
								type="number"
								class="col-span-2"
							/>
							<div class="col-span-3 flex flex-col gap-1">
								{#if index === 0}
									<span class="text-purple-200 capitalize">total</span>
								{/if}
								<div class="col-span-3 flex h-[3rem] items-center justify-between gap-4">
									<span class="text-lg font-bold text-purple-200">
										{(item.quantity * item.price).toFixed(2)}</span
									>
									<button
										onclick={() => removeItem(item.id)}
										class="cursor-pointer"
										aria-label="remove item"
									>
										<span
											class="icon-[solar--trash-bin-minimalistic-2-bold] text-xl text-purple-200"
										></span>
									</button>
								</div>
							</div>
						</div>
					{/each}
					<Button class="flex items-center justify-center" color="tertiary" onclick={addItem}
						>+ Add New Item
					</Button>
				</div>
			</div>
		</div>
		<div class="flex items-center justify-between gap-4">
			<Button color="tertiary" onclick={() => updateInvoiceMutation(false)}>Discard</Button>
			<div class="flex items-center gap-4">
				<Button class="bg-neutral-300 font-bold text-purple-200 hover:bg-neutral-300"
					>Save as Draft
				</Button>
				<Button onclick={() => formSubmit()}>Save & Send</Button>
			</div>
		</div>
	</form>
</div>
