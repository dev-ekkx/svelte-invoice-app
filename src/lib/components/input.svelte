<script lang="ts">
  import type { InputInterface } from "$lib/interfaces";
  import { cn } from "$lib/utils/utils";

  let { label, class: outerClass, inputClass, items, value = $bindable(), ...inputProps }: InputInterface = $props();

  let error = false;

  if (inputProps.type === "select" && items!.length > 0) {
    value = value.length ? value : items![0].value;
  }

</script>

<div class={cn("h-max flex flex-col gap-1",outerClass)}>
  <div class="flex items-center justify-between gap-4">
    {#if label}
      <label class="capitalize text-purple-200" for={inputProps.id}>{label}</label>
    {/if}
    {#if error}
      <span class="text-sm text-error">can't be empty</span>
    {/if}
  </div>
  {#if inputProps.type === "select"}
    <select
      bind:value
      class={cn("w-full h-[3rem] px-4 transition-all duration-200 ease-linear border border-neutral-200 text-dark font-semibold rounded-md hover:ring-2 ring-offset-2 ring-purple-400 outline-purple-400 focus:ring-2", {
              "border-error ring-2 ring-error focus:ring-error outline-error text-error placeholder:text-error": error
            }, inputClass)}>
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
      class={cn("w-full h-[3rem] px-4 transition-all duration-200 ease-linear border border-neutral-200 text-dark font-semibold rounded-md hover:ring-2 ring-offset-2 ring-purple-400 outline-purple-400 focus:ring-2", {
           "border-error ring-2 ring-error focus:ring-error outline-error text-error placeholder:text-error": error
         }, inputClass)}
      bind:value
      name={inputProps.name ?? inputProps.id} />
  {/if}
</div>
