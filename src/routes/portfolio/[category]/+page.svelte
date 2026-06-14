<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>Portfolio: {data.category} - Complex Design Studio</title>
</svelte:head>

<section class="min-h-screen pt-32 pb-16 padding-global">
  <h1>Portfolio Category: {data.category}</h1>
</section>
