<script lang="ts">
  import type { InputInterface } from "$lib/interfaces";
  import { cn } from "$lib/utils/utils";

  let { label, class: outerClass, inputClass, ...inputProps }: InputInterface = $props();

  let error = false;
</script>

<div class={cn("h-max flex flex-col gap-1",outerClass)}>
  <div class="flex items-center justify-between gap-4">
    <label class="capitalize text-purple-200" for={inputProps.id}>{label}</label>
    {#if error}
      <span class="text-sm text-error">can't be empty</span>
    {/if}
  </div>
  <input {...inputProps}
         class={cn("w-full h-[3rem] px-4 transition-all duration-200 ease-linear border border-neutral-200 text-dark font-semibold rounded-md hover:ring-2 ring-offset-2 ring-purple-400 outline-purple-400 focus:ring-2", {
           "border-error ring-2 ring-error focus:ring-error outline-error text-error placeholder:text-error": error
         }, inputClass)}
         name={inputProps.name ?? inputProps.id} />
</div>
