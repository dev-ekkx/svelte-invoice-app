<script lang="ts">
  import Input from "$lib/components/input.svelte";
  import Button from "$lib/components/button.svelte";
  import type { ListItemInterface } from "$lib/interfaces";

  let items = $state<ListItemInterface[]>([]);

  const addItem = () => {
    items.push({
      id: crypto.randomUUID(),
      itemName: "",
      quantity: 0,
      price: 0
    });
  };

  const removeItem = (id: string) => {
    items = items.filter((item) => item.id !== id);

  };
</script>
<div
  class="z-10 top-0 left-0 absolute w-screen h-screen bg-black/50">
  <section class="w-6/12 xl:w-5/12 rounded-r-2xl bg-white flex flex-col gap-8 p-6 pr-14 pl-36 pt-10 h-full">
    <h3 class="capitalize font-bold text-2xl">new invoice</h3>
    <div class="overflow-y-auto px-1 h-10/12 w-full flex flex-col gap-8">
      <section class="flex flex-col gap-6">
        <span class="text-purple-400 capitalize font-bold">bill to</span>
        <div class="grid grid-cols-3 gap-5">
          <Input
            class="col-span-3"
            id="street-address"
            label="street address"
            placeholder="1234 Main St"
            type="text"
          />
          <Input
            id="city"
            label="city"
            placeholder="Accra"
            type="text"
          />
          <Input
            id="post-code"
            label="post code"
            placeholder="E13 9PG"
            type="text"
          />
          <Input
            id="country"
            label="country"
            placeholder="Ghana"
            type="text"
          />
        </div>
      </section>
      <section class="flex flex-col gap-6">
        <span class="text-purple-400 capitalize font-bold">bill from</span>
        <div class="grid grid-cols-3 gap-5">
          <Input
            class="col-span-3"
            id="client-name"
            label="client's name"
            placeholder="John Doe"
            type="text"
          />
          <Input
            class="col-span-3"
            id="client-email"
            label="client's email"
            placeholder="john.doe@gmail.com"
            type="email"
          />
          <Input
            class="col-span-3"
            id="street-address"
            label="street address"
            placeholder="56 Wayward St"
            type="text"
          />
          <Input
            id="from-city"
            label="City"
            placeholder="Accra"
            type="text"
          />
          <Input
            id="from-post-code"
            label="Post Code"
            placeholder="4DF4 4G"
            type="text"
          />
          <Input
            id="from-country"
            label="country"
            placeholder="Ghana"
            type="text"
          />
          <Input
            class="col-span-3"
            id="project-description"
            label="project description"
            placeholder="Graphics Design"
            type="text"
          />
          <div class="col-span-3 flex items-center gap-4">
            <Input
              class="w-full"
              id="issue-date"
              label="issue date"
              placeholder="06 April 2025"
              type="date"

            />
            <Input
              class="w-full"
              id="payment-terms"
              label="payment terms"
              placeholder="Net 30 days"
              type="text"
            />
          </div>
        </div>
      </section>
      <div class="flex flex-col gap-6">
        <span class="font-bold text-md text-neutral-200 text-2xl capitalize">item list</span>
        <div class="flex flex-col gap-6">
          {#each items as item, index (item.id)}
            <div class="grid grid-cols-10 gap-4">
              <Input
                class="col-span-4"
                id={item.itemName+item.id}
                label={index === 0 ? "item name" : undefined}
                placeholder="Graphic Design"
                type="text"
              />
              <Input
                id={item.quantity+item.id}
                label={index === 0 ? "qty." : undefined}
                placeholder="1"
                type="number"
                inputClass="px-2 text-center"
              />
              <Input
                class="col-span-2"
                id={item.price+item.id}
                label={index === 0 ? "price" : undefined}
                placeholder="1.99"
                type="number"
              />
              <div class="col-span-3 flex flex-col gap-1">
                {#if index === 0}
                  <span class="capitalize text-purple-200">total</span>
                {/if}
                <div class="col-span-3 flex items-center justify-between gap-4 h-[3rem]">
                  <span class="font-bold text-lg text-purple-200">{(item.quantity * item.price).toFixed(2)}</span>
                  <button
                    onclick={() => removeItem(item.id)}
                    class="cursor-pointer"
                    aria-label="remove item"
                  >
                    <span class="text-purple-200 text-xl icon-[solar--trash-bin-minimalistic-2-bold]"></span>
                  </button>
                </div>
              </div>
            </div>
          {/each}
          <Button class="flex items-center justify-center" color="tertiary" onclick={addItem}>+
            Add New Item
          </Button>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between gap-4">
      <Button color="tertiary">Discard</Button>
      <div class="flex items-center gap-4">
        <Button class="text-purple-200 bg-neutral-300 hover:bg-neutral-300 font-bold">Save as Draft</Button>
        <Button>Save & Send</Button>
      </div>
    </div>
  </section>

</div>
