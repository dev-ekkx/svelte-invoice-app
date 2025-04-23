<script lang="ts">
	import type { InputInterface } from "$lib/interfaces";
	import { cn } from "$lib/utils/utils";

	let {
		label,
		class: outerClass,
		inputClass,
		items,
		value = $bindable(),
		...inputProps
	}: InputInterface = $props();

	let error = false;

	if (inputProps.type === "select" && items!.length > 0) {
		value = value.length ? value : items![0].value;
	}
</script>

<div class={cn("flex h-max flex-col gap-1", outerClass)}>
	<div class="flex items-center justify-between gap-4">
		{#if label}
			<label class="text-purple-200 capitalize" for={inputProps.id}>{label}</label>
		{/if}
		{#if error}
			<span class="text-error text-sm">can't be empty</span>
		{/if}
	</div>
	{#if inputProps.type === "select"}
		<select
			bind:value
			class={cn(
				"text-dark h-[3rem] w-full rounded-md border border-neutral-200 px-4 font-semibold ring-purple-400 ring-offset-2 outline-purple-400 transition-all duration-200 ease-linear hover:ring-2 focus:ring-2",
				{
					"border-error ring-error focus:ring-error outline-error text-error placeholder:text-error ring-2":
						error
				},
				inputClass
			)}
		>
			{#if items}
				{#each items as item (item.value)}
					<option value={item.value} selected={item.selected}>{item.label}</option>
				{/each}
			{:else}
				<option value="" selected disabled hidden>{inputProps.placeholder}</option>
			{/if}
		</select>
	{:else}
		<input
			{...inputProps}
			class={cn(
				"text-dark h-[3rem] w-full rounded-md border border-neutral-200 px-4 font-semibold ring-purple-400 ring-offset-2 outline-purple-400 transition-all duration-200 ease-linear hover:ring-2 focus:ring-2",
				{
					"border-error ring-error focus:ring-error outline-error text-error placeholder:text-error ring-2":
						error
				},
				inputClass
			)}
			bind:value
			name={inputProps.name ?? inputProps.id}
		/>
	{/if}
</div>
