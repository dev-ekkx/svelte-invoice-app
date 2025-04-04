<script lang="ts">
  import arrowRight from "$lib/assets/arrow-right.svg";
  import StatusChip from "$lib/components/status-chip.svelte";
</script>

<section class="bg-white w-full h-[4.5rem] rounded-lg flex items-center justify-between px-8">
  <span class="flex items-center">
    <span class="text-purple-300">#</span>
    <span class="uppercase text-dark font-bold">RT435454</span>
  </span>
  <span class="text-purple-300 font-medium">Due 19 Aug 2021</span>
  <span class="text-purple-300 font-medium">Jensen Huang</span>
  <span class="text-dark font-bold">£ 1,800.90</span>
  <div class="flex items-center gap-6">
    <StatusChip status="paid" />
    <button aria-label="arrow-right" class="cursor-pointer p-1 group">
      <img alt="arrow-right" class="transition-all duration-200 ease-linear group-hover:scale-x-150" src={arrowRight}>
    </button>
  </div>
</section>
