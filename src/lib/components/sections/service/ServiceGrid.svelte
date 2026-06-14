<!--
  ServiceGrid.svelte — Grid container untuk service cards
  Layout: 3 kolom × 2 baris sesuai wireframe user
  Data diambil dari data layer services.ts
-->
<script lang="ts">
	import { services } from '$lib/data/services';
	import ServiceCard from '$lib/components/sections/service/ServiceCard.svelte';
</script>

<section class="padding-global pb-16 md:pb-24 lg:pb-32">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
		{#each services as service, index (service.id)}
			<ServiceCard {service} {index} />
		{/each}
	</div>
</section>
