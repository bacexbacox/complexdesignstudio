<!--
  /service — Halaman assembler untuk Service page
  Container 1: Hero Section (judul + deskripsi + tagline)
  Container 2: Service Cards Grid (3×2)
-->
<script lang="ts">
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	import HeroSection from '$lib/components/sections/service/HeroSection.svelte';
	import ServiceGrid from '$lib/components/sections/service/ServiceGrid.svelte';
	import ServiceList from '$lib/components/shared/ServiceList.svelte';

	let { data } = $props();
</script>

<SeoHead meta={data.meta} />

<!-- Container 1: Hero Section -->
<HeroSection />

<!-- Container 2: Service Cards Grid -->
<ServiceGrid />

<!-- Container 3: Service List -->
<ServiceList />
