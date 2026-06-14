<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>Project: {data.slug} - Complex Design Studio</title>
</svelte:head>

<section class="min-h-screen pt-32 pb-16 padding-global">
  <h1>Project: {data.slug}</h1>
  <p>Category: {data.category}</p>
</section>
