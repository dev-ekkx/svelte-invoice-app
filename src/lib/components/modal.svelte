<script lang="ts">
  import { fade } from "svelte/transition";

  let {title, description, children} = $props();
</script>

<div transition:fade aria-roledescription="dynamic modal" aria-label="modal" class="fixed w-screen h-screen left-0 top-0 z-[99999] bg-neutral-300/40 backdrop-blur-[3px] flex items-center justify-center">
<section
  transition:fade
  class="bg-white mx-4 max-w-[32rem] rounded-lg p-10 flex flex-col gap-4">
  <h4 class="font-semibold text-dark text-2xl capitalize">{title}</h4>
  <p class="text-neutral-200">{description}</p>
  {#if children}
  {@render children()}
    {/if}
</section>
</div>
