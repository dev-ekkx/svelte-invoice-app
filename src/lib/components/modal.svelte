<script lang="ts">
	import { fade } from "svelte/transition";

	let { title, description, children } = $props();
</script>

<div
	transition:fade
	aria-roledescription="dynamic modal"
	aria-label="modal"
	class="fixed top-0 left-0 z-[99999] flex h-screen w-screen items-center justify-center bg-neutral-300/40 backdrop-blur-[3px]"
>
	<section transition:fade class="mx-4 flex max-w-[32rem] flex-col gap-4 rounded-lg bg-white p-10">
		<h4 class="text-dark text-2xl font-semibold capitalize">{title}</h4>
		<p class="text-neutral-200">{description}</p>
		{#if children}
			{@render children()}
		{/if}
	</section>
</div>
