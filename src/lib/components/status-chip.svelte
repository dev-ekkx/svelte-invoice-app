<script lang="ts">
  import type { StatusChipInterface } from "$lib/interfaces";
  import { cn } from "$lib/utils/utils";

  let { status }: StatusChipInterface = $props();

</script>

<div class={cn("rounded-lg flex items-center justify-center gap-3 h-10 w-32",
 {
  'bg-success-light text-success': status === "paid",
  'bg-warning-light text-warning': status === "pending",
  'bg-neutral-200 text-neutral-400': status === "draft",
}
)}>
  <span class={cn('w-3 h-3 rounded-full',
   {
    'bg-success': status === "paid",
    'bg-warning': status === "pending",
    'bg-neutral-400': status === "draft",
  }
  )}></span>
  <span class="capitalize font-bold mt-1">{status}</span>
</div>
