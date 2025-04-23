<script lang="ts">
	import type { StatusChipInterface } from "$lib/interfaces";
	import { cn } from "$lib/utils/utils";

	let { status }: StatusChipInterface = $props();
</script>

<div
	class={cn("flex h-10 w-32 items-center justify-center gap-3 rounded-lg", {
		"bg-success-light text-success": status === "paid",
		"bg-warning-light text-warning": status === "pending",
		"bg-neutral-200 text-neutral-400": status === "draft"
	})}
>
	<span
		class={cn("h-3 w-3 rounded-full", {
			"bg-success": status === "paid",
			"bg-warning": status === "pending",
			"bg-neutral-400": status === "draft"
		})}
	></span>
	<span class="mt-1 font-bold capitalize">{status}</span>
</div>
