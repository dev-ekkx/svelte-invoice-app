<script lang="ts">
  import Input from "$lib/components/input.svelte";
  import Button from "$lib/components/button.svelte";
  import type { ListItemInterface } from "$lib/interfaces";

  let items = $state<ListItemInterface[]>([]);

  const addItem = () => {
    items.push({
      itemName: "",
      quantity: 0,
      price: 0
    });
  };
</script>
<div
  class="z-10 top-0 left-0 absolute w-screen h-screen bg-black/50">
  <section class="w-6/12 xl:w-4/12 rounded-r-2xl bg-white flex flex-col gap-8 p-6 pr-14 pl-36 pt-10 h-full">
    <h3 class="capitalize font-bold text-2xl">new invoice</h3>
    <div class="overflow-y-auto px-1 h-10/12 w-full flex flex-col gap-8">
      <section class="flex flex-col gap-6">
        <span class="text-purple-400 capitalize font-bold">bill to</span>
        <div class="grid grid-cols-3 gap-6">
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
        <div class="grid grid-cols-3 gap-6">
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
        </div>
      </section>
      <div class="flex flex-col gap-6">
        <span class="font-bold text-md text-neutral-200 text-2xl capitalize">item list</span>
        <div class="flex flex-col gap-6">
          {#each items as item, index}
            <div class="grid grid-cols-6 gap-4">
              <Input
                class="col-span-3"
                id={item.itemName+index}
                label="item name"
                placeholder="Graphic Design"
                type="text"
              />
              <Input
                id="item-quantity"
                label="quantity"
                placeholder="1"
                type="number"
              />
              <Input
                class="col-span-2"
                id="item-price"
                label="price"
                placeholder="1.99"
                type="number"
              />
              <div class="flex flex-col gap-6">
                <div class="flex items-center justify-between gap-4">
                  <span class="font-bold text-lg text-purple-200">156.00</span>
                  <button>X</button>
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
