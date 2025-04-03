<script lang="ts">
  import '../app.css';
  import logo from '$lib/assets/logo.svg';

  let { children } = $props();
</script>
<article class="bg-background flex w-screen h-screen">
  <aside class="h-full w-[5.5rem] bg-neutral-300 rounded-r-2xl flex flex-col justify-between">
    <img alt="logo" src={logo}>
    <div class="flex flex-col gap-2 items-center justify-center py-4">
      <button>Toggle</button>
      <hr class="w-full h-2 text-neutral-200" />
      <div class="w-10 h-10 rounded-full bg-purple-400"></div>
    </div>
  </aside>
  <main class="flex-1 flex flex-col gap-8 pt-20">
    {@render children()}
  </main>
</article>
