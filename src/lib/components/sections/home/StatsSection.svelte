<script lang="ts">
	import CardCounting from './CardCounting.svelte';
</script>

<!-- Cards Section -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
	<CardCounting number="200+" label="Project Delivery" class="lg:col-span-2" />
	<CardCounting number="15+" label="Years in Industri" />
	<CardCounting number="20+" label="BUMN/Goverment" />
</div>
