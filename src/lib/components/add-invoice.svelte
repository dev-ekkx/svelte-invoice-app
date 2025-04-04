<script lang="ts">
  import Input from "$lib/components/input.svelte";
</script>
<section
  class="z-10 top-0 left-0 absolute w-screen h-screen bg-black/50">
  <div class="w-6/12 xl:w-4/12 rounded-r-2xl bg-white flex flex-col gap-8 p-6 pr-14 pl-36 pt-10 h-full">
    <h3 class="capitalize font-bold text-2xl">new invoice</h3>

    <div class="flex flex-col gap-6">
      <span>bill to</span>
      <div class="grid grid-cols-3 gap-4">
        <Input
          class="col-span-3"
          id="street-address"
          label="street address"
          placeholder="e.g. 1234 Main St"
          type="text"
        />
      </div>
    </div>
  </div>
</section>
