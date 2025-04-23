<script lang="ts">
	import "../app.css";
	import logo from "$lib/assets/logo.svg";

	let { children } = $props();
</script>

<article class="bg-background relative flex h-screen w-screen">
	<aside class="z-50 flex h-full w-[5.5rem] flex-col justify-between rounded-r-2xl bg-neutral-300">
		<img alt="logo" src={logo} />
		<div class="flex flex-col items-center justify-center gap-2 py-4">
			<button>Toggle</button>
			<hr class="h-2 w-full text-neutral-200" />
			<div class="h-10 w-10 rounded-full bg-purple-400"></div>
		</div>
	</aside>
	<main class="flex flex-1 flex-col gap-8 pt-20">
		{@render children()}
	</main>
</article>
